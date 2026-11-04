import assert from "node:assert/strict";
import { test } from "node:test";

import { adminRows, coreValueFields } from "../../lib/admin-data.ts";

test("admin row decoding preserves the supported database and JSON cell values", () => {
  const createdAt = new Date("2026-11-03T00:00:00Z");

  const input = [
    {
      id: 1,
      value: "Integrity",
      createdAt,
      tags: ["community"],
      metadata: { published: true },
      optional: undefined,
    },
  ];

  assert.deepEqual(adminRows.parse(input), input);
});

test("admin row decoding rejects executable values at the table boundary", () => {
  assert.equal(adminRows.safeParse([{ value: () => "unparsed" }]).success, false);
});

test("core-value fields retain empty fallbacks for missing or malformed values", () => {
  assert.deepEqual(coreValueFields.parse({ value: 42, description: null }), {
    value: "",
    description: "",
  });
  assert.deepEqual(coreValueFields.parse({ value: "Integrity", description: "Build trust" }), {
    value: "Integrity",
    description: "Build trust",
  });
});
