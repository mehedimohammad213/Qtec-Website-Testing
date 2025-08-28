# QTEC Website Testing - Docker Test Script (PowerShell)
# This script provides easy Docker testing with various options

param(
    [string]$TestType = "smoke",
    [string]$Url = "https://qtecsolution.com",
    [string]$ImageName = "qtec-testing",
    [switch]$NoBuild,
    [switch]$NoVolumes,
    [switch]$Debug,
    [switch]$Help
)

# Function to show usage
function Show-Usage {
    Write-Host "Usage: .\docker-test.ps1 [OPTIONS]" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Options:" -ForegroundColor Yellow
    Write-Host "  -TestType TYPE     Test type (smoke, functional, all) [default: smoke]"
    Write-Host "  -Url URL          Target URL [default: https://qtecsolution.com]"
    Write-Host "  -ImageName NAME   Docker image name [default: qtec-testing]"
    Write-Host "  -NoBuild          Skip building Docker image"
    Write-Host "  -NoVolumes        Don't mount volumes"
    Write-Host "  -Debug            Run in debug mode"
    Write-Host "  -Help             Show this help message"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Green
    Write-Host "  .\docker-test.ps1                                    # Run smoke tests"
    Write-Host "  .\docker-test.ps1 -TestType functional              # Run functional tests"
    Write-Host "  .\docker-test.ps1 -TestType all -Url https://staging.qtecsolution.com  # Run all tests against staging"
    Write-Host "  .\docker-test.ps1 -NoBuild -TestType smoke          # Run smoke tests without rebuilding"
}

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Show help if requested
if ($Help) {
    Show-Usage
    exit 0
}

# Validate test type
$ValidTestTypes = @("smoke", "functional", "all", "ui-ux", "responsive", "performance", "accessibility", "cross-browser")
if ($TestType -notin $ValidTestTypes) {
    Write-Error "Invalid test type: $TestType"
    Write-Error "Valid types: $($ValidTestTypes -join ', ')"
    exit 1
}

# Main execution
try {
    Write-Status "Starting QTEC Website Testing with Docker"
    Write-Status "Test Type: $TestType"
    Write-Status "Target URL: $Url"
    Write-Status "Image Name: $ImageName"
    Write-Status "Build Image: $(-not $NoBuild)"
    Write-Status "Mount Volumes: $(-not $NoVolumes)"
    Write-Status "Debug Mode: $Debug"

    # Create directories if mounting volumes
    if (-not $NoVolumes) {
        Write-Status "Creating test directories..."
        New-Item -ItemType Directory -Force -Path "test-results" | Out-Null
        New-Item -ItemType Directory -Force -Path "allure-results" | Out-Null
        New-Item -ItemType Directory -Force -Path "allure-report" | Out-Null
    }

    # Build Docker image
    if (-not $NoBuild) {
        Write-Status "Building Docker image: $ImageName"
        $buildResult = docker build -t $ImageName .
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Docker image built successfully"
        } else {
            Write-Error "Failed to build Docker image"
            exit 1
        }
    } else {
        Write-Warning "Skipping Docker image build"
    }

    # Prepare Docker run command
    $dockerCmd = "docker run --rm"

    # Add volume mounts if enabled
    if (-not $NoVolumes) {
        $currentDir = (Get-Location).Path
        $dockerCmd += " -v ${currentDir}/test-results:/app/test-results"
        $dockerCmd += " -v ${currentDir}/allure-results:/app/allure-results"
        $dockerCmd += " -v ${currentDir}/allure-report:/app/allure-report"
        $dockerCmd += " -v ${currentDir}/cucumber-report.html:/app/cucumber-report.html"
        $dockerCmd += " -v ${currentDir}/cucumber-report.json:/app/cucumber-report.json"
    }

    # Add environment variables
    $dockerCmd += " -e QTEC_URL=$Url"
    $dockerCmd += " -e CI=true"
    $dockerCmd += " -e NODE_ENV=production"

    # Add debug options if enabled
    if ($Debug) {
        $dockerCmd += " -e DEBUG=true"
    }

    # Add image name and command
    $dockerCmd += " $ImageName npm run test:$TestType"

    # Run tests
    Write-Status "Running tests with command:"
    Write-Host $dockerCmd -ForegroundColor Gray
    Write-Host ""

    $testResult = Invoke-Expression $dockerCmd
    if ($LASTEXITCODE -eq 0) {
        Write-Success "Tests completed successfully"

        # Generate reports if volumes are mounted
        if (-not $NoVolumes) {
            Write-Status "Generating reports..."

            # Generate Allure report
            $allureCmd = "docker run --rm -v ${currentDir}/allure-results:/app/allure-results -v ${currentDir}/allure-report:/app/allure-report $ImageName npm run report:generate"
            $allureResult = Invoke-Expression $allureCmd
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Allure report generated"
            } else {
                Write-Warning "Failed to generate Allure report"
            }

            # Generate Cucumber report
            $cucumberCmd = "docker run --rm -v ${currentDir}/cucumber-report.html:/app/cucumber-report.html -v ${currentDir}/cucumber-report.json:/app/cucumber-report.json $ImageName npm run test:format"
            $cucumberResult = Invoke-Expression $cucumberCmd
            if ($LASTEXITCODE -eq 0) {
                Write-Success "Cucumber report generated"
            } else {
                Write-Warning "Failed to generate Cucumber report"
            }
        }

        Write-Success "Testing completed successfully!"
        Write-Status "Reports available in:"
        if (-not $NoVolumes) {
            $currentDir = (Get-Location).Path
            Write-Host "  - Allure Report: $currentDir/allure-report/" -ForegroundColor Cyan
            Write-Host "  - Cucumber Report: $currentDir/cucumber-report.html" -ForegroundColor Cyan
            Write-Host "  - Test Results: $currentDir/test-results/" -ForegroundColor Cyan
        } else {
            Write-Host "  - Reports are inside the container (use -NoVolumes flag to mount volumes)" -ForegroundColor Yellow
        }

    } else {
        Write-Error "Tests failed"
        exit 1
    }

} catch {
    Write-Error "An error occurred: $($_.Exception.Message)"
    exit 1
}
