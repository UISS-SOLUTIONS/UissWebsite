import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { test } from "node:test";
import { requestAdminApi } from "../../lib/admin-api.ts";

test("admin API requests use approved paths and retain session, method and payload", async () => {
  const server = createServer(async (request, response) => {
    let body = "";

    for await (const chunk of request) body += chunk;

    response.setHeader("content-type", "application/json");
    response.end(
      JSON.stringify({
        path: request.url,
        method: request.method,
        cookie: request.headers.cookie,
        contentType: request.headers["content-type"],
        body,
      }),
    );
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const base = `http://127.0.0.1:${server.address().port}/api`;

  try {
    const reads = [
      "/clubs",
      "/clubs/7",
      "/coreValues",
      "/leaders",
      "/positions",
      "/users",
      "/users/clubUsers/7",
      "/events/7",
    ];

    const writes = ["/clubs", "/coreValues", "/heroPage", "/leaders", "/events/7"];

    for (const [method, paths] of [
      ["GET", reads],
      ["POST", writes],
      ["PATCH", ["/clubs/7", "/visionMission/7"]],
    ]) {
      for (const path of paths) {
        const body =
          method === "GET" ? undefined : JSON.stringify({ title: "UISS", description: null });

        const result = await requestAdminApi(`${base}/`, path, {
          method,
          headers: { cookie: "authjs.session-token=fixture" },
          body,
        });

        assert.equal(result.ok, true);
        assert.equal(result.data.path, `/api${path}`);
        assert.equal(result.data.method, method);
        assert.equal(result.data.cookie, "authjs.session-token=fixture");
        assert.equal(result.data.body, body ?? "");

        if (body) assert.equal(result.data.contentType, "application/json");
      }
    }
  } finally {
    server.close();
    await once(server, "close");
  }
});

test("unapproved destinations and methods are rejected before any request", async () => {
  let requests = 0;

  const server = createServer((_request, response) => {
    requests += 1;
    response.end("{}");
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const origin = `http://127.0.0.1:${server.address().port}`;

  try {
    const invalid = [
      `${origin}/api/clubs`,
      "http://169.254.169.254/latest/meta-data/",
      "https://example.com/api/clubs",
      "//127.0.0.1/api/clubs",
      "/../clubs",
      "/clubs/../users",
      "/clubs/%2e%2e/users",
      "/clubs%2f7",
      "/clubs\\7",
      "/clubs?next=/users",
      "/clubs#fragment",
      "/clubs/7/extra",
      "/clubs/0",
      "/clubs/-1",
      "/clubs/7evil",
      "/clubs\n",
      "/clubs\r\n",
      "/auth/session",
      "clubs",
      null,
      ["/clubs"],
      {},
    ];

    for (const path of invalid) {
      for (const method of ["GET", "POST", "PATCH"]) {
        await assert.rejects(requestAdminApi(`${origin}/api`, path, { method }));
      }
    }

    await assert.rejects(requestAdminApi(`${origin}/api`, "/users", { method: "POST" }));
    await assert.rejects(requestAdminApi(`${origin}/api`, "/clubs", { method: "PATCH" }));
    await assert.rejects(requestAdminApi(`${origin}/api`, "/heroPage", { method: "GET" }));
    assert.equal(requests, 0);
  } finally {
    server.close();
    await once(server, "close");
  }
});

test("redirects cannot move an admin request or its cookie to another destination", async () => {
  let redirectedRequests = 0;

  const destination = createServer((_request, response) => {
    redirectedRequests += 1;
    response.end("{}");
  });

  destination.listen(0, "127.0.0.1");
  await once(destination, "listening");
  const redirectUrl = `http://127.0.0.1:${destination.address().port}/private`;

  const server = createServer((_request, response) => {
    response.writeHead(307, { location: redirectUrl });
    response.end();
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const base = `http://127.0.0.1:${server.address().port}/api`;

  try {
    for (const [method, path] of [
      ["GET", "/clubs"],
      ["POST", "/clubs"],
      ["PATCH", "/clubs/7"],
    ]) {
      await assert.rejects(
        requestAdminApi(base, path, {
          method,
          headers: { cookie: "authjs.session-token=fixture" },
          body: method === "GET" ? undefined : "{}",
          redirect: "follow",
          cache: "force-cache",
        }),
        /fetch failed/,
      );
    }

    assert.equal(redirectedRequests, 0);
  } finally {
    server.close();
    destination.close();
    await Promise.all([once(server, "close"), once(destination, "close")]);
  }
});

test("invalid API configuration fails closed", async () => {
  for (const base of [
    "",
    "/api",
    "file:///api",
    "ftp://example.com/api",
    "https://user:password@example.com/api",
    "https://example.com/api?redirect=1",
    "https://example.com/api#fragment",
  ]) {
    await assert.rejects(requestAdminApi(base, "/clubs", { method: "GET" }));
  }
});
