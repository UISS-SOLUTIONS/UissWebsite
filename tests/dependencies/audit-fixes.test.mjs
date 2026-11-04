import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const rootRequire = createRequire(import.meta.url);

const requireFrom = (name) => createRequire(rootRequire.resolve(name));

const loaderRequire = requireFrom("@esbuild-kit/esm-loader");

const coreRequire = createRequire(loaderRequire.resolve("@esbuild-kit/core-utils"));

test("the legacy Drizzle loader transforms TypeScript with patched esbuild", async () => {
  assert.equal(coreRequire("esbuild/package.json").version, "0.25.12");
  const { transformSync, transform } = loaderRequire("@esbuild-kit/core-utils");

  const compiled = transformSync(
    "const answer: number = 42; module.exports = answer;",
    "/tmp/audit-fixture.cts",
  );

  const context = { module: { exports: undefined } };
  vm.runInNewContext(compiled.code, context);
  assert.equal(context.module.exports, 42);
  assert.equal(compiled.map.version, 3);

  const esm = await transform("export const answer: number = 42;", "/tmp/audit-fixture.mts");

  const loaded = await import(
    `data:text/javascript;base64,${Buffer.from(esm.code).toString("base64")}`
  );

  assert.equal(loaded.answer, 42);
});

test("patched esbuild does not grant arbitrary origins access to its dev server", async () => {
  const esbuild = coreRequire("esbuild");

  const context = await esbuild.context({
    stdin: { contents: "export const answer = 42;", loader: "js" },
    outfile: "bundle.js",
    bundle: true,
    write: false,
  });

  try {
    const { port } = await context.serve({ host: "127.0.0.1", port: 0 });

    const response = await fetch(`http://127.0.0.1:${port}/bundle.js`, {
      headers: { Origin: "https://untrusted.invalid" },
    });

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("access-control-allow-origin"), null);
    assert.match(await response.text(), /42/);
  } finally {
    await context.dispose();
  }
});

test("Drizzle Kit generates the real schema twice without a database or schema drift", () => {
  const temporary = mkdtempSync(path.join(tmpdir(), "uiss-audit-schema-"));
  const output = path.join(temporary, "migrations");
  const config = path.join(temporary, "drizzle.config.ts");
  writeFileSync(
    config,
    `
    import base from ${JSON.stringify(path.join(root, "drizzle.config.ts"))};
    export default {
      ...base,
      schema: ${JSON.stringify(path.join(root, "app/db/schema.ts"))},
      out: "migrations",
    };
  `,
  );

  try {
    const cli = path.join(path.dirname(rootRequire.resolve("drizzle-kit")), "bin.cjs");

    const generate = () => {
      const result = spawnSync(process.execPath, [cli, "generate", "--config", config], {
        cwd: temporary,
        env: { ...process.env, DATABASE_URL: "postgresql://unused@127.0.0.1:1/unused" },
        encoding: "utf8",
        timeout: 30000,
      });

      assert.ifError(result.error);
      assert.equal(result.status, 0, result.stdout + result.stderr);

      return result.stdout + result.stderr;
    };

    generate();
    const migrations = readdirSync(output).filter((name) => name.endsWith(".sql"));
    assert.equal(migrations.length, 1);
    assert.match(generate(), /No schema changes/i);
    assert.deepEqual(
      readdirSync(output).filter((name) => name.endsWith(".sql")),
      migrations,
    );
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
});
