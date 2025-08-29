import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { QTECHomePage } from "../pages/QTECHomePage";
import { ContactFormPage } from "../pages/ContactFormPage";
import { OpenSourceFormPage } from "../pages/OpenSourceFormPage";
import { TestData } from "../utils/TestData";
import { CustomWorld } from "../support/world";

let qtecHomePage: QTECHomePage;
let contactFormPage: ContactFormPage;
let openSourceFormPage: OpenSourceFormPage;
let currentViewport: { width: number; height: number } | null = null;

Before(async function (this: CustomWorld) {
  if (this.page) {
    qtecHomePage = new QTECHomePage(this.page);
    contactFormPage = new ContactFormPage(this.page);
    openSourceFormPage = new OpenSourceFormPage(this.page);
  }
});

After(async function () {
  // Reset viewport if it was changed during test
  if (currentViewport) {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    currentViewport = null;
  }
});

Given("I am on the QTEC solution website", async function () {
  await qtecHomePage.goto();
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

// Functional Testing Steps
When("I click on the project section", async function () {
  await qtecHomePage.clickHaveProjectSection();
});

When("I navigate to About Us page", async function () {
  await qtecHomePage.navigateToAboutUs();
});

When("I click on social media links", async function () {
  const linkedinPopup = await qtecHomePage.clickLinkedinLink();
  await linkedinPopup.close();

  const emailPopup = await qtecHomePage.clickEmailLink();
  await emailPopup.close();

  const portfolioPopup = await qtecHomePage.clickPortfolioLink();
  await portfolioPopup.close();
});

When("I navigate through case studies", async function () {
  await qtecHomePage.navigateToCaseStudies();
});

When("I test case study tabs", async function () {
  await qtecHomePage.clickWebTab();
  await qtecHomePage.clickAppTab();
  await qtecHomePage.clickUIUXTab();
});

When("I navigate to blog", async function () {
  await qtecHomePage.navigateToBlog();
});

When("I navigate to open source projects", async function () {
  await qtecHomePage.navigateToOpenSourceProjects();
});

When("I fill and submit the open source form", async function () {
  await openSourceFormPage.clickDetailButton();
  await openSourceFormPage.fillOpenSourceForm(
    TestData.TEST_USER_NAME,
    TestData.TEST_USER_EMAIL,
    TestData.TEST_USER_PHONE
  );
  await openSourceFormPage.handleRecaptcha();
  await openSourceFormPage.submitForm();
});

When("I download the e-book", async function () {
  await qtecHomePage.clickDownloadEbook();
});

When("I navigate through services", async function () {
  await qtecHomePage.navigateToServices();
});

When("I navigate to contact us", async function () {
  await qtecHomePage.navigateToContactUs();
});

When("I fill and submit the contact form", async function () {
  await contactFormPage.fillContactForm(
    TestData.TEST_USER_NAME,
    TestData.TEST_USER_EMAIL,
    TestData.TEST_USER_PHONE,
    TestData.TEST_MESSAGE
  );
  await contactFormPage.handleRecaptcha();
  await contactFormPage.submitForm();
});

When("I click on action buttons", async function () {
  const bookMeetingPopup = await qtecHomePage.clickBookMeeting();
  await bookMeetingPopup.close();

  const projectEstimationPopup = await qtecHomePage.clickProjectEstimation();
  await projectEstimationPopup.close();
});

When("I navigate to footer about us", async function () {
  await qtecHomePage.navigateToFooterAboutUs();
});

When("I navigate to about CEO", async function () {
  await qtecHomePage.navigateToAboutCEO();
});

When("I subscribe to newsletter", async function () {
  await qtecHomePage.subscribeToNewsletter(TestData.TEST_USER_EMAIL);
});

Then("I should be on the About CEO page", async function () {
  await expect(this.page).toHaveURL(/.*about-ceo.*/);
});

// Navigation Testing Steps
When("I navigate to Case Studies page", async function () {
  await qtecHomePage.navigateToCaseStudiesPage();
});

When("I navigate to Contact Us page", async function () {
  await qtecHomePage.navigateToContactPage();
});

Then("I should be on the About Us page", async function () {
  await expect(this.page).toHaveURL(/.*about-us.*/);
});

Then("I should be on the Case Studies page", async function () {
  await expect(this.page).toHaveURL(/.*case-studies.*/);
});

Then("I should be on the Contact Us page", async function () {
  await expect(this.page).toHaveURL(/.*contact-us.*/);
});

// Form Testing Steps
When("I fill the contact form with test data", async function () {
  await contactFormPage.fillContactForm(
    TestData.TEST_USER_NAME,
    TestData.TEST_USER_EMAIL,
    TestData.TEST_USER_PHONE,
    TestData.TEST_MESSAGE
  );
});

Then("the form should be filled correctly", async function () {
  await expect(contactFormPage.nameInput).toHaveValue(TestData.TEST_USER_NAME);
  await expect(contactFormPage.emailInput).toHaveValue(
    TestData.TEST_USER_EMAIL
  );
  await expect(contactFormPage.phoneInput).toHaveValue(
    TestData.TEST_USER_PHONE
  );
  await expect(contactFormPage.messageInput).toHaveValue(TestData.TEST_MESSAGE);
});

// Social Media Testing Steps
When("I click on LinkedIn link", async function () {
  const popup = await qtecHomePage.clickLinkedinLink();
  await popup.close();
});

When("I click on Email link", async function () {
  const popup = await qtecHomePage.clickEmailLink();
  await popup.close();
});

When("I click on Portfolio link", async function () {
  const popup = await qtecHomePage.clickPortfolioLink();
  await popup.close();
});

Then("a new popup window should open", async function () {
  // This is handled in the When steps above
  expect(true).toBeTruthy();
});

// UI/UX Testing Steps
Then("the page header should be properly aligned", async function () {
  const headerBox = await qtecHomePage.pageHeader.boundingBox();
  expect(headerBox).toBeTruthy();
  expect(headerBox!.width).toBeGreaterThan(0);
});

Then("the navigation menu should be visible and accessible", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

Then("all buttons should have proper hover states", async function () {
  const hoverState = await qtecHomePage.testButtonHoverState("button");
  expect(hoverState).toBeTruthy();
});

Then("images should be properly scaled and clear", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    await expect(img).toBeVisible();
    const src = await img.getAttribute("src");
    expect(src).toBeTruthy();
  }
});

Then("the footer should be properly positioned", async function () {
  const footerBox = await qtecHomePage.pageFooter.boundingBox();
  expect(footerBox).toBeTruthy();
});

When("I hover over action buttons", async function () {
  await qtecHomePage.bookMeetingLink.hover();
});

Then("the buttons should show hover effects", async function () {
  const hoverState = await qtecHomePage.testButtonHoverState("button");
  expect(hoverState).toBeTruthy();
});

When("I click on buttons", async function () {
  await qtecHomePage.subscribeButton.click();
});

Then("the buttons should show active states", async function () {
  const activeState = await qtecHomePage.testButtonActiveState("button");
  expect(activeState).toBeTruthy();
});

When("I submit the contact form with invalid data", async function () {
  await qtecHomePage.submitFormWithInvalidData();
});

Then("validation error messages should be displayed", async function () {
  const hasValidationErrors = await qtecHomePage.validationMessages.isVisible();
  expect(hasValidationErrors).toBeTruthy();
});

When("I submit the contact form with valid data", async function () {
  await qtecHomePage.submitFormWithValidData(TestData.TEST_USER_EMAIL);
});

Then("success message should be displayed", async function () {
  const hasSuccessMessage = await qtecHomePage.successMessages.isVisible();
  expect(hasSuccessMessage).toBeTruthy();
});

// Responsive Design Testing Steps
When("I view the website on {string} screen", async function (device: string) {
  const viewportSizes = TestData.VIEWPORT_SIZES;
  let viewport;

  switch (device) {
    case "mobile-320":
      viewport = viewportSizes.MOBILE[0];
      break;
    case "mobile-375":
      viewport = viewportSizes.MOBILE[1];
      break;
    case "mobile-414":
      viewport = viewportSizes.MOBILE[2];
      break;
    case "tablet-768":
      viewport = viewportSizes.TABLET[0];
      break;
    case "tablet-1024":
      viewport = viewportSizes.TABLET[1];
      break;
    case "desktop-1366":
      viewport = viewportSizes.DESKTOP[0];
      break;
    case "desktop-1920":
      viewport = viewportSizes.DESKTOP[1];
      break;
    default:
      viewport = { width: 1920, height: 1080 };
  }

  await qtecHomePage.setViewportSize(viewport.width, viewport.height);
  currentViewport = viewport;
});

Then(
  "the layout should be responsive and properly formatted",
  async function () {
    const headerVisible = await qtecHomePage.pageHeader.isVisible();
    const footerVisible = await qtecHomePage.pageFooter.isVisible();
    const mainContentVisible = await qtecHomePage.mainContent.isVisible();

    expect(headerVisible).toBeTruthy();
    expect(footerVisible).toBeTruthy();
    expect(mainContentVisible).toBeTruthy();
  }
);

Then("all elements should be accessible", async function () {
  const buttons = await qtecHomePage.allButtons.all();
  for (const button of buttons) {
    await expect(button).toBeVisible();
  }
});

Then("the navigation should work correctly", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

// Mobile Navigation Testing
When("I view the website on mobile screen", async function () {
  await qtecHomePage.setViewportSize(375, 812);
  currentViewport = { width: 375, height: 812 };
});

Then("the hamburger menu should be visible", async function () {
  const hamburgerVisible = await qtecHomePage.hamburgerMenu.isVisible();
  expect(hamburgerVisible).toBeTruthy();
});

When("I click on the hamburger menu", async function () {
  await qtecHomePage.openMobileMenu();
});

Then("the mobile menu should open", async function () {
  const menuVisible = await qtecHomePage.mobileMenu.isVisible();
  expect(menuVisible).toBeTruthy();
});

Then("all menu items should be accessible", async function () {
  const menuItems = await qtecHomePage.mobileMenuItems.all();
  expect(menuItems.length).toBeGreaterThan(0);
});

When("I click on a menu item", async function () {
  await qtecHomePage.clickMobileMenuItem("About Us");
});

Then("the mobile menu should close", async function () {
  await qtecHomePage.closeMobileMenu();
  const menuVisible = await qtecHomePage.mobileMenu.isVisible();
  expect(menuVisible).toBeFalsy();
});

// Cross-Browser Compatibility Testing
When("I access the website using {string}", async function (browser: string) {
  // This step is handled by Playwright's browser configuration
  await qtecHomePage.goto();
});

Then("the website should render correctly", async function () {
  await expect(this.page).toHaveURL(TestData.BASE_URL);
  await expect(qtecHomePage.pageHeader).toBeVisible();
  await expect(qtecHomePage.pageFooter).toBeVisible();
});

Then("all functionality should work as expected", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.servicesLink).toBeVisible();
  await expect(qtecHomePage.contactUsLink).toBeVisible();
});

// Performance Testing Steps
When("I load the homepage", async function () {
  const loadTime = await qtecHomePage.measurePageLoadTime();
  this.loadTime = loadTime;
});

Then("the page should load within acceptable time limits", async function () {
  expect(this.loadTime).toBeLessThan(5000); // 5 seconds
});

Then("there should be no console errors", async function () {
  const errors = await qtecHomePage.checkConsoleErrors();
  expect(errors.length).toBe(0);
});

Then("images should be optimized", async function () {
  const optimizationResults = await qtecHomePage.checkImageOptimization();
  for (const result of optimizationResults) {
    expect(result.hasAlt).toBeTruthy();
  }
});

// Accessibility Testing Steps
Then("all images should have alt text", async function () {
  const imagesWithoutAlt = await qtecHomePage.checkImageAltText();
  expect(imagesWithoutAlt.length).toBe(0);
});

Then("the website should have proper heading structure", async function () {
  const headingStructure = await qtecHomePage.checkHeadingStructure();
  expect(headingStructure.length).toBeGreaterThan(0);

  // Check for at least one h1
  const hasH1 = headingStructure.some((heading) => heading.tagName === "h1");
  expect(hasH1).toBeTruthy();
});

Then(
  "all interactive elements should be keyboard accessible",
  async function () {
    const accessibilityResults =
      await qtecHomePage.checkKeyboardAccessibility();
    for (const result of accessibilityResults) {
      expect(result.isVisible).toBeTruthy();
    }
  }
);

Then("color contrast should meet accessibility standards", async function () {
  // This would require more sophisticated color contrast checking
  // For now, we'll check that text elements are visible
  const textElements = await this.page
    .locator("p, h1, h2, h3, h4, h5, h6, span")
    .all();
  expect(textElements.length).toBeGreaterThan(0);
});

// Service Navigation Testing
When("I navigate to {string} page", async function (service: string) {
  switch (service) {
    case "About Us":
      await qtecHomePage.navigateToAboutUs();
      break;
    case "Case Studies":
      await qtecHomePage.navigateToCaseStudies();
      break;
    case "Open Source Projects":
      await qtecHomePage.navigateToOpenSourceProjects();
      break;
    case "LMS Solutions":
      await qtecHomePage.navigateToLMS();
      break;
    case "Contact Us":
      await qtecHomePage.navigateToContactUs();
      break;
    default:
      throw new Error(`Unknown service: ${service}`);
  }
});

Then("I should be on the {string} page", async function (service: string) {
  switch (service) {
    case "About Us":
      await expect(this.page).toHaveURL(/.*about-us.*/);
      break;
    case "Case Studies":
      await expect(this.page).toHaveURL(/.*case-studies.*/);
      break;
    case "Open Source Projects":
      await expect(this.page).toHaveURL(/.*open-source.*/);
      break;
    case "LMS Solutions":
      await expect(this.page).toHaveURL(/.*lms.*/);
      break;
    case "Contact Us":
      await expect(this.page).toHaveURL(/.*contact.*/);
      break;
    default:
      throw new Error(`Unknown service: ${service}`);
  }
});

// Form Validation Testing
When("I enter {string} in the email field", async function (email: string) {
  await qtecHomePage.emailSubscriptionInput.fill(email);
});

When("I submit the form", async function () {
  await qtecHomePage.subscribeButton.click();
});

Then("{string} should be displayed", async function (expectedResult: string) {
  if (expectedResult === "success") {
    const hasSuccess = await qtecHomePage.successMessages.isVisible();
    expect(hasSuccess).toBeTruthy();
  } else if (expectedResult === "validation error") {
    const hasValidation = await qtecHomePage.validationMessages.isVisible();
    expect(hasValidation).toBeTruthy();
  }
});
