Feature: Functional Testing - QTEC Website
  As a tester
  I want to verify all functional aspects of the QTEC website
  So that I can ensure all features work correctly

  Background:
    Given I am on the QTEC solution website

  # Navigation Testing
  Scenario: Test main navigation menu
    When I click on the navigation menu
    Then all menu items should be visible
    And I should be able to click on each menu item
    And each menu item should navigate to the correct page

  Scenario: Test mobile navigation (hamburger menu)
    When I view the website on mobile screen
    And I click on the hamburger menu
    Then the mobile menu should open
    And all menu items should be accessible
    When I click on a menu item
    Then the mobile menu should close
    And I should navigate to the correct page

  # Link Testing
  Scenario: Test all internal links
    When I check all internal links on the page
    Then all links should be clickable
    And all links should lead to valid pages
    And no links should return 404 errors

  Scenario: Test external links
    When I click on external links
    Then new tabs should open for external links
    And the external websites should load correctly

  # Form Testing
  Scenario: Test contact form with valid data
    When I navigate to the contact form
    And I fill in all required fields with valid data
    And I submit the form
    Then the form should submit successfully
    And a success message should be displayed

  Scenario: Test contact form with invalid data
    When I navigate to the contact form
    And I submit the form without filling required fields
    Then validation error messages should be displayed
    And the form should not submit

  Scenario Outline: Test email validation in forms
    When I enter "<email>" in the email field
    And I submit the form
    Then "<expected_result>" should be displayed

    Examples:
      | email              | expected_result    |
      | test@example.com   | success            |
      | invalid-email      | validation error   |
      | test@              | validation error   |
      | @example.com       | validation error   |

  # Search Functionality
  Scenario: Test search functionality
    When I use the search feature
    Then search results should be displayed
    And search results should be relevant to the query

  # Footer Testing
  Scenario: Test footer links
    When I scroll to the footer
    Then all footer links should be clickable
    And footer links should navigate to correct pages
    And social media links should open in new tabs

  # Button Testing
  Scenario: Test call-to-action buttons
    When I click on "Book a Meeting" button
    Then a meeting booking form should open
    When I click on "Get Project Estimation" button
    Then a project estimation form should open
    When I click on "Download E-book" button
    Then the e-book should start downloading

  # Error Handling
  Scenario: Test error handling
    When I try to access a non-existent page
    Then a proper 404 error page should be displayed
    When I encounter a server error
    Then a proper error message should be displayed
