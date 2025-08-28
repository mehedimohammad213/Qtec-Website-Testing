import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/world";
import { GoogleSearchPage } from "../pages/GoogleSearchPage";

let googlePage: GoogleSearchPage;

Given("I am on the Google search page", async function (this: CustomWorld) {
  googlePage = new GoogleSearchPage(this.page!);
  await googlePage.goto();
});

When(
  "I search for {string} using page object",
  async function (this: CustomWorld, searchTerm: string) {
    await googlePage.search(searchTerm);
  }
);

Then(
  "I should see search results using page object",
  async function (this: CustomWorld) {
    const resultsCount = await googlePage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
  }
);

Then(
  "the page title should contain {string} using page object",
  async function (this: CustomWorld, expectedText: string) {
    const title = await googlePage.getPageTitle();
    expect(title.toLowerCase()).toContain(expectedText.toLowerCase());
  }
);

Then(
  "the page content should contain {string} using page object",
  async function (this: CustomWorld, expectedText: string) {
    const content = await googlePage.getPageContent();
    expect(content.toLowerCase()).toContain(expectedText.toLowerCase());
  }
);
