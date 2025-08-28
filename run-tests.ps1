Write-Host "========================================" -ForegroundColor Green
Write-Host "Playwright + Cucumber + Allure Project" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host ""
Write-Host "1. Running Cucumber tests..." -ForegroundColor Yellow
try {
    npm test
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Tests failed with exit code: $LASTEXITCODE" -ForegroundColor Red
        exit $LASTEXITCODE
    }
} catch {
    Write-Host "Error running tests: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "2. Generating Allure report..." -ForegroundColor Yellow
try {
    npm run report:generate
} catch {
    Write-Host "Error generating report: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "3. Opening Allure report..." -ForegroundColor Yellow
try {
    npm run report:open
} catch {
    Write-Host "Error opening report: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "Tests completed! Check the Allure report for detailed results." -ForegroundColor Green
Read-Host "Press Enter to continue"
