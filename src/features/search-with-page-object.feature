Feature: Google Search with Page Object Pattern
  As a user
  I want to search Google using page objects
  So that my tests are more maintainable

  Background:
    Given I am on the Google search page

  Scenario: Search using page object pattern
    When I search for "Playwright automation" using page object
    Then I should see search results using page object
    And the page title should contain "Playwright" using page object

  Scenario: Search for different technologies
    When I search for "TypeScript testing" using page object
    Then I should see search results using page object
    And the page content should contain "TypeScript" using page object

  Scenario: Search for Cucumber BDD
    When I search for "Cucumber BDD framework" using page object
    Then I should see search results using page object
    And the page content should contain "Cucumber" using page object
