# 🚀 QTEC Website Testing CI/CD Pipeline

This repository contains a comprehensive CI/CD pipeline for automated testing of the QTEC website using Playwright, Cucumber, and Allure reporting.

## 📋 Table of Contents

- [Overview](#overview)
- [Pipeline Workflows](#pipeline-workflows)
- [Test Categories](#test-categories)
- [Reports](#reports)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

The CI/CD pipeline automatically runs comprehensive tests on the QTEC website and generates detailed reports. The pipeline includes:

- **Automated Testing**: Multiple test categories with parallel execution
- **Cross-browser Testing**: Chrome, Firefox, and Safari support
- **Comprehensive Reporting**: Allure and Cucumber reports
- **GitHub Pages Integration**: Automatic report deployment
- **Pull Request Integration**: Automated testing on PRs
- **Production Deployment**: Staging and production deployment workflows

## 🔄 Pipeline Workflows

### 1. Main CI/CD Pipeline (`ci-cd-pipeline.yml`)

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop`
- Daily scheduled runs (2 AM UTC)
- Manual trigger with test type selection

**Jobs:**
- **Lint and Type Check**: Code quality validation
- **Install Browsers**: Playwright browser setup
- **Run Tests**: Matrix testing across browsers and test types
- **Generate Reports**: Allure and Cucumber report generation
- **Deploy Reports**: GitHub Pages deployment
- **Notify Results**: Test result notifications

### 2. Quick Smoke Tests (`smoke-tests.yml`)

**Triggers:**
- Pull requests
- Push to main branches

**Features:**
- Fast feedback (15-minute timeout)
- PR comments with test results
- Quick validation before full pipeline

### 3. Production Deployment (`production-deployment.yml`)

**Triggers:**
- Version tags (v*)
- Manual deployment trigger

**Jobs:**
- **Pre-deployment Testing**: Comprehensive test suite
- **Security & Performance**: Specialized testing
- **Staging Deployment**: Deploy to staging environment
- **Production Deployment**: Deploy to production
- **Post-deployment Testing**: Validation after deployment

### 4. Report Deployment (`deploy-reports.yml`)

**Triggers:**
- After main pipeline completion
- Manual trigger

**Features:**
- Beautiful GitHub Pages dashboard
- Centralized report access
- Automatic updates

## 🧪 Test Categories

| Category | Description | Tags |
|----------|-------------|------|
| **Smoke** | Critical functionality tests | `@smoke` |
| **Functional** | Core business logic tests | `@functional` |
| **UI/UX** | User interface and experience tests | `@ui-ux` |
| **Responsive** | Mobile and tablet compatibility | `@responsive` |
| **Performance** | Load time and performance tests | `@performance` |
| **Accessibility** | WCAG compliance tests | `@accessibility` |
| **Cross-browser** | Multi-browser compatibility | `@cross-browser` |

## 📊 Reports

### Allure Report
- **Location**: GitHub Pages (`https://username.github.io/repo-name/`)
- **Features**:
  - Interactive test execution timeline
  - Screenshots and videos for failed tests
  - Performance metrics
  - Test categorization
  - Historical trends

### Cucumber Report
- **Location**: GitHub Pages (`https://username.github.io/repo-name/cucumber-report.html`)
- **Features**:
  - BDD-style test results
  - Step-by-step execution details
  - Feature coverage analysis
  - HTML and JSON formats

### GitHub Pages Dashboard
- **Location**: `https://username.github.io/repo-name/`
- **Features**:
  - Centralized access to all reports
  - Test execution statistics
  - Beautiful, responsive design
  - Direct links to CI/CD pipeline

## ⚙️ Setup Instructions

### 1. Repository Setup

```bash
# Clone the repository
git clone https://github.com/mehedimohammad213/Qtec-Website-Testing.git
cd Qtec-Website-Testing

# Install dependencies
npm install

# Install Playwright browsers
npm run install:browsers
```

### 2. GitHub Repository Configuration

#### Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: `gh-pages` (will be created automatically)
4. Save

#### Configure Environments (Optional)
1. Go to repository Settings → Environments
2. Create environments: `staging`, `production`
3. Add protection rules if needed

#### Set up Secrets (If needed)
1. Go to repository Settings → Secrets and variables → Actions
2. Add any required secrets for deployment

### 3. Local Development

```bash
# Run all tests
npm run test:all

# Run specific test category
npm run test:smoke
npm run test:functional
npm run test:ui-ux

# Generate reports locally
npm run report:generate
npm run report:open

# Run tests with UI
npm run test:ui
```

## 🚀 Usage

### Manual Pipeline Trigger

1. Go to Actions tab in GitHub
2. Select "CI/CD Pipeline"
3. Click "Run workflow"
4. Choose test type and branch
5. Click "Run workflow"

### Production Deployment

```bash
# Create a version tag
git tag v1.0.0
git push origin v1.0.0

# Or trigger manually via GitHub Actions
```

### Pull Request Testing

- Automatically runs smoke tests on PR creation
- Full pipeline runs on PR to main branch
- Results are commented on the PR

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `QTEC_STAGING_URL` | Staging environment URL | `https://staging.qtecsolution.com` |
| `QTEC_PROD_URL` | Production environment URL | `https://qtecsolution.com` |
| `NODE_VERSION` | Node.js version | `18` |
| `BROWSER` | Browser for testing | `chromium` |

### Customizing Test Execution

Edit `.github/workflows/ci-cd-pipeline.yml`:

```yaml
# Modify test matrix
strategy:
  matrix:
    test-type: 
      - smoke
      - functional
      # Add/remove test types
    browser: [chromium, firefox, webkit]
```

### Adding New Test Categories

1. Add test files with appropriate tags
2. Update `package.json` scripts
3. Modify workflow files to include new test type

## 🔧 Troubleshooting

### Common Issues

#### Tests Failing
1. Check test logs in GitHub Actions
2. Verify target URLs are accessible
3. Check for environment-specific issues
4. Review test data and selectors

#### Reports Not Generating
1. Ensure Allure is properly installed
2. Check file permissions
3. Verify artifact upload/download

#### Pipeline Timeout
1. Increase timeout in workflow files
2. Optimize test execution
3. Use parallel execution

#### Browser Issues
1. Verify Playwright browser installation
2. Check browser compatibility
3. Update Playwright version

### Debug Commands

```bash
# Run tests in debug mode
npm run test:debug

# Run with headed browser
npm run test:headed

# Check test structure
npm run test:dry-run

# Clean test artifacts
npm run clean
```

### Getting Help

1. Check GitHub Actions logs
2. Review test reports for detailed error information
3. Check the [Playwright documentation](https://playwright.dev/)
4. Review [Cucumber documentation](https://cucumber.io/docs/)

## 📈 Monitoring and Analytics

### Pipeline Metrics
- **Execution Time**: Track pipeline performance
- **Success Rate**: Monitor test reliability
- **Coverage**: Track test coverage trends
- **Browser Compatibility**: Monitor cross-browser issues

### Report Analytics
- **Test Trends**: Historical test results
- **Performance Metrics**: Load time tracking
- **Failure Analysis**: Common failure patterns
- **Coverage Reports**: Feature and code coverage

## 🔄 Continuous Improvement

### Best Practices
1. **Regular Updates**: Keep dependencies updated
2. **Test Maintenance**: Regularly review and update tests
3. **Performance Monitoring**: Track test execution times
4. **Documentation**: Keep documentation current

### Future Enhancements
- [ ] Integration with external monitoring tools
- [ ] Advanced performance testing
- [ ] Mobile device testing
- [ ] API testing integration
- [ ] Security scanning integration

## 📞 Support

For questions or issues:
1. Check the troubleshooting section
2. Review GitHub Actions logs
3. Create an issue in the repository
4. Contact the QA team

---

**Last Updated**: $(date)
**Pipeline Version**: 1.0.0
**Maintained by**: QTEC QA Team
