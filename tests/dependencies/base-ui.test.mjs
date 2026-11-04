import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { Button } from "../../components/ui/button.tsx";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../components/ui/collapsible.tsx";

test("Base UI button composition preserves native navigation links", () => {
  const html = renderToStaticMarkup(
    createElement(
      Button,
      { render: createElement("a", { href: "/membership" }), nativeButton: false },
      "Join UISS",
    ),
  );

  assert.match(html, /^<a\b/);
  assert.match(html, /href="\/membership"/);
  assert.doesNotMatch(html, /role="button"|<button\b|type="button"/);
  assert.match(html, />Join UISS<\/a>$/);
});

test("Base UI action buttons retain submit and disabled behavior without nested buttons", () => {
  const submit = renderToStaticMarkup(
    createElement(Button, { type: "submit", disabled: true }, "Submit application"),
  );

  assert.match(submit, /^<button\b/);
  assert.match(submit, /type="submit"/);
  assert.match(submit, /disabled=""/);

  const disclosure = renderToStaticMarkup(
    createElement(
      Collapsible,
      { open: true },
      createElement(CollapsibleTrigger, { render: createElement(Button) }, "Explore"),
      createElement(CollapsibleContent, null, "UISS communities"),
    ),
  );

  assert.equal((disclosure.match(/<button\b/g) ?? []).length, 1);
  assert.match(disclosure, /aria-expanded="true"/);
  assert.match(disclosure, /UISS communities/);
});
