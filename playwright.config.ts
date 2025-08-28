import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ["json", { outputFile: "test-results/results.json" }],
    ["allure-playwright"],
  ],
  use: {
    baseURL: "https://staging.qtecsolution.com",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
    {
      name: "edge",
      use: { ...devices["Desktop Edge"] },
    },

    // Mobile devices
    {
      name: "mobile-320",
      use: {
        ...devices["iPhone SE"],
        viewport: { width: 320, height: 568 },
      },
    },
    {
      name: "mobile-375",
      use: {
        ...devices["iPhone 12"],
        viewport: { width: 375, height: 812 },
      },
    },
    {
      name: "mobile-414",
      use: {
        ...devices["iPhone 12 Pro Max"],
        viewport: { width: 414, height: 896 },
      },
    },

    // Tablet devices
    {
      name: "tablet-768",
      use: {
        ...devices["iPad"],
        viewport: { width: 768, height: 1024 },
      },
    },
    {
      name: "tablet-1024",
      use: {
        ...devices["iPad Pro"],
        viewport: { width: 1024, height: 1366 },
      },
    },

    // Desktop resolutions
    {
      name: "desktop-1366",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: "desktop-1920",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
  outputDir: "test-results/",
});
