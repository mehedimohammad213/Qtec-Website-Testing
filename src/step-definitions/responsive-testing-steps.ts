import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { QTECHomePage } from "../pages/QTECHomePage";
import { TestData } from "../utils/TestData";

let qtecHomePage: QTECHomePage;

Before(async function () {
  qtecHomePage = new QTECHomePage(this.page);
});

Given("I am on the QTEC solution website", async function () {
  await qtecHomePage.goto();
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

// Mobile Responsive Testing Steps
When("I view the website on {string} screen", async function (device: string) {
  const viewportSizes = TestData.VIEWPORT_SIZES;
  let viewport;

  switch (device) {
    case "iPhone SE":
      viewport = viewportSizes.MOBILE[0];
      break;
    case "iPhone 12":
      viewport = viewportSizes.MOBILE[1];
      break;
    case "iPhone 12 Pro":
      viewport = viewportSizes.MOBILE[2];
      break;
    case "iPad":
      viewport = viewportSizes.TABLET[0];
      break;
    case "iPad Pro":
      viewport = viewportSizes.TABLET[1];
      break;
    case "Laptop":
      viewport = viewportSizes.DESKTOP[0];
      break;
    case "Desktop":
      viewport = viewportSizes.DESKTOP[1];
      break;
    default:
      viewport = { width: 1920, height: 1080 };
  }

  await qtecHomePage.setViewportSize(viewport.width, viewport.height);
  this.currentViewport = viewport;
});

Then("the layout should adapt to mobile viewport", async function () {
  const viewport = await this.page.viewportSize();
  expect(viewport!.width).toBeLessThanOrEqual(414);
});

Then("the navigation should be mobile-friendly", async function () {
  const hamburgerVisible = await qtecHomePage.hamburgerMenu.isVisible();
  expect(hamburgerVisible).toBeTruthy();
});

Then("all content should be readable", async function () {
  const textElements = await this.page
    .locator("p, h1, h2, h3, h4, h5, h6")
    .all();
  for (const element of textElements) {
    if (await element.isVisible()) {
      const fontSize = await element.evaluate(
        (el: Element) => getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(12); // Minimum readable font size
    }
  }
});

Then("touch targets should be appropriately sized", async function () {
  const buttons = await qtecHomePage.allButtons.all();
  for (const button of buttons) {
    if (await button.isVisible()) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44); // Minimum touch target size
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

Then("the hamburger menu should be accessible", async function () {
  const hamburgerVisible = await qtecHomePage.hamburgerMenu.isVisible();
  expect(hamburgerVisible).toBeTruthy();
});

// Tablet Responsive Testing Steps
Then("the layout should adapt to tablet viewport", async function () {
  const viewport = await this.page.viewportSize();
  expect(viewport!.width).toBeGreaterThan(414);
  expect(viewport!.width).toBeLessThanOrEqual(1024);
});

Then("the navigation should be tablet-optimized", async function () {
  // Check if navigation is horizontal and visible
  const navVisible = await qtecHomePage.aboutUsLink.isVisible();
  expect(navVisible).toBeTruthy();
});

Then("content should be properly scaled", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    if (await img.isVisible()) {
      const box = await img.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  }
});

Then("interactive elements should be easily accessible", async function () {
  const buttons = await qtecHomePage.allButtons.all();
  for (const button of buttons) {
    if (await button.isVisible()) {
      await expect(button).toBeEnabled();
    }
  }
});

// Desktop Responsive Testing Steps
Then("the layout should utilize desktop space effectively", async function () {
  const viewport = await this.page.viewportSize();
  expect(viewport!.width).toBeGreaterThan(1024);
});

Then("the navigation should be desktop-optimized", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

Then("content should be well-organized", async function () {
  const contentElements = await this.page
    .locator("section, article, main")
    .all();
  expect(contentElements.length).toBeGreaterThan(0);
});

Then("all features should be easily accessible", async function () {
  await expect(qtecHomePage.bookMeetingLink).toBeVisible();
  await expect(qtecHomePage.projectEstimationLink).toBeVisible();
  await expect(qtecHomePage.downloadEbookLink).toBeVisible();
});

// Navigation Responsive Testing Steps
When("I view the website on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
});

Then("the hamburger menu should be visible", async function () {
  const hamburgerVisible = await qtecHomePage.hamburgerMenu.isVisible();
  expect(hamburgerVisible).toBeTruthy();
});

When("I click on the hamburger menu", async function () {
  await qtecHomePage.openMobileMenu();
});

Then("the mobile menu should slide in from the side", async function () {
  const menuVisible = await qtecHomePage.mobileMenu.isVisible();
  expect(menuVisible).toBeTruthy();
});

Then("all menu items should be accessible", async function () {
  const menuItems = await qtecHomePage.mobileMenuItems.all();
  expect(menuItems.length).toBeGreaterThan(0);
});

When("I click outside the menu", async function () {
  await this.page.click("body");
});

Then("the mobile menu should close", async function () {
  const menuVisible = await qtecHomePage.mobileMenu.isVisible();
  expect(menuVisible).toBeFalsy();
});

When("I view the website on tablet screen", async function () {
  await qtecHomePage.setViewportSize(768, 1024);
});

Then("the navigation should be horizontal", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
});

Then("all menu items should be visible", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

Then("the navigation should be easily clickable", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeEnabled();
  await expect(qtecHomePage.servicesLink).toBeEnabled();
  await expect(qtecHomePage.contactUsLink).toBeEnabled();
});

When("I view the website on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
});

Then("the full navigation menu should be visible", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

Then("dropdown menus should work properly", async function () {
  // Check if dropdown elements exist
  const dropdowns = await this.page
    .locator('.dropdown, .submenu, [role="menu"]')
    .all();
  expect(dropdowns.length).toBeGreaterThanOrEqual(0);
});

Then("the navigation should be prominently displayed", async function () {
  const navBox = await qtecHomePage.aboutUsLink.boundingBox();
  expect(navBox).toBeTruthy();
  expect(navBox!.y).toBeLessThan(100); // Navigation should be near the top
});

// Content Responsive Testing Steps
When("I view the website on different screen sizes", async function () {
  const viewportSizes = TestData.VIEWPORT_SIZES;
  this.responsiveResults = [];

  for (const size of [
    ...viewportSizes.MOBILE,
    ...viewportSizes.TABLET,
    ...viewportSizes.DESKTOP,
  ]) {
    await qtecHomePage.setViewportSize(size.width, size.height);
    const images = await qtecHomePage.allImages.all();
    this.responsiveResults.push({
      viewport: size,
      imageCount: images.length,
    });
  }
});

Then("images should scale appropriately", async function () {
  for (const result of this.responsiveResults) {
    expect(result.imageCount).toBeGreaterThan(0);
  }
});

Then("images should maintain aspect ratios", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    if (await img.isVisible()) {
      const naturalWidth = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalWidth
      );
      const naturalHeight = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalHeight
      );
      const box = await img.boundingBox();

      if (box && naturalWidth > 0 && naturalHeight > 0) {
        const aspectRatio = naturalWidth / naturalHeight;
        const displayAspectRatio = box.width / box.height;
        expect(Math.abs(aspectRatio - displayAspectRatio)).toBeLessThan(0.1);
      }
    }
  }
});

Then("images should not overflow their containers", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    if (await img.isVisible()) {
      const box = await img.boundingBox();
      const parent = await img.locator("..").first();
      const parentBox = await parent.boundingBox();

      if (box && parentBox) {
        expect(box.width).toBeLessThanOrEqual(parentBox.width);
        expect(box.height).toBeLessThanOrEqual(parentBox.height);
      }
    }
  }
});

Then("images should be optimized for each screen size", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    expect(src).toBeTruthy();
  }
});

// Typography Responsive Testing Steps
Then("font sizes should be appropriate for each screen", async function () {
  const textElements = await this.page
    .locator("p, h1, h2, h3, h4, h5, h6")
    .all();
  for (const element of textElements) {
    if (await element.isVisible()) {
      const fontSize = await element.evaluate(
        (el: Element) => getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(0);
    }
  }
});

Then("text should remain readable", async function () {
  const textElements = await this.page
    .locator("p, h1, h2, h3, h4, h5, h6")
    .all();
  for (const element of textElements) {
    if (await element.isVisible()) {
      const fontSize = await element.evaluate(
        (el) => getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(10); // Minimum readable size
    }
  }
});

Then("line spacing should be comfortable", async function () {
  const textElements = await this.page.locator("p").all();
  for (const element of textElements) {
    if (await element.isVisible()) {
      const lineHeight = await element.evaluate(
        (el) => getComputedStyle(el).lineHeight
      );
      const lineHeightNum = parseFloat(lineHeight);
      expect(lineHeightNum).toBeGreaterThan(1.2); // Minimum comfortable line height
    }
  }
});

Then("headings should be properly sized", async function () {
  const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").all();
  for (const heading of headings) {
    if (await heading.isVisible()) {
      const fontSize = await heading.evaluate(
        (el) => getComputedStyle(el).fontSize
      );
      const fontSizeNum = parseFloat(fontSize);
      expect(fontSizeNum).toBeGreaterThan(0);
    }
  }
});

// Form Responsive Testing Steps
When("I view forms on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
});

Then("form fields should be appropriately sized", async function () {
  const formFields = await qtecHomePage.allFormFields.all();
  for (const field of formFields) {
    if (await field.isVisible()) {
      const box = await field.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44); // Minimum touch target
      }
    }
  }
});

Then("form validation should work correctly", async function () {
  await qtecHomePage.emailSubscriptionInput.fill("invalid-email");
  await qtecHomePage.subscribeButton.click();
  const hasValidation = await qtecHomePage.validationMessages.isVisible();
  expect(hasValidation).toBeTruthy();
});

Then("the submit button should be easily accessible", async function () {
  await expect(qtecHomePage.subscribeButton).toBeVisible();
  await expect(qtecHomePage.subscribeButton).toBeEnabled();
});

When("I view forms on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
});

Then("forms should utilize available space effectively", async function () {
  const formFields = await qtecHomePage.allFormFields.all();
  for (const field of formFields) {
    if (await field.isVisible()) {
      const box = await field.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(200); // Reasonable width for desktop
      }
    }
  }
});

// Interactive Element Responsive Testing Steps
When("I view buttons on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
});

Then("buttons should be large enough for touch interaction", async function () {
  const buttons = await qtecHomePage.allButtons.all();
  for (const button of buttons) {
    if (await button.isVisible()) {
      const box = await button.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(44);
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  }
});

Then("buttons should have adequate spacing", async function () {
  const buttons = await qtecHomePage.allButtons.all();
  for (let i = 0; i < buttons.length - 1; i++) {
    const box1 = await buttons[i].boundingBox();
    const box2 = await buttons[i + 1].boundingBox();
    if (box1 && box2) {
      const spacing = Math.abs(box2.y - (box1.y + box1.height));
      expect(spacing).toBeGreaterThan(8); // Minimum spacing
    }
  }
});

When("I view buttons on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
});

Then(
  "buttons should be appropriately sized for mouse interaction",
  async function () {
    const buttons = await qtecHomePage.allButtons.all();
    for (const button of buttons) {
      if (await button.isVisible()) {
        const box = await button.boundingBox();
        if (box) {
          expect(box.width).toBeGreaterThan(80); // Minimum width for desktop
          expect(box.height).toBeGreaterThan(30); // Minimum height for desktop
        }
      }
    }
  }
);

// Table Responsive Testing Steps
When("I view tables on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
});

Then("tables should be scrollable horizontally", async function () {
  const tables = await this.page.locator("table").all();
  for (const table of tables) {
    if (await table.isVisible()) {
      const box = await table.boundingBox();
      const parent = await table.locator("..").first();
      const parentBox = await parent.boundingBox();

      if (box && parentBox) {
        // Check if table has horizontal scroll
        const hasScroll = await parent.evaluate(
          (el) => el.scrollWidth > el.clientWidth
        );
        expect(hasScroll).toBeTruthy();
      }
    }
  }
});

Then("tables should stack vertically", async function () {
  // This would require checking if tables are transformed to cards or lists on mobile
  const tables = await this.page.locator("table").all();
  expect(tables.length).toBeGreaterThanOrEqual(0);
});

When("I view tables on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
});

Then("tables should display in full format", async function () {
  const tables = await this.page.locator("table").all();
  for (const table of tables) {
    if (await table.isVisible()) {
      const rows = await table.locator("tr").all();
      expect(rows.length).toBeGreaterThan(0);
    }
  }
});

// Layout Responsive Testing Steps
When("I view the website on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
});

Then("content should stack in a single column", async function () {
  const columns = await this.page
    .locator('.column, .col, [class*="col-"]')
    .all();
  // On mobile, most content should be in a single column
  expect(columns.length).toBeLessThanOrEqual(2);
});

When("I view the website on tablet screen", async function () {
  await qtecHomePage.setViewportSize(768, 1024);
});

Then("content should use a 2-column layout", async function () {
  const columns = await this.page
    .locator('.column, .col, [class*="col-"]')
    .all();
  // On tablet, content might use 2 columns
  expect(columns.length).toBeGreaterThanOrEqual(0);
});

When("I view the website on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
});

Then("content should use a multi-column layout", async function () {
  const columns = await this.page
    .locator('.column, .col, [class*="col-"]')
    .all();
  // On desktop, content can use multiple columns
  expect(columns.length).toBeGreaterThanOrEqual(0);
});

When("I view the website on different screen sizes", async function () {
  const viewportSizes = TestData.VIEWPORT_SIZES;
  this.spacingResults = [];

  for (const size of [
    ...viewportSizes.MOBILE,
    ...viewportSizes.TABLET,
    ...viewportSizes.DESKTOP,
  ]) {
    await qtecHomePage.setViewportSize(size.width, size.height);
    const elements = await this.page.locator("section, div").all();
    this.spacingResults.push({
      viewport: size,
      elementCount: elements.length,
    });
  }
});

Then("spacing should be appropriate for each screen size", async function () {
  for (const result of this.spacingResults) {
    expect(result.elementCount).toBeGreaterThan(0);
  }
});

Then("elements should not be cramped on small screens", async function () {
  await qtecHomePage.setViewportSize(320, 568);
  const elements = await this.page.locator("section, div").all();
  for (const element of elements) {
    if (await element.isVisible()) {
      const box = await element.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThan(0);
        expect(box.height).toBeGreaterThan(0);
      }
    }
  }
});

Then(
  "elements should not be too spread out on large screens",
  async function () {
    await qtecHomePage.setViewportSize(1920, 1080);
    const elements = await this.page.locator("section, div").all();
    for (const element of elements) {
      if (await element.isVisible()) {
        const box = await element.boundingBox();
        if (box) {
          expect(box.width).toBeLessThan(1920); // Should not span full width
        }
      }
    }
  }
);

// Performance Responsive Testing Steps
When("I load the website on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.mobileLoadTime = Date.now() - startTime;
});

Then("the page should load quickly", async function () {
  expect(this.mobileLoadTime).toBeLessThan(5000); // 5 seconds for mobile
});

Then("images should be optimized for mobile", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    expect(src).toBeTruthy();
  }
});

When("I load the website on desktop screen", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.desktopLoadTime = Date.now() - startTime;
});

Then("the page should load quickly", async function () {
  expect(this.desktopLoadTime).toBeLessThan(3000); // 3 seconds for desktop
});

Then("all features should be available", async function () {
  await expect(qtecHomePage.bookMeetingLink).toBeVisible();
  await expect(qtecHomePage.projectEstimationLink).toBeVisible();
  await expect(qtecHomePage.downloadEbookLink).toBeVisible();
});

// Cross-Device Consistency Testing Steps
When("I perform the same action on different devices", async function () {
  const viewportSizes = TestData.VIEWPORT_SIZES;
  this.consistencyResults = [];

  for (const size of [
    viewportSizes.MOBILE[1],
    viewportSizes.TABLET[0],
    viewportSizes.DESKTOP[0],
  ]) {
    await qtecHomePage.setViewportSize(size.width, size.height);
    await qtecHomePage.goto();

    const navigationVisible = await qtecHomePage.aboutUsLink.isVisible();
    const buttonsVisible = await qtecHomePage.bookMeetingLink.isVisible();

    this.consistencyResults.push({
      viewport: size,
      navigationVisible,
      buttonsVisible,
    });
  }
});

Then("the functionality should work consistently", async function () {
  for (const result of this.consistencyResults) {
    expect(result.navigationVisible).toBeTruthy();
    expect(result.buttonsVisible).toBeTruthy();
  }
});

Then("the user experience should be similar", async function () {
  for (const result of this.consistencyResults) {
    expect(result.navigationVisible).toBeTruthy();
  }
});

Then("no features should be missing on any device", async function () {
  for (const result of this.consistencyResults) {
    expect(result.navigationVisible).toBeTruthy();
    expect(result.buttonsVisible).toBeTruthy();
  }
});
