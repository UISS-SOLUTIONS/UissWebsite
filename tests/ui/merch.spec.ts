import { expect, test } from "@playwright/test";

test("a size must be explicitly selected before either polo can be ordered", async ({ page }) => {
  await page.goto("/merch");
  for (const color of ["White", "Black"]) {
    const name = `UISS Polo — ${color}`;
    const card = page.getByRole("article", { name, exact: true });
    const sizes = card.getByRole("group", { name: `Size for ${name}`, exact: true });
    await expect(sizes.getByRole("radio")).toHaveCount(4);
    for (const size of ["M", "L", "XL", "XXL"]) {
      await expect(sizes.getByRole("radio", { name: size, exact: true })).not.toBeChecked();
    }
    await expect(card.getByRole("button", { name: `Choose a size to order ${name} on WhatsApp`, exact: true })).toBeDisabled();
    await expect(card.getByRole("link", { name: /Order.*WhatsApp/ })).toHaveCount(0);
  }
});

test("merch shows complete fronts and product-specific WhatsApp inquiries", async ({ page, browserName }) => {
  const response = await page.goto("/merch");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle("Merch | UISS");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Wear your UISS pride.");
  await expect(page.locator("main article")).toHaveCount(2);

  for (const color of ["White", "Black"]) {
    const name = `UISS Polo — ${color}`;
    const card = page.getByRole("article", { name, exact: true });
    await expect(card.getByText("Tsh 20,000", { exact: true })).toBeVisible();
    const image = card.getByRole("img");
    await expect(image).toHaveAttribute("alt", new RegExp(`Front of the ${color.toLowerCase()} UISS polo`));
    await expect(image).toHaveCSS("object-fit", "contain");
    await expect.poll(() => image.evaluate((element) => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    for (const size of ["M", "L", "XL", "XXL"]) {
      await card.getByText(size, { exact: true }).click();
      const orderLink = card.getByRole("link", { name: `Order ${name}, size ${size}, on WhatsApp (opens in a new tab)`, exact: true });
      await expect(orderLink).toBeVisible();
      const destination = new URL((await orderLink.getAttribute("href"))!);
      expect(destination.origin).toBe("https://wa.me");
      expect(destination.pathname).toBe("/255741231633");
      expect(destination.searchParams.get("text")).toBe(`Hi UISS, I’d like to order the ${name}, size ${size} (Tsh 20,000). Please confirm availability and pickup or delivery.`);
      await card.getByRole("radio", { name: size, exact: true }).focus();
      await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
      await expect(orderLink).toBeFocused();
      await expect.poll(() => orderLink.evaluate((element) => getComputedStyle(element).boxShadow)).toContain("29, 78, 216");
    }
  }

  await expect(page.locator("#merch-order-note")).toHaveCount(0);
  await expect(page.getByRole("complementary", { name: "How to order" })).toHaveCount(0);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  expect(overflow).toBe(false);
});

test("size choices stay independent and work with keyboard arrows", async ({ page }) => {
  await page.goto("/merch");
  const white = page.getByRole("article", { name: "UISS Polo — White", exact: true });
  const black = page.getByRole("article", { name: "UISS Polo — Black", exact: true });
  const medium = white.getByRole("radio", { name: "M", exact: true });
  await medium.focus();
  await page.keyboard.press("Space");
  await expect(medium).toBeChecked();
  await page.keyboard.press("ArrowRight");
  const large = white.getByRole("radio", { name: "L", exact: true });
  await expect(large).toBeFocused();
  await expect(large).toBeChecked();
  const focusedOutline = await large.evaluate((input) => getComputedStyle(input.nextElementSibling!).outlineColor);
  expect(focusedOutline).toBe("rgb(29, 78, 216)");
  await expect(black.getByRole("button", { name: /Choose a size/ })).toBeDisabled();
  await black.getByText("XXL", { exact: true }).click();
  await expect(white.getByRole("radio", { name: "L", exact: true })).toBeChecked();
  await expect(black.getByRole("radio", { name: "XXL", exact: true })).toBeChecked();
  await expect(white.getByRole("link", { name: /Order.*size L/ })).toHaveAttribute("href", /size%20L%20/);
  await expect(black.getByRole("link", { name: /Order.*size XXL/ })).toHaveAttribute("href", /size%20XXL%20/);
  for (const card of [white, black]) {
    const sizes = card.getByRole("radio");
    for (let index = 0; index < await sizes.count(); index++) {
      const target = await sizes.nth(index).locator("..").boundingBox();
      expect(target!.height).toBeGreaterThanOrEqual(44);
      expect(target!.width).toBeGreaterThanOrEqual(44);
    }
  }
});

test("Merch is reachable through Explore and the footer", async ({ page }) => {
  await page.goto("/merch");
  await expect(page.getByRole("navigation", { name: "Footer navigation" }).getByRole("link", { name: "Merch", exact: true })).toHaveAttribute("href", "/merch");
  const navigation = page.getByRole("navigation", { name: "Main navigation" });
  const mobileTrigger = page.getByRole("button", { name: "Open navigation menu" });
  if (await mobileTrigger.isVisible()) {
    await mobileTrigger.click();
    await page.locator("#mobile-navigation").getByRole("button", { name: "Explore", exact: true }).click();
    const merchLink = page.locator("#mobile-navigation").getByRole("link", { name: "Merch", exact: true });
    await expect(merchLink).toBeVisible();
    await merchLink.click();
    await expect(page.locator("#mobile-navigation")).toBeHidden();
  } else {
    const exploreTrigger = navigation.getByRole("button", { name: "Explore", exact: true });
    await exploreTrigger.focus();
    await exploreTrigger.press("Enter");
    const merchLink = navigation.locator('a[href="/merch"]');
    await expect(merchLink).toBeVisible();
    await expect(merchLink).toHaveAttribute("href", "/merch");
    await page.keyboard.press("Escape");
    await expect(merchLink).toBeHidden();
  }
});

test("merch stays static when reduced motion is requested", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/merch");
  const card = page.locator("main article").first();
  await card.hover();
  await expect(card).toHaveCSS("animation-name", "none");
  await expect(card).toHaveCSS("opacity", "1");
  await expect(card.getByRole("img")).toHaveCSS("transform", "none");
});
