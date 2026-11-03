import assert from "node:assert/strict";
import { createServer } from "node:http";
import { once } from "node:events";
import { test } from "node:test";

import { requestJson } from "../../lib/services/http.ts";

test("JSON requests preserve payloads, methods, headers, and HTTP status", async () => {
  const server = createServer(async (request, response) => {
    let body = "";

    for await (const chunk of request) body += chunk;

    response.writeHead(request.url === "/denied" ? 403 : 200, {
      "content-type": "application/json",
    });
    response.end(
      JSON.stringify({
        method: request.method,
        contentType: request.headers["content-type"] ?? null,
        cookie: request.headers.cookie ?? null,
        body,
      }),
    );
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();

  assert.ok(address && address instanceof Object);
  const endpoint = `http://127.0.0.1:${address.port}`;

  try {
    const read = await requestJson(endpoint);

    assert.equal(read.ok, true);
    assert.equal(read.status, 200);
    assert.equal(read.data.method, "GET");
    assert.equal(read.data.contentType, null);
    assert.equal(read.data.body, "");

    for (const method of ["POST", "PATCH"]) {
      const body = JSON.stringify({ title: "UISS", message: "<test> & café", count: 0 });

      const result = await requestJson(endpoint, {
        method,
        body,
        headers: { cookie: "session=test-value" },
      });

      assert.equal(result.data.method, method);
      assert.equal(result.data.contentType, "application/json");
      assert.equal(result.data.cookie, "session=test-value");
      assert.equal(result.data.body, body);
    }

    const denied = await requestJson(`${endpoint}/denied`);

    assert.equal(denied.ok, false);
    assert.equal(denied.status, 403);
    assert.equal(denied.data.method, "GET");

    const custom = await requestJson(endpoint, {
      method: "POST",
      body: "{}",
      headers: new Headers({ "content-type": "application/problem+json" }),
    });

    assert.equal(custom.data.contentType, "application/problem+json");
  } finally {
    server.close();
    await once(server, "close");
  }

  await assert.rejects(requestJson(endpoint), /fetch failed/);
});

test("invalid JSON remains an explicit transport failure", async () => {
  const server = createServer((_request, response) => {
    response.statusCode = 502;
    response.end("not json");
  });

  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();

  assert.ok(address && address instanceof Object);

  try {
    const endpoint = `http://127.0.0.1:${address.port}`;

    await assert.rejects(requestJson(endpoint), SyntaxError);
    await assert.rejects(
      requestJson(endpoint, {
        checkStatus: ({ ok }) => {
          if (!ok) throw new Error("Failed to update data");
        },
      }),
      /Failed to update data/,
    );
  } finally {
    server.close();
    await once(server, "close");
  }
});
