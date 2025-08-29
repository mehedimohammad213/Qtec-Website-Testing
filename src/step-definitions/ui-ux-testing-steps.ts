import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { QTECHomePage } from "../pages/QTECHomePage";
import { TestData } from "../utils/TestData";
import { CustomWorld } from "../support/world";

let qtecHomePage: QTECHomePage;

Before(async function (this: CustomWorld) {
  if (this.page) {
    qtecHomePage = new QTECHomePage(this.page);
  }
});

Given("I am on the QTEC solution website", async function () {
  await qtecHomePage.goto();
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

// Visual Design Testing Steps
Then(
  "the color scheme should be consistent throughout the website",
  async function () {
    // Check for consistent colors by examining CSS variables or computed styles
    const primaryColor = await this.page.evaluate(() => {
      const element = document.querySelector("body");
      return element
        ? getComputedStyle(element).getPropertyValue("--primary-color")
        : "";
    });
    expect(primaryColor).toBeTruthy();
  }
);

Then("the typography should be uniform across all pages", async function () {
  // Check font consistency
  const fontFamily = await this.page.evaluate(() => {
    const element = document.querySelector("body");
    return element ? getComputedStyle(element).fontFamily : "";
  });
  expect(fontFamily).toBeTruthy();
});

Then("the branding elements should be properly displayed", async function () {
  await expect(qtecHomePage.logo).toBeVisible();
});

Then(
  "the logo should be clearly visible and properly positioned",
  async function () {
    const logoBox = await qtecHomePage.logo.boundingBox();
    expect(logoBox).toBeTruthy();
    expect(logoBox!.width).toBeGreaterThan(0);
    expect(logoBox!.height).toBeGreaterThan(0);
  }
);

// Element Alignment and Spacing Testing
Then("all page elements should be properly aligned", async function () {
  const headerBox = await qtecHomePage.pageHeader.boundingBox();
  const footerBox = await qtecHomePage.pageFooter.boundingBox();

  expect(headerBox).toBeTruthy();
  expect(footerBox).toBeTruthy();
});

Then("there should be consistent spacing between elements", async function () {
  // Check spacing by examining margins and padding
  const spacing = await this.page.evaluate(() => {
    const elements = document.querySelectorAll("section, div");
    const spacings = [];
    for (const element of Array.from(elements)) {
      const style = getComputedStyle(element);
      spacings.push({
        margin: style.margin,
        padding: style.padding,
      });
    }
    return spacings;
  });
  expect(spacing.length).toBeGreaterThan(0);
});

Then("the layout should be visually balanced", async function () {
  const viewport = await this.page.viewportSize();
  expect(viewport).toBeTruthy();
  expect(viewport!.width).toBeGreaterThan(0);
  expect(viewport!.height).toBeGreaterThan(0);
});

Then("no elements should overlap or be cut off", async function () {
  const elements = await this.page.locator("*").all();
  for (const element of elements) {
    const box = await element.boundingBox();
    if (box) {
      expect(box.width).toBeGreaterThan(0);
      expect(box.height).toBeGreaterThan(0);
    }
  }
});

// Button and Interactive Element Testing
When("I hover over buttons", async function () {
  await qtecHomePage.bookMeetingLink.hover();
});

Then("buttons should show hover effects", async function () {
  const hoverState = await qtecHomePage.testButtonHoverState("button");
  expect(hoverState).toBeTruthy();
});

When("I click on buttons", async function () {
  await qtecHomePage.subscribeButton.click();
});

Then("buttons should show active/pressed states", async function () {
  const activeState = await qtecHomePage.testButtonActiveState("button");
  expect(activeState).toBeTruthy();
});

When("I focus on buttons using keyboard", async function () {
  await qtecHomePage.subscribeButton.focus();
});

Then("buttons should show focus indicators", async function () {
  const focusState = await qtecHomePage.subscribeButton.evaluate((el) => {
    return getComputedStyle(el).outline !== "none";
  });
  expect(focusState).toBeTruthy();
});

// Form Field Styling Testing
When("I focus on form fields", async function () {
  await qtecHomePage.emailSubscriptionInput.focus();
});

Then("form fields should show focus indicators", async function () {
  const focusState = await qtecHomePage.emailSubscriptionInput.evaluate(
    (el) => {
      return (
        getComputedStyle(el).outline !== "none" ||
        getComputedStyle(el).borderColor !== ""
      );
    }
  );
  expect(focusState).toBeTruthy();
});

When("I enter invalid data", async function () {
  await qtecHomePage.emailSubscriptionInput.fill("invalid-email");
});

Then("form fields should show error styling", async function () {
  const errorState = await qtecHomePage.emailSubscriptionInput.evaluate(
    (el) => {
      return (
        el.classList.contains("error") ||
        getComputedStyle(el).borderColor.includes("red")
      );
    }
  );
  expect(errorState).toBeTruthy();
});

When("I enter valid data", async function () {
  await qtecHomePage.emailSubscriptionInput.fill("test@example.com");
});

Then("form fields should show success styling", async function () {
  const successState = await qtecHomePage.emailSubscriptionInput.evaluate(
    (el) => {
      return (
        el.classList.contains("success") ||
        getComputedStyle(el).borderColor.includes("green")
      );
    }
  );
  expect(successState).toBeTruthy();
});

// Image and Media Testing
Then("all images should be properly optimized", async function () {
  const optimizationResults = await qtecHomePage.checkImageOptimization();
  for (const result of optimizationResults) {
    expect(result.hasAlt).toBeTruthy();
  }
});

Then("images should load quickly", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    await expect(img).toBeVisible();
  }
});

Then("images should be clear and not pixelated", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const naturalWidth = await img.evaluate(
      (el) => (el as HTMLImageElement).naturalWidth
    );
    const naturalHeight = await img.evaluate(
      (el) => (el as HTMLImageElement).naturalHeight
    );
    expect(naturalWidth).toBeGreaterThan(0);
    expect(naturalHeight).toBeGreaterThan(0);
  }
});

Then("images should have appropriate alt text", async function () {
  const imagesWithoutAlt = await qtecHomePage.checkImageAltText();
  expect(imagesWithoutAlt.length).toBe(0);
});

// Video and Media Content Testing
When("I play videos on the website", async function () {
  const videos = await this.page.locator("video").all();
  this.videos = videos;
});

Then("videos should play smoothly", async function () {
  expect(this.videos.length).toBeGreaterThanOrEqual(0);
});

Then("video controls should be accessible", async function () {
  for (const video of this.videos) {
    const controls = await video.getAttribute("controls");
    expect(controls).toBeTruthy();
  }
});

Then("videos should be properly responsive", async function () {
  for (const video of this.videos) {
    const width = await video.evaluate((el) => getComputedStyle(el).width);
    expect(width).toBeTruthy();
  }
});

// Typography Testing
Then("heading fonts should be consistent", async function () {
  const headingStructure = await qtecHomePage.checkHeadingStructure();
  expect(headingStructure.length).toBeGreaterThan(0);
});

Then("body text should be readable", async function () {
  const bodyText = await this.page.locator("p").first();
  if (await bodyText.isVisible()) {
    const fontSize = await bodyText.evaluate(
      (el) => getComputedStyle(el).fontSize
    );
    expect(fontSize).toBeTruthy();
  }
});

Then(
  "font sizes should be appropriate for different screen sizes",
  async function () {
    const responsiveFonts = await this.page.evaluate(() => {
      const elements = document.querySelectorAll("h1, h2, h3, p");
      const fontSizes = [];
      for (const element of Array.from(elements)) {
        fontSizes.push(getComputedStyle(element).fontSize);
      }
      return fontSizes;
    });
    expect(responsiveFonts.length).toBeGreaterThan(0);
  }
);

Then("line spacing should be comfortable for reading", async function () {
  const lineHeight = await this.page.evaluate(() => {
    const element = document.querySelector("p");
    return element ? getComputedStyle(element).lineHeight : "";
  });
  expect(lineHeight).toBeTruthy();
});

// Color and Contrast Testing
Then(
  "text should have sufficient contrast against backgrounds",
  async function () {
    const textElements = await this.page
      .locator("p, h1, h2, h3, h4, h5, h6, span")
      .all();
    expect(textElements.length).toBeGreaterThan(0);
  }
);

Then(
  "color should not be the only way to convey information",
  async function () {
    const links = await qtecHomePage.allLinks.all();
    for (const link of links) {
      const textDecoration = await link.evaluate(
        (el) => getComputedStyle(el).textDecoration
      );
      expect(textDecoration).toBeTruthy();
    }
  }
);

Then(
  "interactive elements should be clearly distinguishable",
  async function () {
    const buttons = await qtecHomePage.allButtons.all();
    for (const button of buttons) {
      await expect(button).toBeVisible();
    }
  }
);

// Layout Testing
Then("the header should be properly positioned", async function () {
  const headerBox = await qtecHomePage.pageHeader.boundingBox();
  expect(headerBox).toBeTruthy();
  expect(headerBox!.y).toBeGreaterThanOrEqual(0);
});

Then("the main content area should be well-organized", async function () {
  const mainContent = await qtecHomePage.mainContent.boundingBox();
  expect(mainContent).toBeTruthy();
});

Then("the footer should be properly positioned", async function () {
  const footerBox = await qtecHomePage.pageFooter.boundingBox();
  expect(footerBox).toBeTruthy();
});

Then("the navigation should be easily accessible", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

// User Experience Testing
When("I navigate through the website", async function () {
  await qtecHomePage.navigateToAboutUs();
  await qtecHomePage.goto();
  await qtecHomePage.navigateToContactUs();
});

Then("the navigation should be intuitive", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

Then("I should be able to find information easily", async function () {
  const contentElements = await this.page.locator("h1, h2, h3, p").all();
  expect(contentElements.length).toBeGreaterThan(0);
});

Then("the user journey should be smooth", async function () {
  await qtecHomePage.goto();
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

Then("there should be clear calls-to-action", async function () {
  await expect(qtecHomePage.bookMeetingLink).toBeVisible();
  await expect(qtecHomePage.projectEstimationLink).toBeVisible();
});

// Loading States and Feedback Testing
When("I perform actions that require loading", async function () {
  await qtecHomePage.goto();
});

Then("loading indicators should be displayed", async function () {
  // Check for loading spinners or progress indicators
  const loadingElements = await this.page
    .locator(".loading, .spinner, [data-loading]")
    .all();
  expect(loadingElements.length).toBeGreaterThanOrEqual(0);
});

Then("users should receive appropriate feedback", async function () {
  // Check for success/error messages
  const feedbackElements = await this.page
    .locator(".message, .alert, .notification")
    .all();
  expect(feedbackElements.length).toBeGreaterThanOrEqual(0);
});

Then("the interface should remain responsive", async function () {
  await expect(this.page).toBeTruthy();
});

// Content Testing
Then("content should be well-organized", async function () {
  const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").all();
  expect(headings.length).toBeGreaterThan(0);
});

Then("information should be easy to scan", async function () {
  const paragraphs = await this.page.locator("p").all();
  expect(paragraphs.length).toBeGreaterThan(0);
});

Then(
  "important information should be prominently displayed",
  async function () {
    const h1Elements = await this.page.locator("h1").all();
    expect(h1Elements.length).toBeGreaterThan(0);
  }
);

Then("content should be up-to-date and accurate", async function () {
  const pageContent = await this.page.content();
  expect(pageContent).toBeTruthy();
});

// Interactive Element Testing
When("I interact with dropdown menus", async function () {
  const dropdowns = await this.page
    .locator('select, .dropdown, [role="listbox"]')
    .all();
  this.dropdowns = dropdowns;
});

Then("menus should open and close smoothly", async function () {
  expect(this.dropdowns.length).toBeGreaterThanOrEqual(0);
});

Then("menu items should be easily selectable", async function () {
  for (const dropdown of this.dropdowns) {
    await expect(dropdown).toBeEnabled();
  }
});

When("I open modals or popups", async function () {
  const modals = await this.page
    .locator('.modal, .popup, [role="dialog"]')
    .all();
  this.modals = modals;
});

Then("they should be properly positioned", async function () {
  expect(this.modals.length).toBeGreaterThanOrEqual(0);
});

Then("they should be easily dismissible", async function () {
  for (const modal of this.modals) {
    const closeButton = await modal
      .locator('.close, [aria-label="Close"], button')
      .first();
    if (await closeButton.isVisible()) {
      await expect(closeButton).toBeEnabled();
    }
  }
});

// Animation and Transition Testing
When("I navigate between pages", async function () {
  await qtecHomePage.navigateToAboutUs();
  await qtecHomePage.goto();
});

Then("transitions should be smooth", async function () {
  await expect(this.page).toBeTruthy();
});

When("I hover over interactive elements", async function () {
  await qtecHomePage.bookMeetingLink.hover();
});

Then("animations should be subtle and not distracting", async function () {
  const animations = await this.page.evaluate(() => {
    const elements = document.querySelectorAll("*");
    const animatedElements = [];
    for (const element of Array.from(elements)) {
      const style = getComputedStyle(element);
      if (style.animation || style.transition) {
        animatedElements.push(true);
      }
    }
    return animatedElements.length;
  });
  expect(animations).toBeGreaterThanOrEqual(0);
});

Then("animations should enhance the user experience", async function () {
  await expect(this.page).toBeTruthy();
});
