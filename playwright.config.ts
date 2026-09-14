import { defineConfig } from "@playwright/test";

const port = process.env.PLAYWRIGHT_PORT ?? "3000";
const baseURL = `http://127.0.0.1:${port}`;

export default defineConfig({
  testDir: "./tests/ui",
  outputDir: "./test-results",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `bun run dev --port ${port}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  projects: [
    { name: "chromium-mobile-320", use: { browserName: "chromium", viewport: { width: 320, height: 720 } } },
    { name: "chromium-mobile-390", use: { browserName: "chromium", viewport: { width: 390, height: 844 } } },
    { name: "chromium-tablet", use: { browserName: "chromium", viewport: { width: 768, height: 1024 } } },
    { name: "chromium-desktop", use: { browserName: "chromium", viewport: { width: 1440, height: 1000 } } },
    { name: "chromium-reduced-motion", use: { browserName: "chromium", viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" } },
    { name: "webkit-mobile", use: { browserName: "webkit", viewport: { width: 390, height: 844 } } },
    { name: "webkit-tablet", use: { browserName: "webkit", viewport: { width: 768, height: 1024 } } },
    { name: "webkit-desktop", use: { browserName: "webkit", viewport: { width: 1440, height: 1000 } } },
    { name: "firefox-mobile", use: { browserName: "firefox", viewport: { width: 390, height: 844 } } },
    { name: "firefox-tablet", use: { browserName: "firefox", viewport: { width: 768, height: 1024 } } },
    { name: "firefox-desktop", use: { browserName: "firefox", viewport: { width: 1440, height: 1000 } } },
  ],
});
