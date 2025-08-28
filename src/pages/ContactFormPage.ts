import { Page, Locator, FrameLocator } from "@playwright/test";

export class ContactFormPage {
  readonly page: Page;

  // Form fields
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly messageInput: Locator;

  // Buttons
  readonly submitButton: Locator;
  readonly sendButton: Locator;

  // reCAPTCHA iframes
  readonly recaptchaCheckboxFrame: FrameLocator;
  readonly recaptchaChallengeFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;

    // Initialize form locators
    this.nameInput = page.getByRole("textbox", { name: "Enter Full Name" });
    this.phoneInput = page.getByRole("textbox", { name: "Enter Phone Number" });
    this.emailInput = page.getByRole("textbox", {
      name: "Enter Email Address",
    });
    this.messageInput = page.getByRole("textbox", {
      name: "Enter Your Message",
    });

    this.submitButton = page.getByRole("button", { name: "Submit" });
    this.sendButton = page.getByRole("button", { name: "Send" });

    // Initialize reCAPTCHA iframe locators
    this.recaptchaCheckboxFrame = page.frameLocator(
      'iframe[name="a-bdq2usjiqq4m"]'
    );
    this.recaptchaChallengeFrame = page.frameLocator(
      'iframe[name="c-bdq2usjiqq4m"]'
    );
  }

  async fillContactForm(
    name: string,
    email: string,
    phone: string,
    message: string
  ) {
    await this.nameInput.click();
    await this.nameInput.fill(name);

    await this.phoneInput.click();
    await this.phoneInput.fill(phone);

    await this.emailInput.click();
    await this.emailInput.fill(email);

    await this.messageInput.click();
    await this.messageInput.fill(message);
  }

  async handleRecaptcha() {
    // Click the reCAPTCHA checkbox
    await this.recaptchaCheckboxFrame
      .getByRole("checkbox", { name: "I'm not a robot" })
      .click();

    // Handle the challenge if it appears
    try {
      // Wait for challenge to appear and solve it
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
      .locator("tr:nth-child(3) > td:nth-child(2)")
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .getByRole("button", { name: "Verify" })
      .click();

    // Additional clicks if needed
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .locator(".rc-imageselect-tile")
      .first()
      .click();
    await this.recaptchaChallengeFrame
      .locator("tr:nth-child(2) > td:nth-child(3)")
      .click();
    await this.recaptchaChallengeFrame
      .getByRole("button", { name: "Verify" })
      .click();
  }

  async submitForm() {
    await this.sendButton.click();
  }

  async handleOKDialog() {
    await this.page.getByRole("button", { name: "OK" }).click();
  }
}
