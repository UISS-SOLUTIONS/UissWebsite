import { expect, test } from "@playwright/test";

import { leadershipCatalog } from "../../lib/leadership-catalog";
import {
  getActiveLeaderPortraitCandidate,
  getCanonicalLeaderName,
  getLeaderPortraitCandidates,
  getLocalLeaderPortrait,
  resolveLeaderPortrait,
} from "../../lib/leader-portraits";

const publicRoutes = ["/", "/about", "/clubs", "/events", "/projects", "/merch", "/blog", "/membership", "/login"];

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
  const control = page.getByRole("link", { name: "UISS home" });
  await control.focus();
  const outline = await control.evaluate((element) => getComputedStyle(element).outlineStyle);
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
    "Collince Sanare": "/leaders/2026-2027/collince-sanare.avif",
    "Baraka Alex": "/leaders/2026-2027/baraka-alex.avif",
    "Alexander Marwa": "/leaders/2026-2027/alexander-marwa.avif",
    "Hefsibamakelle Mteri": "/leaders/2026-2027/hefsibamakelle-mteri.avif",
    "Noreen Mrema": "/leaders/2026-2027/noreen-mrema.avif",
    "Sifa Kamendu": "/leaders/2026-2027/sifa-kamendu.avif",
    "Lutome Galila": "/leaders/2026-2027/lutome-galila.avif",
    "Gadi Josephat": "/leaders/2026-2027/gadi-josephat.avif",
    "Abdon Musa": "/leaders/2026-2027/abdon-musa.avif",
    "Dorcas Laiser": "/leaders/2026-2027/dorcas-laiser.avif",
    "Winifrida Masalu": "/leaders/2026-2027/winifrida-masalu.avif",
    "Prof. Baraka J. Maiseli": "/leaders/2026-2027/prof-baraka-maiseli.avif",
  } as const;

  for (const [name, src] of Object.entries(expectedPortraits)) {
    expect(getLocalLeaderPortrait(name)?.src).toBe(src);
  }
});

test("local portraits override database portraits without removing the database fallback", () => {
  const databaseImage = "https://res.cloudinary.com/dsuixbwp7/image/upload/example.webp";
  const resolvedPortrait = resolveLeaderPortrait("Sifa Kamendu", databaseImage, "card");
  const avatarPortrait = resolveLeaderPortrait("Sifa Kamendu", databaseImage, "avatar");
  const advisorPortrait = resolveLeaderPortrait("Sifa Kamendu", databaseImage, "advisor");

  expect(resolvedPortrait.src).toBe("/leaders/2026-2027/sifa-kamendu.avif");
  expect(resolvedPortrait.fallbackSrc).toBe(databaseImage);
  expect(resolvedPortrait.objectPosition).toBe("50% 38%");
  expect(avatarPortrait.objectPosition).toBe("50% 34%");
  expect(advisorPortrait.objectPosition).toBe(resolvedPortrait.objectPosition);
  expect(avatarPortrait.fallbackObjectPosition).toBe("50% 50%");
  const candidates = getLeaderPortraitCandidates(resolvedPortrait);
  expect(getActiveLeaderPortraitCandidate(candidates, [])).toEqual({
    src: "/leaders/2026-2027/sifa-kamendu.avif",
    objectPosition: "50% 38%",
  });
  expect(getActiveLeaderPortraitCandidate(candidates, ["/leaders/2026-2027/sifa-kamendu.avif"])).toEqual({
    src: databaseImage,
    objectPosition: "50% 50%",
  });
  expect(getActiveLeaderPortraitCandidate(candidates, ["/leaders/2026-2027/sifa-kamendu.avif", databaseImage])).toBeUndefined();
  expect(getLeaderPortraitCandidates(resolveLeaderPortrait("Sifa Kamendu", "/leaders/2026-2027/sifa-kamendu.avif", "card"))).toEqual([
    { src: "/leaders/2026-2027/sifa-kamendu.avif", objectPosition: "50% 38%" },
  ]);
  expect(getCanonicalLeaderName("Sifa Ramendu")).toBe("Sifa Kamendu");
  expect(getLocalLeaderPortrait("Sifa Ramendu")?.src).toBe("/leaders/2026-2027/sifa-kamendu.avif");
  expect(resolveLeaderPortrait("Collince Sanare").src).toBe("/leaders/2026-2027/collince-sanare.avif");
  expect(resolveLeaderPortrait("Baraka Alex").src).toBe("/leaders/2026-2027/baraka-alex.avif");
});

test("the public leadership views use every supplied portrait", async ({ page }) => {
  await page.goto("/about");

  await expect(page.getByAltText("Portrait of Prof. Baraka J. Maiseli")).toHaveCount(1);
  await expect(page.getByAltText("Portrait of Sifa Kamendu")).toHaveCount(1);
  await expect(page.getByAltText("Portrait of Collince Sanare")).toHaveCount(1);
  await expect(page.getByAltText("Portrait of Baraka Alex")).toHaveCount(1);
  await expect(page.locator("main")).not.toContainText("Sifa Ramendu");

  await page.goto("/");
  await expect(page.locator("#team")).not.toContainText("Prof. Baraka J. Maiseli");
});

test("a broken portrait request degrades to initials", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-mobile-390", "One deterministic mobile run covers image fallback behavior.");
  await page.route("**/*", async (route) => {
    const requestUrl = decodeURIComponent(route.request().url());
    if (requestUrl.includes("prof-baraka-maiseli.avif")) {
      await route.fulfill({ status: 404, body: "Portrait unavailable" });
      return;
    }
    await route.continue();
  });

  await page.goto("/about");
  const portrait = page.getByAltText("Portrait of Prof. Baraka J. Maiseli");
  await portrait.scrollIntoViewIfNeeded();
  await expect(page.getByLabel("Prof. Baraka J. Maiseli initials")).toBeVisible({ timeout: 30_000 });
});

test("the leadership catalog uses the canonical Sifa spelling", () => {
  const leaderNames: string[] = leadershipCatalog.map((leader) => leader.name);
  expect(leaderNames).toContain("Sifa Kamendu");
  expect(leaderNames).not.toContain("Sifa Ramendu");
});
