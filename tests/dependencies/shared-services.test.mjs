import assert from "node:assert/strict";
import { test } from "node:test";

import { escapeHtml, escapeXml } from "../../lib/format/escape-markup.ts";
import { settleQuery } from "../../lib/services/query.ts";

test("settling queries preserves successful data without choosing a fallback", async () => {
  const rows = [{ id: 1, title: "UISS" }];
  const result = await settleQuery(Promise.resolve(rows));

  assert.equal(result.success, true);
  assert.equal(result.data, rows);

  for (const value of [null, undefined, false, 0, ""]) {
    assert.deepEqual(await settleQuery(Promise.resolve(value)), { success: true, data: value });
  }
});

test("query failures remain explicit so callers can choose fallback and logging policies", async () => {
  assert.deepEqual(await settleQuery(Promise.reject(new Error("database unavailable"))), {
    success: false,
    error: "database unavailable",
  });
  assert.deepEqual(await settleQuery(Promise.reject("connection closed")), {
    success: false,
    error: "connection closed",
  });
});

test("email and RSS escaping preserve their existing apostrophe encodings", () => {
  const value = `<tag title="UISS & students">O'Brien, café</tag>`;

  assert.equal(
    escapeHtml(value),
    "&lt;tag title=&quot;UISS &amp; students&quot;&gt;O&#039;Brien, café&lt;/tag&gt;",
  );
  assert.equal(
    escapeXml(value),
    "&lt;tag title=&quot;UISS &amp; students&quot;&gt;O&apos;Brien, café&lt;/tag&gt;",
  );
  assert.equal(
    escapeXml("https://example.com/?club=ai&year=2026"),
    "https://example.com/?club=ai&amp;year=2026",
  );
  assert.equal(escapeHtml(""), "");
  assert.equal(escapeXml(""), "");
});
