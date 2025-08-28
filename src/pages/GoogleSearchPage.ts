import { Page, Locator } from "@playwright/test";

export class GoogleSearchPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly searchResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input[name="q"]');
    this.searchButton = page.locator('input[name="btnK"]');
    this.searchResults = page.locator("#search");
  }

  async goto() {
    await this.page.goto("https://www.google.com");
    await this.page.waitForLoadState("networkidle");
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
    await this.page.waitForLoadState("networkidle");
  }

  async getSearchResultsCount(): Promise<number> {
    return await this.searchResults.count();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async getPageContent(): Promise<string> {
    return await this.page.content();
  }
}
