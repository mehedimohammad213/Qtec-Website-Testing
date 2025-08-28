Feature: Performance Testing - QTEC Website
  As a user
  I want the website to load quickly and perform well
  So that I can have a smooth and efficient browsing experience

  Background:
    Given I am on the QTEC solution website

  # Page Load Performance Testing
  Scenario: Test homepage load performance
    When I load the homepage
    Then the page should load within 3 seconds
    And the first contentful paint should be under 2 seconds
    And the largest contentful paint should be under 4 seconds
    And the first input delay should be under 100ms

  Scenario: Test page load performance on different devices
    When I load the homepage on mobile device
    Then the page should load within 5 seconds
    When I load the homepage on desktop device
    Then the page should load within 3 seconds

  Scenario: Test navigation performance
    When I navigate between pages
    Then each page should load within 3 seconds
    And navigation should be smooth
    And there should be no loading delays

  # Image Performance Testing
  Scenario: Test image optimization
    When I load the website
    Then all images should be optimized
    And images should use appropriate formats (WebP, JPEG, PNG)
    And images should have proper compression
    And images should load progressively

  Scenario: Test lazy loading
    When I scroll down the page
    Then images should load as they come into viewport
    And images should not load all at once
    And the page should remain responsive during scrolling

  Scenario: Test image loading performance
    When I load the website
    Then images should load quickly
    And there should be no broken image links
    And images should maintain quality while being optimized

  # Resource Performance Testing
  Scenario: Test CSS and JavaScript loading
    When I load the website
    Then CSS files should be minified
    And JavaScript files should be minified
    And resources should be properly cached
    And there should be no render-blocking resources

  Scenario: Test third-party resource loading
    When I load the website
    Then third-party scripts should not block page rendering
    And external resources should load efficiently
    And there should be no unnecessary external requests

  # Console Error Testing
  Scenario: Test for console errors
    When I load the website
    Then there should be no JavaScript errors in the console
    And there should be no CSS errors
    And there should be no network errors
    And there should be no 404 errors for resources

  Scenario: Test for console warnings
    When I load the website
    Then there should be minimal console warnings
    And any warnings should not affect functionality
    And deprecated features should not be used

  # Network Performance Testing
  Scenario: Test network requests
    When I load the website
    Then the number of HTTP requests should be minimized
    And requests should be properly optimized
    And there should be no duplicate requests
    And resources should be served from appropriate CDNs

  Scenario: Test caching effectiveness
    When I reload the website
    Then cached resources should load from cache
    And the page should load faster on subsequent visits
    And cache headers should be properly set

  # Memory and CPU Performance Testing
  Scenario: Test memory usage
    When I use the website for an extended period
    Then memory usage should remain stable
    And there should be no memory leaks
    And the browser should not become unresponsive

  Scenario: Test CPU usage
    When I interact with the website
    Then CPU usage should remain reasonable
    And animations should be smooth
    And the interface should remain responsive

  # Mobile Performance Testing
  Scenario: Test mobile performance
    When I load the website on mobile device
    Then the page should be optimized for mobile
    And touch interactions should be responsive
    And the battery usage should be reasonable
    And the data usage should be optimized

  # Accessibility Performance Testing
  Scenario: Test accessibility performance
    When I use screen readers
    Then the website should load quickly
    And navigation should be efficient
    And content should be accessible without performance degradation

  # Cross-Browser Performance Testing
  Scenario Outline: Test performance across browsers
    When I load the website in "<browser>"
    Then the performance should be consistent
    And the loading times should be acceptable
    And all features should work efficiently

    Examples:
      | browser   |
      | Chrome    |
      | Firefox   |
      | Safari    |
      | Edge      |

  # Performance Monitoring
  Scenario: Monitor performance metrics
    When I track performance metrics
    Then I should record page load times
    And I should record resource loading times
    And I should record user interaction response times
    And I should identify performance bottlenecks
