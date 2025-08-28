import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

Given('I am on the search page', async function (this: CustomWorld) {
  await this.page!.goto('https://www.google.com');
  await this.page!.waitForLoadState('networkidle');
});

When('I search for {string}', async function (this: CustomWorld, searchTerm: string) {
  await this.page!.fill('input[name="q"]', searchTerm);
  await this.page!.press('input[name="q"]', 'Enter');
  await this.page!.waitForLoadState('networkidle');
});

Then('I should see search results', async function (this: CustomWorld) {
  const results = await this.page!.locator('#search').count();
  expect(results).toBeGreaterThan(0);
});

Then('the results should contain {string}', async function (this: CustomWorld, expectedText: string) {
  const pageContent = await this.page!.content();
  expect(pageContent.toLowerCase()).toContain(expectedText.toLowerCase());
});

Then('the page title should contain {string}', async function (this: CustomWorld, expectedText: string) {
  const title = await this.page!.title();
  expect(title.toLowerCase()).toContain(expectedText.toLowerCase());
});
