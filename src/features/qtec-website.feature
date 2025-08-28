Feature: QTEC Solution Website Comprehensive Testing
  As a user
  I want to navigate through the QTEC solution website
  So that I can explore services and submit forms

  Background:
    Given I am on the QTEC solution website

  # Functional Testing Scenarios
  Scenario: Complete website navigation and form submission
    When I click on the project section
    And I navigate to About Us page
    And I click on social media links
    And I navigate through case studies
    And I test case study tabs
    And I navigate to blog
    And I navigate to open source projects
    And I fill and submit the open source form
    And I download the e-book
    And I navigate through services
    And I navigate to contact us
    And I fill and submit the contact form
    And I click on action buttons
    And I navigate to footer about us
    And I navigate to about CEO
    And I subscribe to newsletter
    Then I should be on the About CEO page

  Scenario: Test individual navigation flows
    When I navigate to About Us page
    Then I should be on the About Us page

    When I navigate to Case Studies page
    Then I should be on the Case Studies page

    When I navigate to Contact Us page
    Then I should be on the Contact Us page

  Scenario: Test form submissions with different data
    When I navigate to Contact Us page
    And I fill the contact form with test data
    Then the form should be filled correctly

  Scenario Outline: Test navigation to different services
    When I navigate to "<service>" page
    Then I should be on the "<service>" page

    Examples:
      | service                    |
      | About Us                   |
      | Case Studies              |
      | Open Source Projects      |
      | LMS Solutions             |
      | Contact Us                |

  Scenario: Test social media links
    When I click on LinkedIn link
    Then a new popup window should open

    When I click on Email link
    Then a new popup window should open

    When I click on Portfolio link
    Then a new popup window should open

  # UI/UX Testing Scenarios
  Scenario: Verify page layout and element alignment
    Then the page header should be properly aligned
    And the navigation menu should be visible and accessible
    And all buttons should have proper hover states
    And images should be properly scaled and clear
    And the footer should be properly positioned

  Scenario: Test button states and interactions
    When I hover over action buttons
    Then the buttons should show hover effects
    When I click on buttons
    Then the buttons should show active states

  Scenario: Verify form validation messages
    When I submit the contact form with invalid data
    Then validation error messages should be displayed
    When I submit the contact form with valid data
    Then success message should be displayed

  # Responsive Design Testing
  Scenario Outline: Test responsive design on different screen sizes
    When I view the website on "<device>" screen
    Then the layout should be responsive and properly formatted
    And all elements should be accessible
    And the navigation should work correctly

    Examples:
      | device        |
      | mobile-320    |
      | mobile-375    |
      | mobile-414    |
      | tablet-768    |
      | tablet-1024   |
      | desktop-1366  |
      | desktop-1920  |

  # Cross-Browser Compatibility
  Scenario Outline: Test cross-browser compatibility
    When I access the website using "<browser>"
    Then the website should render correctly
    And all functionality should work as expected

    Examples:
      | browser   |
      | chromium  |
      | firefox   |
      | webkit    |
      | edge      |

  # Performance Testing
  Scenario: Test page load performance
    When I load the homepage
    Then the page should load within acceptable time limits
    And there should be no console errors
    And images should be optimized

  # Accessibility Testing
  Scenario: Test website accessibility
    Then all images should have alt text
    And the website should have proper heading structure
    And all interactive elements should be keyboard accessible
    And color contrast should meet accessibility standards
