import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import {
  cpSync,
  mkdtempSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import { encode } from "next-auth/jwt";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

const require = createRequire(import.meta.url);

const next = require.resolve("next/dist/bin/next");

test(
  "all admin actions reject anonymous and non-admin HTTP callers before outbound requests",
  { timeout: 180_000 },
  async () => {
    const temporary = mkdtempSync(path.join(tmpdir(), "uiss-admin-actions-"));
    const copy = path.join(temporary, "website");
    let outboundRequests = 0;

    const upstream = createServer((_request, response) => {
      outboundRequests += 1;
      response.setHeader("content-type", "application/json");
      response.end("{}");
    });

    let application;
    let applicationLog = "";

    try {
      cpSync(root, copy, {
        recursive: true,
        filter: (source) => {
          const first = path.relative(root, source).split(path.sep)[0];

          return (
            ![".git", ".next", "node_modules", "test-results", "playwright-report"].includes(
              first,
            ) && !first.startsWith(".env")
          );
        },
      });
      symlinkSync(path.join(root, "node_modules"), path.join(copy, "node_modules"), "dir");
      cpSync(path.join(copy, "next.config.ts"), path.join(copy, "next.config.base.ts"));
      writeFileSync(
        path.join(copy, "next.config.ts"),
        `import base from "./next.config.base";
export default {
  ...base,
  experimental: {
    ...base.experimental,
    turbopackAdditionalRoots: { dependencies: { path: ${JSON.stringify(root)} } },
  },
};
`,
      );
      const probe = path.join(copy, "app/action-security-probe");
      mkdirSync(probe);
      writeFileSync(
        path.join(probe, "page.tsx"),
        `"use client";
import { fetchData, submitForm, updateData } from "@/app/admin/actions";
export default function Probe() {
  return <div>
    <button onClick={() => fetchData("/users")}>Read</button>
    <button onClick={() => submitForm({}, "/clubs")}>Create</button>
    <button onClick={() => updateData({}, "/clubs/7")}>Update</button>
  </div>;
}
`,
      );

      upstream.listen(0, "127.0.0.1");
      await once(upstream, "listening");
      const reservation = createServer();
      reservation.listen(0, "127.0.0.1");
      await once(reservation, "listening");
      const port = reservation.address().port;
      reservation.close();
      await once(reservation, "close");

      const origin = `http://127.0.0.1:${port}`;
      const secret = "admin-action-regression-test-secret";

      const env = {
        ...process.env,
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
        DATABASE_URL: "",
        ZENBLOG_BLOG_ID: "",
        RESEND_API_KEY: "",
        AUTH_SECRET: secret,
        AUTH_TRUST_HOST: "true",
        AUTH_URL: origin,
        NEXT_PUBLIC_API_ROUTE: `http://127.0.0.1:${upstream.address().port}/api`,
      };

      const build = spawn(process.execPath, [next, "build"], { cwd: copy, env });
      let buildLog = "";
      build.stdout.on("data", (chunk) => {
        buildLog += chunk;
      });
      build.stderr.on("data", (chunk) => {
        buildLog += chunk;
      });
      const [exitCode] = await once(build, "exit");
      assert.equal(exitCode, 0, buildLog);

      const manifest = JSON.parse(
        readFileSync(path.join(copy, ".next/server/server-reference-manifest.json"), "utf8"),
      );

      const actions = Object.entries(manifest.node).filter(
        ([, value]) => value.filename === "app/admin/actions.ts",
      );

      assert.equal(actions.length, 3);
      application = spawn(
        process.execPath,
        [next, "start", "--hostname", "127.0.0.1", "--port", String(port)],
        { cwd: copy, env },
      );
      application.stdout.on("data", (chunk) => {
        applicationLog += chunk;
      });
      application.stderr.on("data", (chunk) => {
        applicationLog += chunk;
      });

      let ready = false;

      for (let attempt = 0; attempt < 100; attempt += 1) {
        try {
          const response = await fetch(`${origin}/action-security-probe`);

          if (response.ok) {
            ready = true;
            break;
          }
        } catch {
          /* Wait for the local production server to listen. */
        }

        await setTimeout(100);
      }

      assert.ok(ready, applicationLog);

      const salt = "authjs.session-token";

      const token = await encode({
        secret,
        salt,
        token: {
          sub: "fixture-member",
          name: "Fixture member",
          email: "member@example.invalid",
          role: "member",
        },
      });

      const cookie = `${salt}=${token}`;
      const session = await fetch(`${origin}/api/auth/session`, { headers: { cookie } });
      assert.equal((await session.json()).user.email, "member@example.invalid");

      for (const headers of [{}, { cookie }, { cookie: `${salt}=invalid-token` }]) {
        for (const [id, action] of actions) {
          assert.ok(action.workers["app/action-security-probe/page"]);

          const args =
            action.exportedName === "fetchData"
              ? ["/users"]
              : [
                  { title: "Fixture" },
                  action.exportedName === "submitForm" ? "/clubs" : "/clubs/7",
                ];

          const response = await fetch(`${origin}/action-security-probe`, {
            method: "POST",
            headers: {
              ...headers,
              origin,
              "next-action": id,
              "content-type": "text/plain;charset=UTF-8",
            },
            body: JSON.stringify(args),
          });

          const result = await response.text();
          assert.equal(response.status, 500, result);
          assert.match(result, /digest/);
        }
      }

      assert.equal(outboundRequests, 0);
      assert.equal((applicationLog.match(/Error: Forbidden/g) ?? []).length, 9, applicationLog);
    } finally {
      if (application && application.exitCode === null) {
        application.kill("SIGTERM");
        await once(application, "exit");
      }

      if (upstream.listening) {
        upstream.close();
        await once(upstream, "close");
      }

      rmSync(temporary, { recursive: true, force: true });
    }
  },
);
