import { Page, Locator, FrameLocator } from "@playwright/test";

export class OpenSourceFormPage {
  readonly page: Page;

  // Form fields
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;

  // Buttons
  readonly submitButton: Locator;
  readonly detailButton: Locator;

  // reCAPTCHA iframes
  readonly recaptchaCheckboxFrame: FrameLocator;
  readonly recaptchaChallengeFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;

    // Initialize form locators
    this.nameInput = page.getByRole("textbox", {
      name: "Name* Name* Name* Name* Name",
    });
    this.phoneInput = page.getByRole("textbox", {
      name: "Phone Phone Phone Phone Phone",
    });
    this.emailInput = page.getByRole("textbox", {
      name: "Email* Email* Email* Email*",
    });

    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.detailButton = page.locator(".btn-detail").first();

    // Initialize reCAPTCHA iframe locators
    this.recaptchaCheckboxFrame = page.frameLocator(
      'iframe[name="a-7yo7b9zew5jr"]'
    );
    this.recaptchaChallengeFrame = page.frameLocator(
      'iframe[name="c-7yo7b9zew5jr"]'
    );
  }

  async clickDetailButton() {
    await this.detailButton.click();
  }

  async fillOpenSourceForm(name: string, email: string, phone: string) {
    await this.nameInput.fill(name);

    await this.phoneInput.click();
    await this.phoneInput.fill(phone);

    await this.emailInput.click();
    await this.emailInput.fill(email);
  }

  async handleRecaptcha() {
    // Click the reCAPTCHA checkbox
    await this.recaptchaCheckboxFrame
      .getByRole("checkbox", { name: "I'm not a robot" })
      .click();

    // Handle the challenge if it appears
    try {
      await this.solveRecaptchaChallenge();
    } catch (error) {
      console.log("No reCAPTCHA challenge appeared or already solved");
    }
  }

  private async solveRecaptchaChallenge() {
    // Click various cells in the challenge grid
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td:nth-child(2)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td")
      .first()
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td")
      .first()
      .click();
    await this.recaptchaChallengeFrame
      .getByRole("button", { name: "Next" })
      .click();

    // Additional clicks for verification
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td:nth-child(4)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(4)")
      .click();
    await this.recaptchaChallengeFrame
      .getByRole("button", { name: "Verify" })
      .click();

    // Final verification clicks
    await this.recaptchaChallengeFrame
      .locator("td:nth-child(3)")
      .first()
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td:nth-child(2)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td")
      .first()
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(3) > td:nth-child(2)")
      .click();
    await this.recaptchaChallengeFrame
      .getByRole("button", { name: "Verify" })
      .click();
  }

  async submitForm() {
    await this.submitButton.click();
  }
}
