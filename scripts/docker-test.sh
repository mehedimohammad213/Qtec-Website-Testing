#!/bin/bash

# QTEC Website Testing - Docker Test Script
# This script provides easy Docker testing with various options

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="qtec-testing"
TEST_TYPE="smoke"
QTEC_URL="https://qtecsolution.com"
BUILD_IMAGE=true
MOUNT_VOLUMES=true
INTERACTIVE=false
DEBUG=false

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -t, --test-type TYPE     Test type (smoke, functional, all) [default: smoke]"
    echo "  -u, --url URL           Target URL [default: https://qtecsolution.com]"
    echo "  -i, --image NAME        Docker image name [default: qtec-testing]"
    echo "  -n, --no-build          Skip building Docker image"
    echo "  -v, --no-volumes        Don't mount volumes"
    echo "  -d, --debug             Run in debug mode"
    echo "  -h, --help              Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                                    # Run smoke tests"
    echo "  $0 -t functional                      # Run functional tests"
    echo "  $0 -t all -u https://staging.qtecsolution.com  # Run all tests against staging"
    echo "  $0 -n -t smoke                        # Run smoke tests without rebuilding"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -t|--test-type)
            TEST_TYPE="$2"
            shift 2
            ;;
        -u|--url)
            QTEC_URL="$2"
            shift 2
            ;;
        -i|--image)
            IMAGE_NAME="$2"
            shift 2
            ;;
        -n|--no-build)
            BUILD_IMAGE=false
            shift
            ;;
        -v|--no-volumes)
            MOUNT_VOLUMES=false
            shift
            ;;
        -d|--debug)
            DEBUG=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Validate test type
case $TEST_TYPE in
    smoke|functional|all|ui-ux|responsive|performance|accessibility|cross-browser)
        ;;
    *)
        print_error "Invalid test type: $TEST_TYPE"
        print_error "Valid types: smoke, functional, all, ui-ux, responsive, performance, accessibility, cross-browser"
        exit 1
        ;;
esac

# Main execution
main() {
    print_status "Starting QTEC Website Testing with Docker"
    print_status "Test Type: $TEST_TYPE"
    print_status "Target URL: $QTEC_URL"
    print_status "Image Name: $IMAGE_NAME"
    print_status "Build Image: $BUILD_IMAGE"
    print_status "Mount Volumes: $MOUNT_VOLUMES"
    print_status "Debug Mode: $DEBUG"

    # Create directories if mounting volumes
    if [ "$MOUNT_VOLUMES" = true ]; then
        print_status "Creating test directories..."
        mkdir -p test-results allure-results allure-report
    fi

    # Build Docker image
    if [ "$BUILD_IMAGE" = true ]; then
        print_status "Building Docker image: $IMAGE_NAME"
        if docker build -t "$IMAGE_NAME" .; then
            print_success "Docker image built successfully"
        else
            print_error "Failed to build Docker image"
            exit 1
        fi
    else
        print_warning "Skipping Docker image build"
    fi

    # Prepare Docker run command
    DOCKER_CMD="docker run --rm"

    # Add volume mounts if enabled
    if [ "$MOUNT_VOLUMES" = true ]; then
        DOCKER_CMD="$DOCKER_CMD \
            -v $(pwd)/test-results:/app/test-results \
            -v $(pwd)/allure-results:/app/allure-results \
            -v $(pwd)/allure-report:/app/allure-report \
            -v $(pwd)/cucumber-report.html:/app/cucumber-report.html \
            -v $(pwd)/cucumber-report.json:/app/cucumber-report.json"
    fi

    # Add environment variables
    DOCKER_CMD="$DOCKER_CMD \
        -e QTEC_URL=$QTEC_URL \
        -e CI=true \
        -e NODE_ENV=production"

    # Add debug options if enabled
    if [ "$DEBUG" = true ]; then
        DOCKER_CMD="$DOCKER_CMD -e DEBUG=true"
    fi

    # Add image name and command
    DOCKER_CMD="$DOCKER_CMD $IMAGE_NAME npm run test:$TEST_TYPE"

    # Run tests
    print_status "Running tests with command:"
    echo "$DOCKER_CMD"
    echo ""

    if eval "$DOCKER_CMD"; then
        print_success "Tests completed successfully"

        # Generate reports if volumes are mounted
        if [ "$MOUNT_VOLUMES" = true ]; then
            print_status "Generating reports..."

            # Generate Allure report
            if docker run --rm \
                -v "$(pwd)/allure-results:/app/allure-results" \
                -v "$(pwd)/allure-report:/app/allure-report" \
                "$IMAGE_NAME" npm run report:generate; then
                print_success "Allure report generated"
            else
                print_warning "Failed to generate Allure report"
            fi

            # Generate Cucumber report
            if docker run --rm \
                -v "$(pwd)/cucumber-report.html:/app/cucumber-report.html" \
                -v "$(pwd)/cucumber-report.json:/app/cucumber-report.json" \
                "$IMAGE_NAME" npm run test:format; then
                print_success "Cucumber report generated"
            else
                print_warning "Failed to generate Cucumber report"
            fi
        fi

        print_success "Testing completed successfully!"
        print_status "Reports available in:"
        if [ "$MOUNT_VOLUMES" = true ]; then
            echo "  - Allure Report: $(pwd)/allure-report/"
            echo "  - Cucumber Report: $(pwd)/cucumber-report.html"
            echo "  - Test Results: $(pwd)/test-results/"
        else
            echo "  - Reports are inside the container (use -v flag to mount volumes)"
        fi

    else
        print_error "Tests failed"
        exit 1
    fi
}

# Run main function
main "$@"
