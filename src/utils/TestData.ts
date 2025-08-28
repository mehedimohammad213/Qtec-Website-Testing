import dotenv from "dotenv";

// Load environment variables (optional)
try {
  dotenv.config();
} catch (error) {
  console.log("No .env file found, using default values");
}

export class TestData {
  static get BASE_URL(): string {
    return process.env.BASE_URL || "https://staging.qtecsolution.com";
  }

  static get TEST_USER_NAME(): string {
    return process.env.TEST_USER_NAME || "Test User";
  }

  static get TEST_USER_EMAIL(): string {
    return process.env.TEST_USER_EMAIL || "test@example.com";
  }

  static get TEST_USER_PHONE(): string {
    return process.env.TEST_USER_PHONE || "+1234567890";
  }

  static get TEST_MESSAGE(): string {
    return process.env.TEST_MESSAGE || "This is a test message for automated testing";
  }

  static get PROJECT_NAME(): string {
    return process.env.PROJECT_NAME || "Test Project";
  }

  static get CASE_STUDY_URL(): string {
    return process.env.CASE_STUDY_URL || "/case-study/mahfil";
  }

  static get CASE_STUDIES_URL(): string {
    return process.env.CASE_STUDIES_URL || "/case-studies";
  }

  static get OPEN_SOURCE_URL(): string {
    return process.env.OPEN_SOURCE_URL || "/open-source-projects";
  }

  static get LMS_SERVICE_URL(): string {
    return process.env.LMS_SERVICE_URL || "/service/lms-solutions";
  }

  static get CONTACT_URL(): string {
    return process.env.CONTACT_URL || "/contact-us";
  }

  static get ABOUT_URL(): string {
    return process.env.ABOUT_URL || "/about-us";
  }

  static get SERVICES_URL(): string {
    return process.env.SERVICES_URL || "/services";
  }

  static get BLOG_URL(): string {
    return process.env.BLOG_URL || "/blog";
  }

  static get DEFAULT_TIMEOUT(): number {
    return parseInt(process.env.DEFAULT_TIMEOUT || "30000");
  }

  static get NAVIGATION_TIMEOUT(): number {
    return parseInt(process.env.NAVIGATION_TIMEOUT || "10000");
  }

  // Test data for form validation
  static get INVALID_EMAILS(): string[] {
    return [
      "invalid-email",
      "test@",
      "@example.com",
      "test..test@example.com",
      "test@example..com"
    ];
  }

  static get VALID_EMAILS(): string[] {
    return [
      "test@example.com",
      "user.name@domain.co.uk",
      "test+tag@example.org"
    ];
  }

  // Performance thresholds
  static get PERFORMANCE_THRESHOLDS() {
    return {
      FIRST_CONTENTFUL_PAINT: 2000,
      LARGEST_CONTENTFUL_PAINT: 4000,
      FIRST_INPUT_DELAY: 100,
      CUMULATIVE_LAYOUT_SHIFT: 0.1
    };
  }

  // Viewport sizes for responsive testing
  static get VIEWPORT_SIZES() {
    return {
      MOBILE: [
        { width: 320, height: 568 },
        { width: 375, height: 812 },
        { width: 414, height: 896 }
      ],
      TABLET: [
        { width: 768, height: 1024 },
        { width: 1024, height: 1366 }
      ],
      DESKTOP: [
        { width: 1366, height: 768 },
        { width: 1920, height: 1080 }
      ]
    };
  }
}
