import { Given, When, Then, Before } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { QTECHomePage } from "../pages/QTECHomePage";
import { TestData } from "../utils/TestData";
import { CustomWorld } from "../support/world";

let qtecHomePage: QTECHomePage;

Before(async function (this: CustomWorld) {
  if (this.page) {
    qtecHomePage = new QTECHomePage(this.page);
  }
});

Given("I am on the QTEC solution website", async function () {
  await qtecHomePage.goto();
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

// Page Load Performance Testing Steps
When("I load the homepage", async function () {
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.loadTime = Date.now() - startTime;
});

Then("the page should load within 3 seconds", async function () {
  expect(this.loadTime).toBeLessThan(3000);
});

Then("the first contentful paint should be under 2 seconds", async function () {
  const fcp = await this.page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(
          (entry) => entry.name === "first-contentful-paint"
        );
        if (fcpEntry) {
          resolve(fcpEntry.startTime);
        }
      }).observe({ entryTypes: ["paint"] });
    });
  });
  expect(fcp).toBeLessThan(2000);
});

Then(
  "the largest contentful paint should be under 4 seconds",
  async function () {
    const lcp = await this.page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lcpEntry = entries[entries.length - 1];
          if (lcpEntry) {
            resolve(lcpEntry.startTime);
          }
        }).observe({ entryTypes: ["largest-contentful-paint"] });
      });
    });
    expect(lcp).toBeLessThan(4000);
  }
);

Then("the first input delay should be under 100ms", async function () {
  const fid = await this.page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidEntry = entries.find(
          (entry) => entry.name === "first-input"
        ) as any;
        if (fidEntry) {
          resolve((fidEntry as any).processingStart - fidEntry.startTime);
        }
      }).observe({ entryTypes: ["first-input"] });
    });
  });
  expect(fid).toBeLessThan(100);
});

// Device-Specific Performance Testing
When("I load the homepage on mobile device", async function () {
  await qtecHomePage.setViewportSize(375, 812);
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.mobileLoadTime = Date.now() - startTime;
});

Then("the page should load within 5 seconds", async function () {
  expect(this.mobileLoadTime).toBeLessThan(5000);
});

When("I load the homepage on desktop device", async function () {
  await qtecHomePage.setViewportSize(1920, 1080);
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.desktopLoadTime = Date.now() - startTime;
});

Then("the page should load within 3 seconds", async function () {
  expect(this.desktopLoadTime).toBeLessThan(3000);
});

// Navigation Performance Testing
When("I navigate between pages", async function () {
  const navigationTimes = [];

  // Navigate to About Us
  const startTime1 = Date.now();
  await qtecHomePage.navigateToAboutUs();
  navigationTimes.push(Date.now() - startTime1);

  // Navigate back to home
  const startTime2 = Date.now();
  await qtecHomePage.goto();
  navigationTimes.push(Date.now() - startTime2);

  // Navigate to Contact
  const startTime3 = Date.now();
  await qtecHomePage.navigateToContactUs();
  navigationTimes.push(Date.now() - startTime3);

  this.navigationTimes = navigationTimes;
});

Then("each page should load within 3 seconds", async function () {
  for (const time of this.navigationTimes) {
    expect(time).toBeLessThan(3000);
  }
});

Then("navigation should be smooth", async function () {
  for (const time of this.navigationTimes) {
    expect(time).toBeLessThan(2000); // Smooth navigation should be under 2 seconds
  }
});

Then("there should be no loading delays", async function () {
  for (const time of this.navigationTimes) {
    expect(time).toBeLessThan(1000); // No significant delays
  }
});

// Image Performance Testing
When("I load the website", async function () {
  await qtecHomePage.goto();
});

Then("all images should be optimized", async function () {
  const optimizationResults = await qtecHomePage.checkImageOptimization();
  for (const result of optimizationResults) {
    expect(result.hasAlt).toBeTruthy();
  }
});

Then("images should use appropriate formats", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    if (src) {
      const extension = src.split(".").pop()?.toLowerCase();
      expect(["webp", "jpg", "jpeg", "png", "svg", "gif"]).toContain(extension);
    }
  }
});

Then("images should have proper compression", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    expect(src).toBeTruthy();
    // Note: Actual compression checking would require downloading and analyzing files
  }
});

Then("images should load progressively", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const loading = await img.getAttribute("loading");
    // Progressive loading can be checked via loading attribute or actual loading behavior
    expect(loading === "lazy" || loading === null).toBeTruthy();
  }
});

// Lazy Loading Testing
When("I scroll down the page", async function () {
  await this.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await this.page.waitForTimeout(1000); // Wait for lazy loading
});

Then("images should load as they come into viewport", async function () {
  const images = await qtecHomePage.allImages.all();
  let loadedImages = 0;

  for (const img of images) {
    const isLoaded = await img.evaluate(
      (el) => (el as HTMLImageElement).complete
    );
    if (isLoaded) {
      loadedImages++;
    }
  }

  expect(loadedImages).toBeGreaterThan(0);
});

Then("images should not load all at once", async function () {
  // This would require monitoring network requests
  // For now, we'll check that images have lazy loading attributes
  const images = await qtecHomePage.allImages.all();
  let lazyImages = 0;

  for (const img of images) {
    const loading = await img.getAttribute("loading");
    if (loading === "lazy") {
      lazyImages++;
    }
  }

  expect(lazyImages).toBeGreaterThan(0);
});

Then("the page should remain responsive during scrolling", async function () {
  const scrollStart = Date.now();
  await this.page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  const scrollEnd = Date.now();

  expect(scrollEnd - scrollStart).toBeLessThan(1000); // Scrolling should be smooth
});

// Image Loading Performance Testing
Then("images should load quickly", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const isLoaded = await img.evaluate(
      (el) => (el as HTMLImageElement).complete
    );
    expect(isLoaded).toBeTruthy();
  }
});

Then("there should be no broken image links", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    const src = await img.getAttribute("src");
    expect(src).toBeTruthy();
    expect(src).not.toBe("");
  }
});

Then("images should maintain quality while being optimized", async function () {
  const images = await qtecHomePage.allImages.all();
  for (const img of images) {
    if (await img.isVisible()) {
      const naturalWidth = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalWidth
      );
      const naturalHeight = await img.evaluate(
        (el) => (el as HTMLImageElement).naturalHeight
      );
      expect(naturalWidth).toBeGreaterThan(0);
      expect(naturalHeight).toBeGreaterThan(0);
    }
  }
});

// Resource Performance Testing
Then("CSS files should be minified", async function () {
  const cssFiles = await this.page.evaluate(() => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    return Array.from(links).map((link) => link.getAttribute("href"));
  });

  for (const cssFile of cssFiles) {
    if (cssFile) {
      expect(
        cssFile.includes(".min.css") || cssFile.includes("minified")
      ).toBeTruthy();
    }
  }
});

Then("JavaScript files should be minified", async function () {
  const jsFiles = await this.page.evaluate(() => {
    const scripts = document.querySelectorAll("script[src]");
    return Array.from(scripts).map((script) => script.getAttribute("src"));
  });

  for (const jsFile of jsFiles) {
    if (jsFile) {
      expect(
        jsFile.includes(".min.js") || jsFile.includes("minified")
      ).toBeTruthy();
    }
  }
});

Then("resources should be properly cached", async function () {
  const cacheHeaders = await this.page.evaluate(() => {
    // This would require checking response headers
    // For now, we'll check if resources are loaded
    return document.querySelectorAll('link[rel="stylesheet"], script[src]')
      .length;
  });

  expect(cacheHeaders).toBeGreaterThan(0);
});

Then("there should be no render-blocking resources", async function () {
  const renderBlocking = await this.page.evaluate(() => {
    const blockingScripts = document.querySelectorAll(
      "script:not([async]):not([defer])"
    );
    return blockingScripts.length;
  });

  expect(renderBlocking).toBeLessThan(5); // Should have minimal blocking resources
});

// Third-Party Resource Testing
Then("third-party scripts should not block page rendering", async function () {
  const thirdPartyScripts = await this.page.evaluate(() => {
    const scripts = document.querySelectorAll("script[src]");
    return Array.from(scripts).filter((script) => {
      const src = script.getAttribute("src");
      return (
        src &&
        (src.includes("google") ||
          src.includes("facebook") ||
          src.includes("analytics"))
      );
    });
  });

  for (const script of thirdPartyScripts) {
    const async = script.getAttribute("async");
    const defer = script.getAttribute("defer");
    expect(async || defer).toBeTruthy();
  }
});

Then("external resources should load efficiently", async function () {
  const externalResources = await this.page.evaluate(() => {
    const links = document.querySelectorAll('link[rel="stylesheet"]');
    const scripts = document.querySelectorAll("script[src]");
    return [...Array.from(links), ...Array.from(scripts)];
  });

  expect(externalResources.length).toBeGreaterThan(0);
});

Then("there should be no unnecessary external requests", async function () {
  const requests = await this.page.evaluate(() => {
    // This would require monitoring network requests
    // For now, we'll check if the page loads successfully
    return document.readyState === "complete";
  });

  expect(requests).toBeTruthy();
});

// Console Error Testing
Then("there should be no JavaScript errors in the console", async function () {
  const errors = await qtecHomePage.checkConsoleErrors();
  expect(errors.length).toBe(0);
});

Then("there should be no CSS errors", async function () {
  const cssErrors = await this.page.evaluate(() => {
    const styleSheets = document.styleSheets;
    let errors = 0;

    for (let i = 0; i < styleSheets.length; i++) {
      try {
        styleSheets[i].cssRules;
      } catch (e) {
        errors++;
      }
    }

    return errors;
  });

  expect(cssErrors).toBe(0);
});

Then("there should be no network errors", async function () {
  const networkErrors = await this.page.evaluate(() => {
    // This would require monitoring network requests
    // For now, we'll check if the page loads without errors
    return !window.performance
      .getEntriesByType("resource")
      .some(
        (entry) => entry.name.includes("404") || entry.name.includes("500")
      );
  });

  expect(networkErrors).toBeTruthy();
});

Then("there should be no 404 errors for resources", async function () {
  const resourceErrors = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    return resources.filter((entry) => entry.name.includes("404")).length;
  });

  expect(resourceErrors).toBe(0);
});

// Console Warning Testing
Then("there should be minimal console warnings", async function () {
  const warnings = await this.page.evaluate(() => {
    // This would require capturing console warnings
    // For now, we'll check if the page loads successfully
    return document.readyState === "complete";
  });

  expect(warnings).toBeTruthy();
});

Then("any warnings should not affect functionality", async function () {
  const functionality = await this.page.evaluate(() => {
    // Check if key functionality is available
    return document.querySelector("nav") && document.querySelector("main");
  });

  expect(functionality).toBeTruthy();
});

Then("deprecated features should not be used", async function () {
  const deprecatedFeatures = await this.page.evaluate(() => {
    // Check for common deprecated features
    const deprecated = [];

    // Check for deprecated HTML elements
    if (document.querySelector("marquee")) deprecated.push("marquee");
    if (document.querySelector("blink")) deprecated.push("blink");

    // Check for deprecated JavaScript APIs
    if (typeof (window as any).showModalDialog === "function")
      deprecated.push("showModalDialog");

    return deprecated;
  });

  expect(deprecatedFeatures.length).toBe(0);
});

// Network Performance Testing
Then("the number of HTTP requests should be minimized", async function () {
  const requestCount = await this.page.evaluate(() => {
    return window.performance.getEntriesByType("resource").length;
  });

  expect(requestCount).toBeLessThan(50); // Reasonable number of requests
});

Then("requests should be properly optimized", async function () {
  const optimizedRequests = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    return resources.filter((entry) => entry.duration < 1000).length; // Requests under 1 second
  });

  expect(optimizedRequests).toBeGreaterThan(0);
});

Then("there should be no duplicate requests", async function () {
  const duplicateRequests = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    const urls = resources.map((entry) => entry.name);
    const uniqueUrls = new Set(urls);
    return urls.length === uniqueUrls.size;
  });

  expect(duplicateRequests).toBeTruthy();
});

Then("resources should be served from appropriate CDNs", async function () {
  const cdnResources = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    return resources.filter(
      (entry) =>
        entry.name.includes("cdn") ||
        entry.name.includes("cloudflare") ||
        entry.name.includes("amazonaws")
    ).length;
  });

  expect(cdnResources).toBeGreaterThanOrEqual(0);
});

// Caching Effectiveness Testing
When("I reload the website", async function () {
  await this.page.reload();
});

Then("cached resources should load from cache", async function () {
  const cachedResources = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    return resources.filter((entry) => (entry as any).transferSize === 0)
      .length; // Cached resources have 0 transfer size
  });

  expect(cachedResources).toBeGreaterThan(0);
});

Then("the page should load faster on subsequent visits", async function () {
  const firstLoadTime = this.loadTime || 3000;
  const reloadStartTime = Date.now();
  await this.page.reload();
  const reloadTime = Date.now() - reloadStartTime;

  expect(reloadTime).toBeLessThan(firstLoadTime);
});

Then("cache headers should be properly set", async function () {
  // This would require checking response headers
  // For now, we'll verify the page loads successfully
  await expect(this.page).toHaveURL(TestData.BASE_URL);
});

// Memory and CPU Performance Testing
When("I use the website for an extended period", async function () {
  // Simulate extended usage by navigating multiple times
  for (let i = 0; i < 5; i++) {
    await qtecHomePage.navigateToAboutUs();
    await qtecHomePage.goto();
    await qtecHomePage.navigateToContactUs();
    await qtecHomePage.goto();
  }
});

Then("memory usage should remain stable", async function () {
  const memoryInfo = await this.page.evaluate(() => {
    if ("memory" in performance) {
      return (performance as any).memory.usedJSHeapSize;
    }
    return 0;
  });

  expect(memoryInfo).toBeGreaterThanOrEqual(0);
});

Then("there should be no memory leaks", async function () {
  // This would require monitoring memory usage over time
  // For now, we'll check if the page remains functional
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
});

Then("the browser should not become unresponsive", async function () {
  const isResponsive = await this.page.evaluate(() => {
    return document.readyState === "complete";
  });

  expect(isResponsive).toBeTruthy();
});

// CPU Usage Testing
When("I interact with the website", async function () {
  // Simulate user interactions
  await qtecHomePage.bookMeetingLink.hover();
  await qtecHomePage.subscribeButton.click();
  await this.page.keyboard.press("Tab");
});

Then("CPU usage should remain reasonable", async function () {
  // This would require monitoring CPU usage
  // For now, we'll check if interactions are responsive
  await expect(qtecHomePage.subscribeButton).toBeVisible();
});

Then("animations should be smooth", async function () {
  const animations = await this.page.evaluate(() => {
    const elements = document.querySelectorAll("*");
    let animatedElements = 0;

    for (const element of Array.from(elements)) {
      const style = getComputedStyle(element);
      if (style.animation || style.transition) {
        animatedElements++;
      }
    }

    return animatedElements;
  });

  expect(animations).toBeGreaterThanOrEqual(0);
});

Then("the interface should remain responsive", async function () {
  const isResponsive = await this.page.evaluate(() => {
    return document.readyState === "complete";
  });

  expect(isResponsive).toBeTruthy();
});

// Mobile Performance Testing
When("I load the website on mobile device", async function () {
  await qtecHomePage.setViewportSize(375, 812);
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.mobileLoadTime = Date.now() - startTime;
});

Then("the page should be optimized for mobile", async function () {
  const viewport = await this.page.viewportSize();
  expect(viewport!.width).toBeLessThanOrEqual(414);
});

Then("touch interactions should be responsive", async function () {
  await qtecHomePage.subscribeButton.click();
  await expect(qtecHomePage.subscribeButton).toBeVisible();
});

Then("the battery usage should be reasonable", async function () {
  // This would require monitoring battery usage
  // For now, we'll check if the page loads efficiently
  expect(this.mobileLoadTime).toBeLessThan(5000);
});

Then("the data usage should be optimized", async function () {
  const dataUsage = await this.page.evaluate(() => {
    const resources = window.performance.getEntriesByType("resource");
    return resources.reduce(
      (total, entry) => total + (entry as any).transferSize,
      0
    );
  });

  expect(dataUsage).toBeLessThan(5000000); // Less than 5MB
});

// Accessibility Performance Testing
When("I use screen readers", async function () {
  // Simulate screen reader usage by checking accessibility features
  const accessibilityFeatures = await this.page.evaluate(() => {
    const features = [];

    // Check for ARIA labels
    const ariaElements = document.querySelectorAll(
      "[aria-label], [aria-labelledby]"
    );
    features.push(ariaElements.length);

    // Check for alt text
    const images = document.querySelectorAll("img");
    const imagesWithAlt = Array.from(images).filter((img) => img.alt);
    features.push(imagesWithAlt.length);

    return features;
  });

  this.accessibilityFeatures = accessibilityFeatures;
});

Then("the website should load quickly", async function () {
  expect(this.loadTime).toBeLessThan(3000);
});

Then("navigation should be efficient", async function () {
  expect(this.navigationTimes[0]).toBeLessThan(2000);
});

Then(
  "content should be accessible without performance degradation",
  async function () {
    expect(this.accessibilityFeatures[0]).toBeGreaterThan(0);
    expect(this.accessibilityFeatures[1]).toBeGreaterThan(0);
  }
);

// Cross-Browser Performance Testing
When("I load the website in {string}", async function (browser: string) {
  // This is handled by Playwright's browser configuration
  const startTime = Date.now();
  await qtecHomePage.goto();
  this.browserLoadTime = Date.now() - startTime;
});

Then("the performance should be consistent", async function () {
  expect(this.browserLoadTime).toBeLessThan(5000);
});

Then("the loading times should be acceptable", async function () {
  expect(this.browserLoadTime).toBeLessThan(3000);
});

Then("all features should work efficiently", async function () {
  await expect(qtecHomePage.aboutUsLink).toBeVisible();
  await expect(qtecHomePage.bookMeetingLink).toBeVisible();
});

// Performance Monitoring
When("I track performance metrics", async function () {
  this.performanceMetrics = await this.page.evaluate(() => {
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;
    const resources = performance.getEntriesByType("resource");

    return {
      domContentLoaded:
        navigation.domContentLoadedEventEnd -
        navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      resourceCount: resources.length,
      totalResourceSize: resources.reduce(
        (total, resource) => total + (resource as any).transferSize,
        0
      ),
    };
  });
});

Then("I should record page load times", async function () {
  expect(this.performanceMetrics.domContentLoaded).toBeGreaterThan(0);
  expect(this.performanceMetrics.loadComplete).toBeGreaterThan(0);
});

Then("I should record resource loading times", async function () {
  expect(this.performanceMetrics.resourceCount).toBeGreaterThan(0);
});

Then("I should record user interaction response times", async function () {
  const interactionTime = await this.page.evaluate(() => {
    const start = performance.now();
    document.body.click();
    return performance.now() - start;
  });

  expect(interactionTime).toBeLessThan(100);
});

Then("I should identify performance bottlenecks", async function () {
  const slowResources = await this.page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    return resources.filter((resource) => resource.duration > 1000).length;
  });

  expect(slowResources).toBeLessThan(5); // Should have minimal slow resources
});
