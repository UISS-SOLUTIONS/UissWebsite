import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

function lint(input) {
  const temporary = mkdtempSync(path.join(tmpdir(), "uiss-oxlint-"));
  const fixture = path.join(temporary, "fixture.ts");

  writeFileSync(fixture, input);

  try {
    const result = spawnSync(
      process.execPath,
      [
        path.join(root, "node_modules/oxlint/bin/oxlint"),
        "--config",
        path.join(root, ".oxlintrc.json"),
        "--format",
        "json",
        fixture,
      ],
      { cwd: root, encoding: "utf8" },
    );

    assert.ifError(result.error);
    assert.ok(result.stdout, result.stderr);

    const report = JSON.parse(result.stdout);

    assert.equal(report.number_of_files, 1);

    return { status: result.status, report };
  } finally {
    rmSync(temporary, { recursive: true, force: true });
  }
}

test("Oxlint and the custom-plugin helpers use the same pinned version", () => {
  const manifest = JSON.parse(readFileSync(path.join(root, "package.json"), "utf8"));

  assert.equal(manifest.devDependencies.oxlint, "1.91.0");
  assert.equal(manifest.devDependencies["@oxlint/plugins"], manifest.devDependencies.oxlint);
  assert.equal(manifest.devDependencies.eslint, undefined);
  assert.equal(manifest.devDependencies["eslint-config-next"], undefined);
});

test("the configured anti-slop plugin accepts a typed function", () => {
  const result = lint("export function greeting(name: string) {\n  return name.trim();\n}\n");

  assert.equal(result.status, 0, JSON.stringify(result.report));
  assert.equal(result.report.diagnostics.length, 0);
});

test("the configured anti-slop plugin rejects unparsed inputs and returns", () => {
  const result = lint("export function echo(value: unknown): unknown {\n  return value;\n}\n");
  const codes = result.report.diagnostics.map((diagnostic) => diagnostic.code);

  assert.equal(result.status, 1);
  assert.ok(codes.includes("anti-slop(no-unknown-parameters)"));
  assert.ok(codes.includes("anti-slop(no-unknown-returns)"));
});
