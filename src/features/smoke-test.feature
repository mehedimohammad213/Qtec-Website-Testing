@smoke @functional @high
Feature: Smoke Testing - Basic Website Functionality
  As a user
  I want to verify basic website functionality
  So that I can ensure the website is working correctly

  @critical
  Scenario: Homepage loads successfully
    Given I am on the QTEC solution website
    Then the page should load within acceptable time limits
    And the navigation menu should be visible and accessible

  @critical
  Scenario: Basic navigation works
    Given I am on the QTEC solution website
    When I click on the navigation menu
    Then all menu items should be visible
    And I should be able to click on each menu item

  @medium
  Scenario: Contact form is accessible
    Given I am on the QTEC solution website
    When I navigate to the contact form
    Then the form should be accessible
    And form fields should be appropriately sized
