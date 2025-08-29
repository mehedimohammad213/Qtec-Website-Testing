# 🐳 Docker Support for QTEC Website Testing

This document provides comprehensive instructions for using Docker with the QTEC Website Testing framework.

## 📋 Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Docker Commands](#docker-commands)
- [Docker Compose](#docker-compose)
- [CI/CD Integration](#cicd-integration)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)

## 🎯 Overview

Docker support has been added to provide:

- **Consistent Environment**: Same testing environment across all machines
- **Easy Setup**: No need to install Node.js, Playwright, or browsers locally
- **CI/CD Integration**: Seamless integration with GitHub Actions
- **Isolation**: Tests run in isolated containers
- **Portability**: Run tests anywhere Docker is available

## 🚀 Quick Start

### Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)

### Basic Usage

```bash
# 1. Build the Docker image
docker build -t qtec-testing .

# 2. Run smoke tests
docker run --rm qtec-testing npm run test:smoke

# 3. Run all tests
docker run --rm qtec-testing npm run test:all
```

### With Volume Mounting (Recommended)

```bash
# Create directories for test results
mkdir -p test-results allure-results allure-report

# Run tests with volume mounting
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  qtec-testing npm run test:smoke
```

## 🛠️ Docker Commands

### Build Commands

```bash
# Build with default tag
docker build -t qtec-testing .

# Build with specific tag
docker build -t qtec-testing:v1.0.0 .

# Build with no cache (force rebuild)
docker build --no-cache -t qtec-testing .
```

### Run Commands

```bash
# Run smoke tests
docker run --rm qtec-testing npm run test:smoke

# Run functional tests
docker run --rm qtec-testing npm run test:functional

# Run all tests
docker run --rm qtec-testing npm run test:all

# Run with custom environment variables
docker run --rm \
  -e QTEC_URL=https://staging.qtecsolution.com \
  -e BROWSER=firefox \
  qtec-testing npm run test:smoke

# Run in interactive mode
docker run -it --rm qtec-testing /bin/bash

# Run with port forwarding (for Allure reports)
docker run --rm -p 8080:8080 qtec-testing npx allure serve allure-results
```

### Volume Mounting

```bash
# Mount test results directories
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  -v $(pwd)/cucumber-report.html:/app/cucumber-report.html \
  -v $(pwd)/cucumber-report.json:/app/cucumber-report.json \
  qtec-testing npm run test:all
```

### Network and Security

```bash
# Run with custom network
docker run --rm --network host qtec-testing npm run test:smoke

# Run with specific user
docker run --rm --user $(id -u):$(id -g) qtec-testing npm run test:smoke

# Run with resource limits
docker run --rm \
  --memory=2g \
  --cpus=2 \
  qtec-testing npm run test:all
```

## 🐙 Docker Compose

### Basic Usage

```bash
# Run smoke tests
docker-compose up qtec-testing

# Run all tests
docker-compose up qtec-testing-all

# Run functional tests
docker-compose up qtec-testing-functional

# Run Allure report server
docker-compose up allure-report
```

### Custom Configuration

Create a `docker-compose.override.yml` file for custom settings:

```yaml
version: "3.8"

services:
  qtec-testing:
    environment:
      - QTEC_URL=https://staging.qtecsolution.com
      - BROWSER=firefox
    volumes:
      - ./custom-config:/app/config
```

### Service Commands

```bash
# Start services in background
docker-compose up -d

# View logs
docker-compose logs -f qtec-testing

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build

# Run specific service with custom command
docker-compose run qtec-testing npm run test:debug
```

## 🔄 CI/CD Integration

### GitHub Actions

The CI/CD pipeline includes Docker support:

1. **Docker Build Job**: Builds the Docker image
2. **Docker Test Job**: Runs tests in containers
3. **Docker Report Job**: Generates reports from container results

### Workflow Files

- `ci-cd-pipeline.yml`: Main pipeline with Docker integration
- `docker-ci.yml`: Dedicated Docker CI pipeline

### Local CI/CD Simulation

```bash
# Simulate CI environment
docker run --rm \
  -e CI=true \
  -e NODE_ENV=production \
  -v $(pwd)/test-results:/app/test-results \
  qtec-testing npm run test:ci
```

## 🔧 Troubleshooting

### Common Issues

#### 1. Permission Issues

```bash
# Fix permission issues
sudo chown -R $(id -u):$(id -g) test-results allure-results allure-report

# Run with current user
docker run --rm --user $(id -u):$(id -g) qtec-testing npm run test:smoke
```

#### 2. Browser Issues

```bash
# Rebuild with browser dependencies
docker build --no-cache -t qtec-testing .

# Check browser installation
docker run --rm qtec-testing npx playwright install --with-deps
```

#### 3. Network Issues

```bash
# Run with host network
docker run --rm --network host qtec-testing npm run test:smoke

# Check network connectivity
docker run --rm qtec-testing curl -I https://qtecsolution.com
```

#### 4. Resource Issues

```bash
# Increase memory limit
docker run --rm --memory=4g qtec-testing npm run test:all

# Increase CPU limit
docker run --rm --cpus=4 qtec-testing npm run test:all
```

### Debug Commands

```bash
# Enter container for debugging
docker run -it --rm qtec-testing /bin/bash

# Check container logs
docker logs <container-id>

# Inspect container
docker inspect qtec-testing

# Check container resources
docker stats <container-id>
```

### Performance Optimization

```bash
# Use multi-stage build
docker build --target production -t qtec-testing .

# Use build cache
docker build --build-arg BUILDKIT_INLINE_CACHE=1 -t qtec-testing .

# Optimize layer caching
docker build --cache-from qtec-testing:latest -t qtec-testing .
```

## 📊 Best Practices

### 1. Image Management

```bash
# Tag images properly
docker tag qtec-testing qtec-testing:latest
docker tag qtec-testing qtec-testing:v1.0.0

# Clean up old images
docker image prune -f

# Use specific base image versions
FROM node:18-slim
```

### 2. Volume Management

```bash
# Use named volumes for persistence
docker volume create qtec-test-results

# Mount volumes properly
docker run --rm \
  -v qtec-test-results:/app/test-results \
  qtec-testing npm run test:all
```

### 3. Security

```bash
# Run as non-root user
docker run --rm --user 1000:1000 qtec-testing npm run test:smoke

# Use security options
docker run --rm \
  --security-opt no-new-privileges \
  qtec-testing npm run test:smoke
```

### 4. Resource Management

```bash
# Set resource limits
docker run --rm \
  --memory=2g \
  --cpus=2 \
  --storage-opt size=10G \
  qtec-testing npm run test:all
```

## 📝 Scripts

### Package.json Scripts

```json
{
  "scripts": {
    "docker:build": "docker build -t qtec-testing .",
    "docker:run": "docker run --rm -v $(pwd)/test-results:/app/test-results -v $(pwd)/allure-results:/app/allure-results qtec-testing",
    "docker:test": "docker run --rm -v $(pwd)/test-results:/app/test-results -v $(pwd)/allure-results:/app/allure-results qtec-testing npm run test:smoke"
  }
}
```

### Shell Scripts

Create `scripts/docker-test.sh`:

```bash
#!/bin/bash
set -e

# Build image
docker build -t qtec-testing .

# Create directories
mkdir -p test-results allure-results allure-report

# Run tests
docker run --rm \
  -v $(pwd)/test-results:/app/test-results \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  -e QTEC_URL=${QTEC_URL:-https://qtecsolution.com} \
  qtec-testing npm run test:${TEST_TYPE:-smoke}

# Generate reports
docker run --rm \
  -v $(pwd)/allure-results:/app/allure-results \
  -v $(pwd)/allure-report:/app/allure-report \
  qtec-testing npm run report:generate
```

## 🎯 Use Cases

### 1. Local Development

```bash
# Quick test run
npm run docker:test

# Full test suite
docker run --rm -v $(pwd)/test-results:/app/test-results qtec-testing npm run test:all
```

### 2. CI/CD Pipeline

```bash
# Build and test in CI
docker build -t qtec-testing .
docker run --rm qtec-testing npm run test:ci
```

### 3. Team Collaboration

```bash
# Share image with team
docker save qtec-testing | gzip > qtec-testing.tar.gz
docker load < qtec-testing.tar.gz
```

### 4. Production Testing

```bash
# Test against production
docker run --rm \
  -e QTEC_URL=https://qtecsolution.com \
  -e NODE_ENV=production \
  qtec-testing npm run test:smoke
```

## 📞 Support

For Docker-related issues:

1. Check the troubleshooting section
2. Review Docker logs: `docker logs <container-id>`
3. Verify Docker installation: `docker --version`
4. Check system resources: `docker system df`
5. Create an issue in the repository

---

**Docker Version**: 1.0.0
**Last Updated**: $(date)
**Maintained by**: QTEC QA Team
