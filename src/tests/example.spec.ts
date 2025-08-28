import { test, expect } from "@playwright/test";

test.describe("Example Test Suite", () => {
  test("should navigate to Google and search", async ({ page }) => {
    // Navigate to Google
    await page.goto("https://www.google.com");

    // Wait for the page to load
    await page.waitForLoadState("networkidle");

    // Fill the search box
    await page.fill('input[name="q"]', "Playwright testing");

    // Press Enter to search
    await page.press('input[name="q"]', "Enter");

    // Wait for results to load
    await page.waitForLoadState("networkidle");

    // Verify that search results are displayed
    const searchResults = await page.locator("#search").count();
    expect(searchResults).toBeGreaterThan(0);

    // Verify page title contains search term
    const title = await page.title();
    expect(title.toLowerCase()).toContain("playwright");
  });

  test("should handle page navigation", async ({ page }) => {
    // Navigate to a test page
    await page.goto("https://example.com");

    // Verify page title
    await expect(page).toHaveTitle(/Example Domain/);

    // Verify page content
    const heading = page.locator("h1");
    await expect(heading).toContainText("Example Domain");
  });
});
