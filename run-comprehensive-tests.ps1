# QTEC Website Comprehensive Testing Suite
# PowerShell Script for Automated Testing

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "QTEC Website Comprehensive Testing Suite" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting comprehensive testing for QTEC website..." -ForegroundColor Green
Write-Host "Target URL: https://staging.qtecsolution.com" -ForegroundColor Yellow
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
        Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: npm is not installed or not in PATH" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "npm version: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: npm is not installed or not in PATH" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "Node.js and npm are available." -ForegroundColor Green
Write-Host ""

# Install dependencies if node_modules doesn't exist
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install dependencies" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }
    Write-Host "Dependencies installed successfully." -ForegroundColor Green
    Write-Host ""
}

# Install Playwright browsers if not already installed
Write-Host "Checking Playwright browsers..." -ForegroundColor Yellow
npm run install:browsers
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Failed to install Playwright browsers" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}
Write-Host "Playwright browsers are ready." -ForegroundColor Green
Write-Host ""

# Create test results directories
if (-not (Test-Path "test-results")) { New-Item -ItemType Directory -Name "test-results" }
if (-not (Test-Path "allure-results")) { New-Item -ItemType Directory -Name "allure-results" }

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Starting Test Execution" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Function to run tests and handle results
function Run-TestSuite {
    param(
        [string]$TestName,
        [string]$NpmCommand,
        [int]$StepNumber,
        [int]$TotalSteps
    )

    Write-Host "[$StepNumber/$TotalSteps] Running $TestName..." -ForegroundColor Yellow
    Invoke-Expression $NpmCommand
    if ($LASTEXITCODE -ne 0) {
        Write-Host "WARNING: Some $TestName failed" -ForegroundColor Red
    } else {
        Write-Host "$TestName completed successfully." -ForegroundColor Green
    }
    Write-Host ""
}

# Run all test suites
$testSuites = @(
    @{ Name = "Smoke Tests"; Command = "npm run test:smoke" },
    @{ Name = "Functional Tests"; Command = "npm run test:functional" },
    @{ Name = "UI/UX Tests"; Command = "npm run test:ui-ux" },
    @{ Name = "Responsive Design Tests"; Command = "npm run test:responsive" },
    @{ Name = "Performance Tests"; Command = "npm run test:performance" },
    @{ Name = "Accessibility Tests"; Command = "npm run test:accessibility" },
    @{ Name = "Cross-Browser Tests"; Command = "npm run test:cross-browser" },
    @{ Name = "All Tests for Final Verification"; Command = "npm run test:all" }
)

for ($i = 0; $i -lt $testSuites.Count; $i++) {
    Run-TestSuite -TestName $testSuites[$i].Name -NpmCommand $testSuites[$i].Command -StepNumber ($i + 1) -TotalSteps $testSuites.Count
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Generating Test Reports" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Generate Allure report
Write-Host "Generating Allure report..." -ForegroundColor Yellow
npm run report:generate
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Failed to generate Allure report" -ForegroundColor Red
} else {
    Write-Host "Allure report generated successfully." -ForegroundColor Green
}
Write-Host ""

# Generate Cucumber reports
Write-Host "Generating Cucumber reports..." -ForegroundColor Yellow
npm run test:format
if ($LASTEXITCODE -ne 0) {
    Write-Host "WARNING: Failed to generate Cucumber reports" -ForegroundColor Red
} else {
    Write-Host "Cucumber reports generated successfully." -ForegroundColor Green
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Execution Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Test Results Summary:" -ForegroundColor Green
Write-Host "- Test Results: test-results/" -ForegroundColor White
Write-Host "- Allure Report: allure-report/" -ForegroundColor White
Write-Host "- Cucumber Report: cucumber-report.html" -ForegroundColor White
Write-Host "- Screenshots: test-results/screenshots/" -ForegroundColor White
Write-Host "- Videos: test-results/videos/" -ForegroundColor White
Write-Host ""

Write-Host "To view the Allure report, run:" -ForegroundColor Yellow
Write-Host "npm run report:open" -ForegroundColor White
Write-Host ""

Write-Host "To view the Cucumber report, open:" -ForegroundColor Yellow
Write-Host "cucumber-report.html" -ForegroundColor White
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "1. Review test results in the reports" -ForegroundColor White
Write-Host "2. Check for any failed tests" -ForegroundColor White
Write-Host "3. Document bugs using the bug-report-template.xlsx" -ForegroundColor White
Write-Host "4. Share results with the development team" -ForegroundColor White
Write-Host "5. Schedule retesting after bug fixes" -ForegroundColor White
Write-Host ""

# Optional: Open reports automatically
$openReports = Read-Host "Would you like to open the Allure report now? (y/n)"
if ($openReports -eq "y" -or $openReports -eq "Y") {
    Write-Host "Opening Allure report..." -ForegroundColor Yellow
    npm run report:open
}

Write-Host "Testing completed successfully!" -ForegroundColor Green
Read-Host "Press Enter to exit"
