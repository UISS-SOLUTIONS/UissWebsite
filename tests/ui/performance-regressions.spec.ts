import { expect, test } from "@playwright/test";

import { canOptimizeImage } from "../../lib/image-hosts";

const clubSlugs = [
  "artificial-intelligence",
  "blockchain",
  "data-science",
  "networking",
  "software-development",
  "ui-ux-graphic-design",
];

test("section rendering does not create containment-driven layout shifts", async ({ page }) => {
  await page.goto("/");
  const sectionVisibility = await page.locator("main > section").evaluateAll((sections) =>
    sections.map((section) => getComputedStyle(section).contentVisibility),
  );
  expect(sectionVisibility.every((value) => value === "visible")).toBe(true);
});

for (const route of ["/", "/clubs"]) {
  test(`${route} club preview is viewport-bound and restores focus`, async ({ page }) => {
    test.skip((test.info().project.name !== "chromium-desktop"), "One deterministic desktop run covers modal geometry and focus restoration.");
    await page.goto(route);
    const trigger = page.getByRole("button", { name: /Artificial Intelligence/ });
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click();

    const layer = page.getByTestId("morphing-dialog-layer");
    await expect(layer).toBeVisible();
    const box = await layer.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(box!.x).toBeCloseTo(0, 0);
    expect(box!.y).toBeCloseTo(0, 0);
    expect(box!.width).toBeCloseTo(viewport!.width, 0);
    expect(box!.height).toBeCloseTo(viewport!.height, 0);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await expect(page.getByRole("dialog")).toContainText("Artificial Intelligence");

    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(trigger).toBeFocused();
  });
}

test("club rows retain the original expansion and all profile destinations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "One deterministic pointer run covers expansion and every destination.");
  await page.goto("/clubs");

  const firstTrigger = page.getByRole("button", { name: /Artificial Intelligence/ });
  await firstTrigger.hover();
  const row = page.getByTestId("club-row-artificial-intelligence");
  await expect(row).toHaveAttribute("data-active", "true");
  await expect.poll(async () => (await row.boundingBox())?.height ?? 0).toBeGreaterThan(240);

  for (const slug of clubSlugs) {
    const trigger = page.getByRole("button", { name: new RegExp(`Preview .*`, "i") }).nth(clubSlugs.indexOf(slug));
    await trigger.click();
    await expect(page.getByRole("dialog").getByRole("link", { name: /Open full club profile/i })).toHaveAttribute("href", `/clubs/${slug}`);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});

test("partner marquee moves continuously in normal motion mode", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("desktop"), "Marquee motion is sampled once per desktop browser engine.");
  await page.goto("/");
  const marquee = page.getByTestId("partner-logo-marquee");
  await marquee.scrollIntoViewIfNeeded();
  const track = marquee.locator(":scope > div");
  await expect(track).toBeVisible();
  const firstTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  const secondTransform = await track.evaluate((element) => getComputedStyle(element).transform);
  expect(secondTransform).not.toBe(firstTransform);
});

test("reduced motion presents every partner without a clipped marquee", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-reduced-motion", "Dedicated reduced-motion project.");
  await page.goto("/");
  const staticLogos = page.getByTestId("partner-logo-static");
  await expect(staticLogos).toBeVisible();
  await expect(staticLogos.getByRole("img")).toHaveCount(5);
  await expect(page.getByTestId("partner-logo-marquee")).toHaveCount(0);
});

test("leadership remains a one-row accessible carousel", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("desktop"), "Carousel layout is verified in every desktop browser engine.");
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "UISS leaders" });
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
  await expect(carousel.getByRole("group")).toHaveCount(11);
  await expect(carousel.getByRole("button", { name: "Previous slide" })).toBeDisabled();
  await expect(carousel.getByRole("button", { name: "Next slide" })).toBeEnabled();
});

test("FAQ uses the restored animated SVG control", async ({ page }) => {
  await page.goto("/");
  const question = page.getByRole("button", { name: "Who can join UISS?" });
  await question.scrollIntoViewIfNeeded();
  await expect(question.locator("svg")).toHaveCount(1);
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  const panelId = await question.getAttribute("aria-controls");
  await expect(page.locator(`#${panelId}`)).toHaveAttribute("aria-hidden", "false");
});

test("published project cards retain their reveal behavior", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.endsWith("desktop"), "Reveal behavior is sampled once per desktop browser engine.");
  await page.goto("/");
  const projectSection = page.locator("main > section").filter({ hasText: "Student work" });
  const firstCard = projectSection.locator("article").first();
  test.skip(await firstCard.count() === 0, "No published project fixture is available in this environment.");
  await firstCard.scrollIntoViewIfNeeded();
  await expect(firstCard).toHaveCSS("opacity", "1");
  await expect(firstCard).toBeInViewport();
});

test("mobile navigation keeps its original in-flow presentation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile presentation only.");
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const panel = page.locator("#mobile-navigation");
  await expect(panel).toBeVisible();
  await expect(panel).toHaveCSS("position", "static");
});

test("the intended Source Sans typography loads", async ({ page }) => {
  await page.goto("/");
  await expect.poll(async () => page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily)).toContain("Source Sans 3");
});

test("known image hosts optimize and unknown sources retain safe fallback behavior", () => {
  expect(canOptimizeImage("/clubs/artificial-intelligence.avif")).toBe(true);
  expect(canOptimizeImage("https://res.cloudinary.com/example/image/upload/item.webp")).toBe(true);
  expect(canOptimizeImage("https://unconfigured.example/image.webp")).toBe(false);
  expect(canOptimizeImage("data:image/png;base64,AAAA")).toBe(false);
  expect(canOptimizeImage("blob:https://example.com/id")).toBe(false);
  expect(canOptimizeImage("not a url")).toBe(false);
});

test("all canonical club detail pages resolve", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Canonical route matrix only needs one browser run.");
  test.setTimeout(90_000);
  for (const slug of clubSlugs) {
    const response = await page.goto(`/clubs/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("available dynamic event, project, and blog details resolve", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Dynamic route smoke matrix only needs one browser run.");
  test.setTimeout(90_000);
  for (const route of ["events", "projects", "blog"]) {
    await page.goto(`/${route}`);
    const detailLink = page.locator(`main a[href^="/${route}/"]`).first();
    if (await detailLink.count()) {
      const href = await detailLink.getAttribute("href");
      const response = await page.goto(href!);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
    }
  }
});

test("unauthenticated administration access safely reaches login", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium-desktop", "Administration smoke check only needs one browser run.");
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
  await expect(page.locator("body")).toBeVisible();
});
