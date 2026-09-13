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
    { name: "mobile-320", use: { viewport: { width: 320, height: 720 } } },
    { name: "mobile-390", use: { viewport: { width: 390, height: 844 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "reduced-motion", use: { viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" } },
  ],
});
