const entities = new Map([
  ["&", "&amp;"],
  ["<", "&lt;"],
  [">", "&gt;"],
  ['"', "&quot;"],
]);

function escapeMarkup(value: string, apostrophe: string) {
  return value.replace(/[&<>"']/g, (character) =>
    character === "'" ? apostrophe : (entities.get(character) ?? character),
  );
}

export function escapeHtml(value: string) {
  return escapeMarkup(value, "&#039;");
}

export function escapeXml(value: string) {
  return escapeMarkup(value, "&apos;");
}
