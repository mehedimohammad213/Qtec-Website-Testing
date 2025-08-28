# QTEC Solution Website Test Automation

This project demonstrates automated testing of the QTEC Solution website using Playwright with TypeScript, Cucumber BDD, Page Object Model (POM), and Allure reporting.

## 🎯 Project Overview

The test suite covers comprehensive navigation and form submission scenarios for the QTEC Solution website, including:

- Website navigation flows
- Form submissions with reCAPTCHA handling
- Social media link interactions
- Service page navigation
- Newsletter subscription

## 🏗️ Architecture

### Page Object Model (POM)

- **QTECHomePage**: Main navigation and interaction methods
- **ContactFormPage**: Contact form handling with reCAPTCHA
- **OpenSourceFormPage**: Open source project form handling
- **TestData**: Environment variable management

### Environment Variables

All test data is externalized using `.env` files for easy configuration and maintenance.

## 📁 Project Structure

```
├── src/
│   ├── pages/                    # Page Object Models
│   │   ├── QTECHomePage.ts      # Main website navigation
│   │   ├── ContactFormPage.ts   # Contact form handling
│   │   └── OpenSourceFormPage.ts # Open source form handling
│   ├── utils/
│   │   └── TestData.ts          # Environment variable management
│   ├── features/
│   │   └── qtec-website.feature # Cucumber feature files
│   ├── step-definitions/
│   │   └── qtec-website-steps.ts # Cucumber step definitions
│   └── tests/
│       └── qtec-website-test.spec.ts # Playwright test files
├── env.example                  # Environment variables template
├── cucumber.js                  # Cucumber configuration
├── playwright.config.ts        # Playwright configuration
└── package.json               # Dependencies and scripts
```

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Playwright Browsers

```bash
npm run install:browsers
```

### 3. Configure Environment Variables

Copy the example environment file and customize it:

```bash
cp env.example .env
```

Edit `.env` with your test data:

```env
# QTEC Solution Website Test Configuration
BASE_URL=https://qtecsolution.com
TEST_USER_NAME=your_name
TEST_USER_EMAIL=your_email@gmail.com
TEST_USER_PHONE=your_phone_number
TEST_MESSAGE=your_test_message

# Test Data
PROJECT_NAME=Mahfil Mahfil
CASE_STUDY_URL=/case-study/mahfil
CASE_STUDIES_URL=/case-studies
OPEN_SOURCE_URL=/open-source-projects
LMS_SERVICE_URL=/service/lms-solutions
CONTACT_URL=/contact-us

# Timeouts
DEFAULT_TIMEOUT=30000
NAVIGATION_TIMEOUT=10000
```

## 🧪 Running Tests

### Playwright Tests

```bash
# Run all Playwright tests
npm run test:ui

# Run specific test file
npx playwright test src/tests/qtec-website-test.spec.ts

# Run tests in headed mode
npx playwright test --headed
```

### Cucumber Tests

```bash
# Run all Cucumber tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests in debug mode
npm run test:debug
```

### Code Generation

```bash
# Start Playwright codegen for recording
npm run codegen
```

## 📊 Reporting

### Allure Reports

```bash
# Generate Allure report
npm run report:generate

# Open Allure report
npm run report:open

# Serve Allure report
npm run report:serve
```

## 🔧 Key Features

### 1. Page Object Model (POM)

- **Maintainable**: Centralized locators and methods
- **Reusable**: Common functionality across tests
- **Type-safe**: Full TypeScript support

### 2. Environment Variables

- **Configurable**: Easy test data management
- **Secure**: Sensitive data externalized
- **Flexible**: Different environments support

### 3. reCAPTCHA Handling

- **Automated**: Built-in reCAPTCHA solving
- **Robust**: Multiple challenge handling
- **Configurable**: Easy to modify for different scenarios

### 4. Comprehensive Navigation

- **Social Media**: LinkedIn, Email, Portfolio links
- **Services**: LMS, Software Development, etc.
- **Forms**: Contact and Open Source project forms

## 📝 Test Scenarios

### 1. Complete Website Navigation

- Home page navigation
- About Us, Case Studies, Blog
- Services and Contact pages
- Social media interactions

### 2. Form Submissions

- Contact form with reCAPTCHA
- Open source project form
- Newsletter subscription

### 3. Interactive Elements

- Tab navigation (WEB, APP, UI/UX)
- Popup handling
- Dialog management

## 🛠️ Customization

### Adding New Pages

1. Create a new page object in `src/pages/`
2. Add locators and methods
3. Update test files to use the new page object

### Adding New Test Data

1. Add variables to `.env` file
2. Update `TestData.ts` utility class
3. Use in page objects and tests

### Modifying reCAPTCHA Handling

1. Update the `handleRecaptcha()` methods in form pages
2. Customize challenge solving logic
3. Test with different reCAPTCHA scenarios

## 🔍 Best Practices

### 1. Page Object Model

- Keep locators in page objects
- Use descriptive method names
- Implement proper error handling

### 2. Environment Variables

- Never commit sensitive data
- Use meaningful variable names
- Provide default values

### 3. Test Organization

- Group related scenarios
- Use descriptive test names
- Implement proper setup/teardown

### 4. Reporting

- Generate reports after each run
- Review Allure reports for insights
- Track test execution trends

## 🚨 Troubleshooting

### Common Issues

1. **reCAPTCHA Failures**

   - Update challenge solving logic
   - Increase timeouts
   - Check iframe selectors

2. **Environment Variables Not Loading**

   - Ensure `.env` file exists
   - Check variable names
   - Verify dotenv configuration

3. **Test Failures**
   - Check website changes
   - Update locators if needed
   - Review error messages

### Debug Mode

```bash
# Run tests in debug mode
npm run test:debug

# Use Playwright UI for debugging
npm run test:ui
```

## 📈 Future Enhancements

1. **API Testing**: Add API test coverage
2. **Visual Testing**: Implement visual regression testing
3. **Performance Testing**: Add performance benchmarks
4. **Mobile Testing**: Extend to mobile devices
5. **CI/CD Integration**: Add GitHub Actions or Jenkins

## 🤝 Contributing

1. Follow the existing code structure
2. Add proper TypeScript types
3. Update documentation
4. Test thoroughly before submitting

## 📄 License

This project is licensed under the MIT License.
