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

  const sectionVisibility = await page
    .locator("main > section")
    .evaluateAll((sections) =>
      sections.map((section) => getComputedStyle(section).contentVisibility),
    );

  expect(sectionVisibility.every((value) => value === "visible")).toBe(true);
});

test("desktop navigation stays stable and dropdowns remain responsive", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "One deterministic desktop run covers navbar geometry.",
  );
  await page.goto("/");
  const row = page.locator("header nav > div").first();
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const before = await row.boundingBox();
  const beforeLogo = await page.getByRole("link", { name: "UISS home" }).boundingBox();
  const beforeJoin = await navigation.getByRole("link", { name: "Join UISS" }).boundingBox();
  await page.evaluate(() => window.scrollTo(0, 240));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const after = await row.boundingBox();
  const afterLogo = await page.getByRole("link", { name: "UISS home" }).boundingBox();
  const afterJoin = await navigation.getByRole("link", { name: "Join UISS" }).boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs((before?.height ?? 0) - (after?.height ?? 0))).toBeLessThanOrEqual(1);
  expect(
    Math.abs(beforeLogo!.y + beforeLogo!.height / 2 - (afterLogo!.y + afterLogo!.height / 2)),
  ).toBeLessThanOrEqual(1);
  expect(
    Math.abs(beforeJoin!.y + beforeJoin!.height / 2 - (afterJoin!.y + afterJoin!.height / 2)),
  ).toBeLessThanOrEqual(1);
  await page.getByRole("button", { name: "Clubs", exact: true }).first().hover();
  await expect(navigation.getByText("Technical communities", { exact: true })).toBeVisible({
    timeout: 500,
  });
  await page.getByRole("button", { name: "Explore", exact: true }).hover();
  await expect(navigation.getByText("Explore UISS", { exact: true })).toBeVisible({ timeout: 500 });
});

for (const route of ["/", "/clubs"]) {
  test(`${route} club preview is viewport-bound and restores focus`, async ({ page }) => {
    test.skip(
      test.info().project.name !== "chromium-desktop",
      "One deterministic desktop run covers modal geometry and focus restoration.",
    );
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

test("club rows stay stable and retain all profile destinations", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "One deterministic pointer run covers row geometry and every destination.",
  );
  test.setTimeout(90_000);
  await page.goto("/clubs");

  const firstTrigger = page.getByRole("button", { name: /Artificial Intelligence/ });
  const row = page.getByTestId("club-row-artificial-intelligence");
  await firstTrigger.scrollIntoViewIfNeeded();
  const before = await row.boundingBox();
  await firstTrigger.hover();
  const after = await row.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(after!.height).toBeCloseTo(before!.height, 0);
  await expect(row).toContainText("Build practical AI systems");

  for (const slug of clubSlugs) {
    const trigger = page.getByTestId(`club-row-${slug}`).locator("xpath=ancestor::button[1]");
    await trigger.click();
    await expect(
      page.getByRole("dialog").getByRole("link", { name: /Open full club profile/i }),
    ).toHaveAttribute("href", `/clubs/${slug}`);
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  }
});

test("every collaborator stays visible without decorative motion", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.endsWith("desktop"),
    "Partner layout is verified once per desktop browser engine.",
  );
  await page.goto("/");
  const logos = page.getByTestId("partner-logo-static");
  await logos.scrollIntoViewIfNeeded();
  await expect(logos.getByRole("img")).toHaveCount(6);

  for (const logo of await logos.getByRole("img").all()) {
    await expect(logo).toBeVisible();
    await expect(logo).toHaveCSS("transform", "none");
    await expect(logo).toHaveCSS("animation-name", "none");
  }

  await expect(page.getByTestId("partner-logo-marquee")).toHaveCount(0);
});

test("reduced motion presents every partner without a clipped marquee", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-reduced-motion",
    "Dedicated reduced-motion project.",
  );
  await page.goto("/");
  const staticLogos = page.getByTestId("partner-logo-static");
  await expect(staticLogos).toBeVisible();
  await expect(staticLogos.getByRole("img")).toHaveCount(6);
  await expect(staticLogos.getByRole("img", { name: "UDICTI" })).toHaveCount(1);
  await expect(page.getByTestId("partner-logo-marquee")).toHaveCount(0);
});

test("leadership exposes every student in a static portrait grid", async ({ page }) => {
  await page.goto("/");
  const team = page.locator("#team");
  await expect(team.getByRole("list", { name: "UISS leaders" }).getByRole("listitem")).toHaveCount(
    11,
  );
  await expect(team.getByRole("heading", { name: "Collince Sanare", exact: true })).toBeVisible();
  await expect(team.getByRole("heading", { name: "Winifrida Masalu", exact: true })).toBeVisible();
  await expect(team.getByRole("link", { name: "About our leadership" })).toHaveAttribute(
    "href",
    "/about#leadership",
  );
});

test("FAQ responds immediately and exposes an actionable answer", async ({ page }) => {
  await page.goto("/#faq");
  const question = page.getByRole("button", { name: "Who can join UISS?" });
  await expect(question).toBeVisible();
  await expect(question.locator("svg")).toHaveCount(1);
  await question.click();
  await expect(question).toHaveAttribute("aria-expanded", "true");
  const panelId = await question.getAttribute("aria-controls");
  await expect(page.locator(`#${panelId}`)).toHaveAttribute("aria-hidden", "false");
  await expect(page.locator(`#${panelId}`).getByRole("link")).toHaveAttribute(
    "href",
    "/membership",
  );
  await question.press("Enter");
  await expect(page.locator(`#${panelId}`)).toBeHidden();
});

test("published project cards render without waiting for a reveal", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.endsWith("desktop"),
    "Static rendering is sampled once per desktop browser engine.",
  );
  await page.goto("/");
  const projectSection = page.locator("main > section").filter({ hasText: "Student work" });
  const firstCard = projectSection.locator("article").first();
  test.skip(
    (await firstCard.count()) === 0,
    "No published project fixture is available in this environment.",
  );
  await expect(firstCard).toHaveCSS("opacity", "1");
  await expect(firstCard).toHaveCSS("transform", "none");
  await firstCard.scrollIntoViewIfNeeded();
  await expect(firstCard).toBeInViewport();
});

test("the full-width header removes closed mobile menus from layout", async ({
  page,
}, testInfo) => {
  test.skip(
    !/(mobile|tablet)/.test(testInfo.project.name),
    "Responsive shell geometry is covered on mobile and tablet.",
  );
  await page.goto("/");

  const shell = page.locator("header > div > div");
  const header = page.locator("header");
  const closedShell = await shell.boundingBox();
  const closedHeader = await header.boundingBox();
  expect(closedShell).not.toBeNull();
  expect(closedHeader).not.toBeNull();
  expect(closedShell!.y).toBe(0);
  expect(closedShell!.height).toBeCloseTo(64, 0);
  expect(closedHeader!.height).toBeCloseTo(64, 0);
  const closedPanel = page.locator("#mobile-navigation");
  await expect(closedPanel).toBeHidden();
  expect(await closedPanel.boundingBox()).toBeNull();

  const trigger = page.getByRole("button", { name: "Open navigation menu" });
  await trigger.click();
  const panel = page.locator("#mobile-navigation");
  await expect(panel).toBeVisible();
  await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
  expect((await shell.boundingBox())?.height ?? 0).toBeGreaterThan(closedShell!.height);

  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Open navigation menu" })).toBeFocused();
  await expect(panel).toBeHidden();
  expect(await panel.boundingBox()).toBeNull();
  await expect(page.locator("body")).toHaveCSS("overflow", "visible");
});

test("the full-width desktop header stays stable while scrolling", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.endsWith("desktop"),
    "Desktop shell geometry is covered in each browser engine.",
  );
  await page.goto("/");
  const shell = page.locator("header > div > div");
  const viewport = page.viewportSize();
  const before = await shell.boundingBox();
  expect(before).not.toBeNull();
  expect(viewport).not.toBeNull();
  expect(before!.width).toBeCloseTo(viewport!.width, 0);
  expect(before!.x).toBeCloseTo(0, 0);
  expect(before!.height).toBeCloseTo(64, 0);

  await page.evaluate(() => window.scrollTo(0, 240));
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  const after = await shell.boundingBox();
  expect(after).not.toBeNull();
  expect(after!.x).toBeCloseTo(before!.x, 0);
  expect(after!.y).toBeCloseTo(before!.y, 0);
  expect(after!.height).toBeCloseTo(before!.height, 0);
});

test("reduced motion keeps header menu transitions static", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-reduced-motion",
    "Reduced-motion navbar behavior has one deterministic project.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  await expect(page.locator("#mobile-navigation")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("#mobile-navigation")
        .evaluate((element) => Number.parseFloat(getComputedStyle(element).transitionDuration)),
    )
    .toBeLessThanOrEqual(0.001);
});

test("mobile header disclosures retain every UISS destination", async ({ page }, testInfo) => {
  test.skip(
    !testInfo.project.name.includes("mobile"),
    "Mobile navigation destinations are covered on mobile.",
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation menu" }).click();
  const panel = page.locator("#mobile-navigation");

  await panel.getByRole("button", { name: "Clubs", exact: true }).click();

  for (const href of [
    "/clubs/artificial-intelligence",
    "/clubs/blockchain",
    "/clubs/data-science",
    "/clubs/networking",
    "/clubs/software-development",
    "/clubs/ui-ux-graphic-design",
    "/clubs",
  ]) {
    await expect(panel.locator(`a[href="${href}"]`)).toHaveCount(1);
  }

  await panel.getByRole("button", { name: "Explore", exact: true }).click();
  await expect(panel.locator('a[href="/events"]')).toHaveCount(1);
  await expect(panel.locator('a[href="/projects"]')).toHaveCount(1);
  await expect(panel.locator('a[href="/merch"]')).toHaveCount(1);
  await expect(panel.locator('a[href="/blog"]')).toHaveCount(1);
  await expect(panel.locator('a[href="/about"]')).toHaveCount(1);
  await expect(panel.locator('a[href="/membership"]')).toHaveCount(1);
});

test("the intended local Geist typography loads", async ({ page }) => {
  await page.goto("/");
  await expect
    .poll(async () =>
      page.locator("body").evaluate((element) => getComputedStyle(element).fontFamily),
    )
    .toContain("geistSans");
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
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "Canonical route matrix only needs one browser run.",
  );
  test.setTimeout(90_000);

  for (const slug of clubSlugs) {
    const response = await page.goto(`/clubs/${slug}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});

test("available dynamic event, project, and blog details resolve", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "Dynamic route smoke matrix only needs one browser run.",
  );
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
  test.skip(
    testInfo.project.name !== "chromium-desktop",
    "Administration smoke check only needs one browser run.",
  );
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/login(?:\?|$)/);
  await expect(page.locator("body")).toBeVisible();
});
