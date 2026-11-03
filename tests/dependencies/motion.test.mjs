import assert from "node:assert/strict";
import { test } from "node:test";

import { getMotionDurationSeconds } from "../../lib/motion.ts";

test("Motion timing survives CSS optimization from milliseconds to seconds", () => {
  for (const [milliseconds, seconds, expected] of [
    ["260ms", ".26s", 0.26],
    ["180ms", ".18s", 0.18],
    ["140ms", ".14s", 0.14],
  ]) {
    assert.equal(getMotionDurationSeconds(milliseconds), expected);
    assert.equal(getMotionDurationSeconds(seconds), expected);
  }

  assert.equal(getMotionDurationSeconds(" 140ms "), 0.14);
  assert.equal(getMotionDurationSeconds("0s"), 0);
});
