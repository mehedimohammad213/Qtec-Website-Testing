@echo off
echo ========================================
echo Playwright + Cucumber + Allure Project
echo ========================================

echo.
echo 1. Running Cucumber tests...
npm test

echo.
echo 2. Generating Allure report...
npm run report:generate

echo.
echo 3. Opening Allure report...
npm run report:open

echo.
echo Tests completed! Check the Allure report for detailed results.
pause
