Feature: Responsive Design Testing - QTEC Website
  As a user
  I want to access the website on any device
  So that I can have a consistent experience across all screen sizes

  Background:
    Given I am on the QTEC solution website

  # Mobile Responsive Testing (320px - 414px)
  Scenario Outline: Test mobile responsiveness
    When I view the website on "<device>" screen
    Then the layout should adapt to mobile viewport
    And the navigation should be mobile-friendly
    And all content should be readable
    And touch targets should be appropriately sized
    And the hamburger menu should be accessible

    Examples:
      | device        | width | height |
      | iPhone SE     | 320   | 568    |
      | iPhone 12     | 375   | 812    |
      | iPhone 12 Pro | 414   | 896    |

  # Tablet Responsive Testing (768px - 1024px)
  Scenario Outline: Test tablet responsiveness
    When I view the website on "<device>" screen
    Then the layout should adapt to tablet viewport
    And the navigation should be tablet-optimized
    And content should be properly scaled
    And interactive elements should be easily accessible

    Examples:
      | device      | width | height |
      | iPad        | 768   | 1024   |
      | iPad Pro    | 1024  | 1366   |

  # Desktop Responsive Testing (1366px - 1920px)
  Scenario Outline: Test desktop responsiveness
    When I view the website on "<device>" screen
    Then the layout should utilize desktop space effectively
    And the navigation should be desktop-optimized
    And content should be well-organized
    And all features should be easily accessible

    Examples:
      | device        | width | height |
      | Laptop        | 1366  | 768    |
      | Desktop       | 1920  | 1080   |

  # Navigation Responsive Testing
  Scenario: Test mobile navigation menu
    When I view the website on mobile screen
    Then the hamburger menu should be visible
    When I click on the hamburger menu
    Then the mobile menu should slide in from the side
    And all menu items should be accessible
    When I click outside the menu
    Then the menu should close

  Scenario: Test tablet navigation
    When I view the website on tablet screen
    Then the navigation should be horizontal
    And all menu items should be visible
    And the navigation should be easily clickable

  Scenario: Test desktop navigation
    When I view the website on desktop screen
    Then the full navigation menu should be visible
    And dropdown menus should work properly
    And the navigation should be prominently displayed

  # Content Responsive Testing
  Scenario: Test responsive images
    When I view the website on different screen sizes
    Then images should scale appropriately
    And images should maintain aspect ratios
    And images should not overflow their containers
    And images should be optimized for each screen size

  Scenario: Test responsive typography
    When I view the website on different screen sizes
    Then font sizes should be appropriate for each screen
    And text should remain readable
    And line spacing should be comfortable
    And headings should be properly sized

  Scenario: Test responsive forms
    When I view forms on mobile screen
    Then form fields should be appropriately sized
    And form validation should work correctly
    And the submit button should be easily accessible
    When I view forms on desktop screen
    Then forms should utilize available space effectively

  # Interactive Element Responsive Testing
  Scenario: Test responsive buttons
    When I view buttons on mobile screen
    Then buttons should be large enough for touch interaction
    And buttons should have adequate spacing
    When I view buttons on desktop screen
    Then buttons should be appropriately sized for mouse interaction

  Scenario: Test responsive tables
    When I view tables on mobile screen
    Then tables should be scrollable horizontally
    Or tables should stack vertically
    When I view tables on desktop screen
    Then tables should display in full format

  # Layout Responsive Testing
  Scenario: Test responsive grid layouts
    When I view the website on mobile screen
    Then content should stack in a single column
    When I view the website on tablet screen
    Then content should use a 2-column layout
    When I view the website on desktop screen
    Then content should use a multi-column layout

  Scenario: Test responsive spacing
    When I view the website on different screen sizes
    Then spacing should be appropriate for each screen size
    And elements should not be cramped on small screens
    And elements should not be too spread out on large screens

  # Performance Responsive Testing
  Scenario: Test responsive performance
    When I load the website on mobile screen
    Then the page should load quickly
    And images should be optimized for mobile
    When I load the website on desktop screen
    Then the page should load quickly
    And all features should be available

  # Cross-Device Consistency Testing
  Scenario: Test consistent functionality across devices
    When I perform the same action on different devices
    Then the functionality should work consistently
    And the user experience should be similar
    And no features should be missing on any device
