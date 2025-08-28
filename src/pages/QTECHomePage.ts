import { Page, Locator, expect } from "@playwright/test";
import { TestData } from "../utils/TestData";

export class QTECHomePage {
  readonly page: Page;

  // Navigation elements
  readonly aboutUsLink: Locator;
  readonly portfolioLink: Locator;
  readonly caseStudiesLink: Locator;
  readonly blogLink: Locator;
  readonly openSourceLink: Locator;
  readonly servicesLink: Locator;
  readonly contactUsLink: Locator;
  readonly aboutCEOLink: Locator;

  // Mobile navigation
  readonly hamburgerMenu: Locator;
  readonly mobileMenu: Locator;
  readonly mobileMenuItems: Locator;

  // Social media links
  readonly linkedinLink: Locator;
  readonly emailLink: Locator;
  readonly whatsappLink: Locator;

  // Action buttons
  readonly bookMeetingLink: Locator;
  readonly projectEstimationLink: Locator;
  readonly downloadEbookLink: Locator;

  // Project section
  readonly haveProjectSection: Locator;
  readonly mahfilProjectLink: Locator;

  // Case study tabs
  readonly webTab: Locator;
  readonly appTab: Locator;
  readonly uiuxTab: Locator;

  // Footer elements
  readonly footerAboutUsLink: Locator;
  readonly socialListLink: Locator;

  // Subscription
  readonly emailSubscriptionInput: Locator;
  readonly subscribeButton: Locator;

  // Performance and accessibility elements
  readonly pageHeader: Locator;
  readonly pageFooter: Locator;
  readonly mainContent: Locator;
  readonly logo: Locator;
  readonly allImages: Locator;
  readonly allButtons: Locator;
  readonly allLinks: Locator;
  readonly allFormFields: Locator;

  // Error and validation elements
  readonly errorMessages: Locator;
  readonly successMessages: Locator;
  readonly validationMessages: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.aboutUsLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "About Us" });
    this.portfolioLink = page.getByRole("link", { name: "Portfolio URL" });
    this.caseStudiesLink = page.getByRole("link", { name: "Case Studies" });
    this.blogLink = page.getByRole("link", { name: "Blog" });
    this.openSourceLink = page.getByRole("link", {
      name: "Open-Source Projects",
    });
    this.servicesLink = page.getByRole("link", { name: "Services" });
    this.contactUsLink = page
      .getByRole("navigation")
      .getByRole("link", { name: "Contact Us" });
    this.aboutCEOLink = page.getByRole("link", { name: "About the CEO" });

    // Mobile navigation
    this.hamburgerMenu = page
      .locator(
        '[data-testid="hamburger-menu"], .hamburger-menu, .mobile-menu-toggle'
      )
      .first();
    this.mobileMenu = page.locator(".mobile-menu, .nav-menu-mobile").first();
    this.mobileMenuItems = page.locator(".mobile-menu a, .nav-menu-mobile a");

    this.linkedinLink = page.locator(".social-link.linkedinlink").first();
    this.emailLink = page.locator(".social-link.emaillink").first();
    this.whatsappLink = page.getByRole("link", {
      name: "Whatsapp-color Let's talk at",
    });

    this.bookMeetingLink = page.getByRole("link", {
      name: "Book a 1:1 Meeting",
    });
    this.projectEstimationLink = page.getByRole("link", {
      name: "Get Instant Project Estimation",
    });
    this.downloadEbookLink = page.getByRole("link", { name: "Download Now" });

    this.haveProjectSection = page
      .locator("section")
      .filter({ hasText: "Have A Project For Us?" });
    this.mahfilProjectLink = page.getByRole("link", { name: "Mahfil Mahfil" });

    this.webTab = page.getByRole("tab", { name: "WEB" });
    this.appTab = page.getByRole("tab", { name: "APP" });
    this.uiuxTab = page.getByRole("tab", { name: "UI/UX" });

    this.footerAboutUsLink = page
      .getByRole("contentinfo")
      .getByRole("link", { name: "About Us" });
    this.socialListLink = page
      .locator("ul:nth-child(2) > li > .social-list-link")
      .first();

    this.emailSubscriptionInput = page.getByRole("textbox", { name: "E-mail" });
    this.subscribeButton = page.getByRole("button", { name: "Subscribe" });

    // Performance and accessibility elements
    this.pageHeader = page.locator('header, .header, [role="banner"]').first();
    this.pageFooter = page
      .locator('footer, .footer, [role="contentinfo"]')
      .first();
    this.mainContent = page
      .locator('main, .main-content, [role="main"]')
      .first();
    this.logo = page
      .locator('img[alt*="logo"], .logo img, [data-testid="logo"]')
      .first();
    this.allImages = page.locator("img");
    this.allButtons = page.locator('button, [role="button"], .btn, .button');
    this.allLinks = page.locator("a[href]");
    this.allFormFields = page.locator("input, textarea, select");

    // Error and validation elements
    this.errorMessages = page.locator('.error, .error-message, [role="alert"]');
    this.successMessages = page.locator(
      ".success, .success-message, .alert-success"
    );
    this.validationMessages = page.locator(
      ".validation, .validation-message, .form-error"
    );
  }

  async goto() {
    await this.page.goto(TestData.BASE_URL);
    await this.page.waitForLoadState("networkidle");
  }

  // Navigation methods
  async clickHaveProjectSection() {
    await this.haveProjectSection.click();
  }

  async navigateToAboutUs() {
    await this.aboutUsLink.click();
  }

  async clickLinkedinLink() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.linkedinLink.click();
    return await popupPromise;
  }

  async clickEmailLink() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.emailLink.click();
    return await popupPromise;
  }

  async clickPortfolioLink() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.portfolioLink.click();
    return await popupPromise;
  }

  async navigateToCaseStudies() {
    await this.caseStudiesLink.click();
  }

  async clickMahfilProject() {
    await this.mahfilProjectLink.click();
  }

  async navigateToCaseStudiesPage() {
    await this.page.goto(`${TestData.BASE_URL}${TestData.CASE_STUDIES_URL}`);
  }

  async clickWebTab() {
    await this.webTab.click();
  }

  async clickAppTab() {
    await this.appTab.click();
  }

  async clickUIUXTab() {
    await this.uiuxTab.click();
  }

  async navigateToBlog() {
    await this.blogLink.click();
  }

  async navigateToMahfilCaseStudy() {
    await this.page.goto(`${TestData.BASE_URL}${TestData.CASE_STUDY_URL}`);
  }

  async navigateToOpenSourceProjects() {
    await this.openSourceLink.click();
  }

  async clickDownloadEbook() {
    await this.downloadEbookLink.click();
  }

  async navigateToServices() {
    await this.servicesLink.click();
  }

  async navigateToLMS() {
    await this.page
      .getByRole("link", { name: "LMS Solutions Learning" })
      .click();
  }

  async navigateToLMSPage() {
    await this.page.goto(`${TestData.BASE_URL}${TestData.LMS_SERVICE_URL}`);
  }

  async navigateToSoftwareDevelopment() {
    await this.page.getByRole("link", { name: "Software Development" }).click();
  }

  async navigateToContactUs() {
    await this.contactUsLink.click();
  }

  async navigateToContactPage() {
    await this.page.goto(`${TestData.BASE_URL}${TestData.CONTACT_URL}`);
  }

  async clickBookMeeting() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.bookMeetingLink.click();
    return await popupPromise;
  }

  async clickWhatsappLink() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.whatsappLink.click();
    return await popupPromise;
  }

  async clickProjectEstimation() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.projectEstimationLink.click();
    return await popupPromise;
  }

  async clickSocialListLink() {
    const popupPromise = this.page.waitForEvent("popup");
    await this.socialListLink.click();
    return await popupPromise;
  }

  async navigateToFooterAboutUs() {
    await this.footerAboutUsLink.click();
  }

  async navigateToAboutCEO() {
    await this.aboutCEOLink.click();
  }

  async subscribeToNewsletter(email: string) {
    await this.emailSubscriptionInput.click();
    await this.emailSubscriptionInput.fill(email);
    await this.subscribeButton.click();
  }

  async handleOKDialog() {
    await this.page.getByRole("button", { name: "OK" }).click();
  }

  // Mobile navigation methods
  async openMobileMenu() {
    await this.hamburgerMenu.click();
    await this.mobileMenu.waitFor({ state: "visible" });
  }

  async closeMobileMenu() {
    if (await this.mobileMenu.isVisible()) {
      await this.page.keyboard.press("Escape");
      await this.mobileMenu.waitFor({ state: "hidden" });
    }
  }

  async clickMobileMenuItem(itemName: string) {
    await this.mobileMenuItems.filter({ hasText: itemName }).first().click();
  }

  // Responsive testing methods
  async setViewportSize(width: number, height: number) {
    await this.page.setViewportSize({ width, height });
  }

  async checkElementVisibility(selector: string) {
    const element = this.page.locator(selector);
    return await element.isVisible();
  }

  async checkElementAlignment(selector: string) {
    const element = this.page.locator(selector);
    const boundingBox = await element.boundingBox();
    return boundingBox;
  }

  // Performance testing methods
  async measurePageLoadTime() {
    const startTime = Date.now();
    await this.goto();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async checkConsoleErrors() {
    const errors: string[] = [];
    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });
    await this.goto();
    return errors;
  }

  async checkImageOptimization() {
    const images = await this.allImages.all();
    const optimizationResults = [];

    for (const img of images) {
      const src = await img.getAttribute("src");
      const alt = await img.getAttribute("alt");
      const loading = await img.getAttribute("loading");

      optimizationResults.push({
        src,
        hasAlt: !!alt,
        lazyLoading: loading === "lazy",
      });
    }

    return optimizationResults;
  }

  // Accessibility testing methods
  async checkImageAltText() {
    const images = await this.allImages.all();
    const imagesWithoutAlt = [];

    for (const img of images) {
      const alt = await img.getAttribute("alt");
      if (!alt || alt.trim() === "") {
        const src = await img.getAttribute("src");
        imagesWithoutAlt.push(src);
      }
    }

    return imagesWithoutAlt;
  }

  async checkHeadingStructure() {
    const headings = await this.page.locator("h1, h2, h3, h4, h5, h6").all();
    const headingStructure = [];

    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName.toLowerCase());
      const text = await heading.textContent();
      headingStructure.push({ tagName, text: text?.trim() });
    }

    return headingStructure;
  }

  async checkKeyboardAccessibility() {
    const interactiveElements = await this.page
      .locator("button, a, input, textarea, select")
      .all();
    const accessibilityResults = [];

    for (const element of interactiveElements) {
      const tagName = await element.evaluate((el) => el.tagName.toLowerCase());
      const isVisible = await element.isVisible();
      const hasTabIndex = await element.getAttribute("tabindex");

      accessibilityResults.push({
        tagName,
        isVisible,
        hasTabIndex: !!hasTabIndex,
      });
    }

    return accessibilityResults;
  }

  // Form validation methods
  async submitFormWithInvalidData() {
    await this.subscribeButton.click();
    await this.page.waitForTimeout(1000);
    return await this.validationMessages.isVisible();
  }

  async submitFormWithValidData(email: string) {
    await this.emailSubscriptionInput.fill(email);
    await this.subscribeButton.click();
    await this.page.waitForTimeout(1000);
    return await this.successMessages.isVisible();
  }

  // Button state testing methods
  async testButtonHoverState(buttonSelector: string) {
    const button = this.page.locator(buttonSelector);
    await button.hover();
    const computedStyle = await button.evaluate((el) => {
      const styles = (el.ownerDocument.defaultView as Window).getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
      };
    });
    return computedStyle;
  }

  async testButtonActiveState(buttonSelector: string) {
    const button = this.page.locator(buttonSelector);
    await button.click({ delay: 100 });
    const computedStyle = await button.evaluate((el) => {
      const styles = (el.ownerDocument.defaultView as Window).getComputedStyle(el);
      return {
        backgroundColor: styles.backgroundColor,
        transform: styles.transform,
      };
    });
    return computedStyle;
  }
}
