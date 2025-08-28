@echo off
echo ========================================
echo QTEC Website Comprehensive Testing Suite
echo ========================================
echo.

echo Starting comprehensive testing for QTEC website...
echo Target URL: https://staging.qtecsolution.com
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: npm is not installed or not in PATH
    pause
    exit /b 1
)

echo Node.js and npm are available.
echo.

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install dependencies
        pause
        exit /b 1
    )
    echo Dependencies installed successfully.
    echo.
)

REM Install Playwright browsers if not already installed
echo Checking Playwright browsers...
npm run install:browsers
if %errorlevel% neq 0 (
    echo ERROR: Failed to install Playwright browsers
    pause
    exit /b 1
)
echo Playwright browsers are ready.
echo.

REM Create test results directory
if not exist "test-results" mkdir test-results
if not exist "allure-results" mkdir allure-results

echo ========================================
echo Starting Test Execution
echo ========================================
echo.

REM Run smoke tests first
echo [1/8] Running Smoke Tests...
npm run test:smoke
if %errorlevel% neq 0 (
    echo WARNING: Some smoke tests failed
) else (
    echo Smoke tests completed successfully.
)
echo.

REM Run functional tests
echo [2/8] Running Functional Tests...
npm run test:functional
if %errorlevel% neq 0 (
    echo WARNING: Some functional tests failed
) else (
    echo Functional tests completed successfully.
)
echo.

REM Run UI/UX tests
echo [3/8] Running UI/UX Tests...
npm run test:ui-ux
if %errorlevel% neq 0 (
    echo WARNING: Some UI/UX tests failed
) else (
    echo UI/UX tests completed successfully.
)
echo.

REM Run responsive design tests
echo [4/8] Running Responsive Design Tests...
npm run test:responsive
if %errorlevel% neq 0 (
    echo WARNING: Some responsive tests failed
) else (
    echo Responsive tests completed successfully.
)
echo.

REM Run performance tests
echo [5/8] Running Performance Tests...
npm run test:performance
if %errorlevel% neq 0 (
    echo WARNING: Some performance tests failed
) else (
    echo Performance tests completed successfully.
)
echo.

REM Run accessibility tests
echo [6/8] Running Accessibility Tests...
npm run test:accessibility
if %errorlevel% neq 0 (
    echo WARNING: Some accessibility tests failed
) else (
    echo Accessibility tests completed successfully.
)
echo.

REM Run cross-browser tests
echo [7/8] Running Cross-Browser Tests...
npm run test:cross-browser
if %errorlevel% neq 0 (
    echo WARNING: Some cross-browser tests failed
) else (
    echo Cross-browser tests completed successfully.
)
echo.

REM Run all tests for comprehensive coverage
echo [8/8] Running All Tests for Final Verification...
npm run test:all
if %errorlevel% neq 0 (
    echo WARNING: Some tests failed during final verification
) else (
    echo All tests completed successfully.
)
echo.

echo ========================================
echo Generating Test Reports
echo ========================================
echo.

REM Generate Allure report
echo Generating Allure report...
npm run report:generate
if %errorlevel% neq 0 (
    echo WARNING: Failed to generate Allure report
) else (
    echo Allure report generated successfully.
)
echo.

REM Generate Cucumber reports
echo Generating Cucumber reports...
npm run test:format
if %errorlevel% neq 0 (
    echo WARNING: Failed to generate Cucumber reports
) else (
    echo Cucumber reports generated successfully.
)
echo.

echo ========================================
echo Test Execution Complete
echo ========================================
echo.

echo Test Results Summary:
echo - Test Results: test-results/
echo - Allure Report: allure-report/
echo - Cucumber Report: cucumber-report.html
echo - Screenshots: test-results/screenshots/
echo - Videos: test-results/videos/
echo.

echo To view the Allure report, run:
echo npm run report:open
echo.

echo To view the Cucumber report, open:
echo cucumber-report.html
echo.

echo ========================================
echo Next Steps
echo ========================================
echo 1. Review test results in the reports
echo 2. Check for any failed tests
echo 3. Document bugs using the bug-report-template.xlsx
echo 4. Share results with the development team
echo 5. Schedule retesting after bug fixes
echo.

pause
