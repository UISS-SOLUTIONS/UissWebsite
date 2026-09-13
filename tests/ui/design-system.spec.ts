import { expect, test } from "@playwright/test";

import { leadershipCatalog } from "../../lib/leadership-catalog";
import { getCanonicalLeaderName, getLocalLeaderPortrait, resolveLeaderPortrait } from "../../lib/leader-portraits";

const publicRoutes = ["/", "/about", "/clubs", "/events", "/projects", "/blog", "/membership", "/login"];

for (const route of publicRoutes) {
  test(`${route} has sound responsive structure`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
    expect(overflow).toBe(false);
    const unnamedControls = await page.locator("button:not([aria-label])").evaluateAll((buttons) => buttons.filter((button) => !(button.textContent || "").trim()).length);
    expect(unnamedControls).toBe(0);
  });
}

test("keyboard focus remains visible", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const outline = await page.locator(":focus-visible").evaluate((element) => getComputedStyle(element).outlineStyle);
  expect(outline).not.toBe("none");
});

test("reduced motion disables smooth scrolling", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe("auto");
});

test("mobile navigation opens with an actionable close control", async ({ page }) => {
  test.setTimeout(60_000);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "Close navigation menu" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation menu" }).click();
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeVisible();
});

test("FAQ controls expose expanded state", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  const question = page.getByRole("button", { name: "Who can join UISS?" });
  await expect(question).toHaveAttribute("aria-expanded", "false");
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator(`#${await question.getAttribute("aria-controls")}`)).toBeVisible();
});

test("the local leadership portrait manifest maps every supplied portrait", () => {
  const expectedPortraits = {
    "Winifrida Masalu": "/leaders/2026-2027/winifrida-masalu.webp?v=2",
    "Lutome Galila": "/leaders/2026-2027/lutome-galila.webp?v=2",
    "Hefsibamakelle Mteri": "/leaders/2026-2027/hefsibamakelle-mteri.webp?v=2",
    "Sifa Kamendu": "/leaders/2026-2027/sifa-kamendu.webp?v=2",
    "Abdon Musa": "/leaders/2026-2027/abdon-musa.webp?v=2",
    "Alexander Marwa": "/leaders/2026-2027/alexander-marwa.webp?v=2",
    "Noreen Mrema": "/leaders/2026-2027/noreen-mrema.webp?v=2",
    "Dorcas Laiser": "/leaders/2026-2027/dorcas-laiser.webp?v=2",
    "Gadi Josephat": "/leaders/2026-2027/gadi-josephat.webp?v=2",
    "Prof. Baraka J. Maiseli": "/leaders/2026-2027/prof-baraka-maiseli.webp",
  } as const;

  for (const [name, src] of Object.entries(expectedPortraits)) {
    expect(getLocalLeaderPortrait(name)?.src).toBe(src);
  }
});

test("database portraits override local portraits without removing the local fallback", () => {
  const databaseImage = "https://res.cloudinary.com/dsuixbwp7/image/upload/example.webp";
  const resolvedPortrait = resolveLeaderPortrait("Sifa Kamendu", databaseImage);

  expect(resolvedPortrait.src).toBe(databaseImage);
  expect(resolvedPortrait.fallbackSrc).toBe("/leaders/2026-2027/sifa-kamendu.webp?v=2");
  expect(getCanonicalLeaderName("Sifa Ramendu")).toBe("Sifa Kamendu");
  expect(getLocalLeaderPortrait("Sifa Ramendu")?.src).toBe("/leaders/2026-2027/sifa-kamendu.webp?v=2");
  expect(resolveLeaderPortrait("Collince Sanare").src).toBeUndefined();
  expect(resolveLeaderPortrait("Baraka Alex").src).toBeUndefined();
});

test("the public leadership views use portraits and preserve intentional initials", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByAltText("Portrait of Prof. Baraka J. Maiseli")).toHaveCount(1);
  await expect(page.getByAltText("Portrait of Sifa Kamendu")).toHaveCount(1);
  await expect(page.getByLabel("Collince Sanare initials")).toBeVisible();
  await expect(page.getByLabel("Baraka Alex initials")).toBeVisible();
  await expect(page.locator("main")).not.toContainText("Sifa Ramendu");

  await page.goto("/");
  await expect(page.locator("#team")).not.toContainText("Prof. Baraka J. Maiseli");
});

test("a broken portrait request degrades to initials", async ({ page }) => {
  await page.route("**/*", async (route) => {
    const requestUrl = decodeURIComponent(route.request().url());
    if (requestUrl.includes("prof-baraka-maiseli.webp")) {
      await route.fulfill({ status: 404, body: "Portrait unavailable" });
      return;
    }
    await route.continue();
  });

  await page.goto("/about");
  await page.locator("#leadership").scrollIntoViewIfNeeded();
  await expect(page.getByLabel("Prof. Baraka J. Maiseli initials")).toBeVisible();
});

test("the leadership catalog uses the canonical Sifa spelling", () => {
  const leaderNames: string[] = leadershipCatalog.map((leader) => leader.name);
  expect(leaderNames).toContain("Sifa Kamendu");
  expect(leaderNames).not.toContain("Sifa Ramendu");
});
