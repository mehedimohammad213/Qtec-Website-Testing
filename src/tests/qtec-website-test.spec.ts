import { test, expect } from "@playwright/test";
import { QTECHomePage } from "../pages/QTECHomePage";
import { ContactFormPage } from "../pages/ContactFormPage";
import { OpenSourceFormPage } from "../pages/OpenSourceFormPage";
import { TestData } from "../utils/TestData";

test.describe("QTEC Solution Website Test Suite", () => {
  let homePage: QTECHomePage;
  let contactFormPage: ContactFormPage;
  let openSourceFormPage: OpenSourceFormPage;

  test.beforeEach(async ({ page }) => {
    homePage = new QTECHomePage(page);
    contactFormPage = new ContactFormPage(page);
    openSourceFormPage = new OpenSourceFormPage(page);
  });

  test("Complete QTEC website navigation and form submission test", async ({
    page,
  }) => {
    // Navigate to home page
    await homePage.goto();

    // Click on project section
    await homePage.clickHaveProjectSection();

    // Navigate to About Us
    await homePage.navigateToAboutUs();

    // Click social media links (opens popups)
    const linkedinPopup = await homePage.clickLinkedinLink();
    const emailPopup = await homePage.clickEmailLink();
    const portfolioPopup = await homePage.clickPortfolioLink();

    // Navigate to Case Studies
    await homePage.navigateToCaseStudies();
    await homePage.clickMahfilProject();

    // Navigate to Case Studies page and test tabs
    await homePage.navigateToCaseStudiesPage();
    await homePage.clickWebTab();
    await homePage.clickAppTab();
    await homePage.clickUIUXTab();
    await homePage.clickMahfilProject();

    // Navigate to Blog
    await homePage.navigateToBlog();

    // Navigate to Mahfil case study
    await homePage.navigateToMahfilCaseStudy();

    // Navigate to Open Source Projects
    await homePage.navigateToOpenSourceProjects();

    // Fill and submit open source form
    await openSourceFormPage.clickDetailButton();
    await openSourceFormPage.fillOpenSourceForm(
      TestData.TEST_USER_NAME,
      TestData.TEST_USER_EMAIL,
      TestData.TEST_USER_PHONE
    );
    await openSourceFormPage.handleRecaptcha();
    await openSourceFormPage.submitForm();

    // Navigate to Open Source Projects page
    await page.goto(`${TestData.BASE_URL}${TestData.OPEN_SOURCE_URL}`);

    // Download E-book
    await homePage.clickDownloadEbook();

    // Navigate to Services
    await homePage.navigateToServices();
    await homePage.navigateToLMS();

    // Navigate to LMS page
    await homePage.navigateToLMSPage();

    // Navigate to Software Development
    await homePage.navigateToSoftwareDevelopment();

    // Navigate to Contact Us
    await homePage.navigateToContactUs();

    // Navigate to Contact page
    await homePage.navigateToContactPage();

    // Fill and submit contact form
    await contactFormPage.fillContactForm(
      TestData.TEST_USER_NAME,
      TestData.TEST_USER_EMAIL,
      TestData.TEST_USER_PHONE,
      TestData.TEST_MESSAGE
    );
    await contactFormPage.handleRecaptcha();
    await contactFormPage.submitForm();

    // Navigate back to contact page and handle dialog
    await homePage.navigateToContactPage();
    await homePage.handleOKDialog();

    // Click various action buttons (opens popups)
    const meetingPopup = await homePage.clickBookMeeting();
    const whatsappPopup = await homePage.clickWhatsappLink();
    const estimationPopup = await homePage.clickProjectEstimation();
    const socialPopup = await homePage.clickSocialListLink();

    // Navigate to footer About Us
    await homePage.navigateToFooterAboutUs();

    // Navigate to About CEO
    await homePage.navigateToAboutCEO();

    // Subscribe to newsletter
    await homePage.subscribeToNewsletter(TestData.TEST_USER_EMAIL);
    await homePage.handleOKDialog();

    // Verify we're on the About CEO page
    await expect(page).toHaveURL(/.*about-ceo/);
  });

  test("Test individual navigation flows", async ({ page }) => {
    await homePage.goto();

    // Test About Us navigation
    await homePage.navigateToAboutUs();
    await expect(page).toHaveURL(/.*about-us/);

    // Test Case Studies navigation
    await homePage.navigateToCaseStudiesPage();
    await expect(page).toHaveURL(/.*case-studies/);

    // Test Contact Us navigation
    await homePage.navigateToContactPage();
    await expect(page).toHaveURL(/.*contact-us/);
  });

  test("Test form submissions with different data", async ({ page }) => {
    await homePage.navigateToContactPage();

    // Test contact form with different data
    await contactFormPage.fillContactForm(
      "Test User",
      "test@example.com",
      "1234567890",
      "Test message from automation"
    );

    // Note: reCAPTCHA handling is commented out for demo purposes
    // await contactFormPage.handleRecaptcha();
    // await contactFormPage.submitForm();
  });
});
