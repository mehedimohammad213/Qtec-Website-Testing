# QTEC Website Testing Suite

A comprehensive automated testing solution for the QTEC website (https://staging.qtecsolution.com/) built with Playwright, Cucumber, and TypeScript.

## 🎯 Project Overview

This testing suite provides comprehensive coverage for:

- **Functional Testing** - Navigation, forms, links, and user interactions
- **UI/UX Testing** - Visual design, element alignment, and user experience
- **Responsive Design Testing** - Cross-device compatibility (320px to 1920px)
- **Performance Testing** - Page load times, image optimization, and resource management
- **Cross-Browser Testing** - Chrome, Firefox, Safari, and Edge compatibility
- **Accessibility Testing** - WCAG compliance and keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js (>= 16.0.0)
- npm (>= 8.0.0)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/qtec-website-testing.git
cd qtec-website-testing

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

### Running Tests

#### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with debugging
npm run test:debug
```

#### Specific Test Categories

```bash
# Functional testing
npm run test:functional

# UI/UX testing
npm run test:ui-ux

# Responsive design testing
npm run test:responsive

# Performance testing
npm run test:performance

# Accessibility testing
npm run test:accessibility

# Cross-browser testing
npm run test:cross-browser
```

#### Device-Specific Testing

```bash
# Mobile testing
npm run test:mobile

# Tablet testing
npm run test:tablet

# Desktop testing
npm run test:desktop
```

#### Browser-Specific Testing

```bash
# Chrome testing
npm run test:chrome

# Firefox testing
npm run test:firefox

# Safari testing
npm run test:safari

# Edge testing
npm run test:edge
```

#### Advanced Test Execution

```bash
# Run tests in parallel
npm run test:parallel

# Run tests with retry on failure
npm run test:retry

# Dry run (check test structure without execution)
npm run test:dry-run

# CI/CD optimized execution
npm run test:ci
```

## 📊 Test Reports

### Allure Reports

```bash
# Generate Allure report
npm run report:generate

# Open Allure report in browser
npm run report:open

# Serve Allure report
npm run report:serve
```

### Cucumber Reports

```bash
# Generate HTML and JSON reports
npm run test:format
```

## 🏗️ Project Structure

```
src/
├── features/                    # Cucumber feature files
│   ├── qtec-website.feature    # Main comprehensive testing
│   ├── functional-testing.feature
│   ├── ui-ux-testing.feature
│   ├── responsive-testing.feature
│   └── performance-testing.feature
├── pages/                      # Page Object Models
│   ├── QTECHomePage.ts
│   ├── ContactFormPage.ts
│   └── OpenSourceFormPage.ts
├── step-definitions/           # Step definitions
│   ├── qtec-website-steps.ts
│   ├── functional-testing-steps.ts
│   ├── ui-ux-testing-steps.ts
│   ├── responsive-testing-steps.ts
│   └── performance-testing-steps.ts
├── utils/                      # Utilities and test data
│   └── TestData.ts
└── support/                    # Support files
    └── world.ts
```

## 🧪 Test Categories

### 1. Functional Testing

- **Navigation Testing**: Menu functionality, page transitions
- **Form Testing**: Contact forms, validation, submission
- **Link Testing**: Internal/external links, 404 error handling
- **Button Testing**: Call-to-action buttons, hover states
- **Search Functionality**: Search features and results

### 2. UI/UX Testing

- **Visual Design**: Color consistency, typography, branding
- **Element Alignment**: Layout, spacing, positioning
- **Interactive Elements**: Hover effects, focus states
- **Form Styling**: Input fields, validation messages
- **Content Presentation**: Readability, organization

### 3. Responsive Design Testing

- **Mobile (320px, 375px, 414px)**: Touch targets, hamburger menu
- **Tablet (768px, 1024px)**: Intermediate layouts
- **Desktop (1366px, 1920px)**: Full-featured layouts
- **Cross-Device Consistency**: Feature parity across devices

### 4. Performance Testing

- **Page Load Performance**: Load times, Core Web Vitals
- **Image Optimization**: Lazy loading, compression, formats
- **Resource Management**: CSS/JS minification, caching
- **Network Performance**: Request optimization, CDN usage
- **Memory Management**: Memory leaks, CPU usage

### 5. Cross-Browser Testing

- **Chrome**: Full compatibility testing
- **Firefox**: Mozilla-specific features
- **Safari**: WebKit rendering
- **Edge**: Chromium-based Edge
- **Mobile Browsers**: Mobile Chrome, Safari

### 6. Accessibility Testing

- **WCAG Compliance**: 2.1 AA standards
- **Keyboard Navigation**: Tab order, focus management
- **Screen Reader Support**: ARIA labels, alt text
- **Color Contrast**: Text readability
- **Semantic HTML**: Proper heading structure

## 🔧 Configuration

### Playwright Configuration

The `playwright.config.ts` file includes:

- Multiple browser configurations
- Responsive viewport sizes
- Screenshot and video capture
- Allure reporting integration

### Test Data

The `TestData.ts` file contains:

- Base URLs for different environments
- Test user credentials
- Performance thresholds
- Viewport size definitions

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
BASE_URL=https://staging.qtecsolution.com
TEST_USER_NAME=Test User
TEST_USER_EMAIL=test@example.com
TEST_USER_PHONE=+1234567890
```

## 📋 Bug Reporting

### Bug Report Template

Use the provided `bug-report-template.xlsx` for documenting issues:

**Sheets Included:**

1. **Bug Summary**: High-level bug tracking
2. **Detailed Bug Reports**: Comprehensive issue documentation
3. **Test Results Summary**: Test execution statistics
4. **Performance Metrics**: Core Web Vitals and load times
5. **Browser Compatibility Matrix**: Cross-browser status
6. **Responsive Design Issues**: Device-specific problems
7. **Accessibility Issues**: WCAG compliance gaps
8. **Performance Issues**: Performance-related problems
9. **Recommendations**: Improvement suggestions
10. **Test Execution Log**: Historical test runs

### Bug Report Fields

- **Bug ID**: Unique identifier
- **Severity**: High/Medium/Low impact
- **Priority**: High/Medium/Low urgency
- **Steps to Reproduce**: Detailed reproduction steps
- **Expected vs Actual Results**: Clear comparison
- **Environment**: Browser, device, OS details
- **Screenshots**: Visual evidence
- **Notes**: Additional context

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: QTEC Website Testing
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm run install:browsers
      - run: npm run test:ci
      - uses: actions/upload-artifact@v3
        with:
          name: test-results
          path: test-results/
```

## 📈 Performance Monitoring

### Core Web Vitals Thresholds

- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 4 seconds
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

### Performance Metrics Tracked

- Page load times across devices
- Image loading performance
- Resource optimization
- Memory usage patterns
- Network request efficiency

## 🔍 Debugging

### Debug Mode

```bash
npm run test:debug
```

### Screenshots and Videos

- Screenshots captured on test failure
- Videos recorded for failed tests
- All artifacts stored in `test-results/`

### Console Logging

- Browser console errors captured
- Network request monitoring
- Performance metrics logging

## 🤝 Contributing

### Code Style

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Type checking
npm run type-check
```

### Adding New Tests

1. Create feature file in `src/features/`
2. Add step definitions in `src/step-definitions/`
3. Update page objects if needed
4. Add appropriate tags for categorization
5. Update documentation

## 📚 Additional Resources

### Documentation

- [Playwright Documentation](https://playwright.dev/)
- [Cucumber Documentation](https://cucumber.io/docs/)
- [Allure Framework](https://docs.qameta.io/allure/)

### Best Practices

- Use Page Object Model pattern
- Implement proper error handling
- Add meaningful test descriptions
- Maintain test data separately
- Regular test maintenance

## 📞 Support

For questions or issues:

- Create an issue in the repository
- Contact the QA team
- Check the documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This testing suite is specifically designed for the QTEC website staging environment. Update the base URL and test data as needed for different environments.
