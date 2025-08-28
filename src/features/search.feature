Feature: Web Search Functionality
  As a user
  I want to search for information on the web
  So that I can find relevant content

  Background:
    Given I am on the search page

  Scenario: Basic web search
    When I search for "Playwright testing"
    Then I should see search results
    And the results should contain "Playwright"

  Scenario: Search with special characters
    When I search for "TypeScript & Cucumber"
    Then I should see search results
    And the page title should contain "TypeScript"

  Scenario Outline: Search for different terms
    When I search for "<search_term>"
    Then I should see search results
    And the results should contain "<expected_result>"

    Examples:
      | search_term    | expected_result |
      | JavaScript     | JavaScript      |
      | Python         | Python          |
      | React          | React           |
