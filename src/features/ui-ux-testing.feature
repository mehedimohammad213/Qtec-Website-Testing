Feature: UI/UX Testing - QTEC Website
  As a user
  I want to experience a well-designed and user-friendly interface
  So that I can easily navigate and interact with the website

  Background:
    Given I am on the QTEC solution website

  # Visual Design Testing
  Scenario: Verify visual consistency
    Then the color scheme should be consistent throughout the website
    And the typography should be uniform across all pages
    And the branding elements should be properly displayed
    And the logo should be clearly visible and properly positioned

  Scenario: Test element alignment and spacing
    Then all page elements should be properly aligned
    And there should be consistent spacing between elements
    And the layout should be visually balanced
    And no elements should overlap or be cut off

  # Button and Interactive Element Testing
  Scenario: Test button visual states
    When I hover over buttons
    Then buttons should show hover effects
    When I click on buttons
    Then buttons should show active/pressed states
    When I focus on buttons using keyboard
    Then buttons should show focus indicators

  Scenario: Test form field styling
    When I focus on form fields
    Then form fields should show focus indicators
    When I enter invalid data
    Then form fields should show error styling
    When I enter valid data
    Then form fields should show success styling

  # Image and Media Testing
  Scenario: Verify image quality and optimization
    Then all images should be properly optimized
    And images should load quickly
    And images should be clear and not pixelated
    And images should have appropriate alt text

  Scenario: Test video and media content
    When I play videos on the website
    Then videos should play smoothly
    And video controls should be accessible
    And videos should be properly responsive

  # Typography Testing
  Scenario: Verify typography consistency
    Then heading fonts should be consistent
    And body text should be readable
    And font sizes should be appropriate for different screen sizes
    And line spacing should be comfortable for reading

  # Color and Contrast Testing
  Scenario: Test color accessibility
    Then text should have sufficient contrast against backgrounds
    And color should not be the only way to convey information
    And interactive elements should be clearly distinguishable

  # Layout Testing
  Scenario: Test page layout structure
    Then the header should be properly positioned
    And the main content area should be well-organized
    And the footer should be properly positioned
    And the navigation should be easily accessible

  # User Experience Testing
  Scenario: Test user flow and navigation
    When I navigate through the website
    Then the navigation should be intuitive
    And I should be able to find information easily
    And the user journey should be smooth
    And there should be clear calls-to-action

  Scenario: Test loading states and feedback
    When I perform actions that require loading
    Then loading indicators should be displayed
    And users should receive appropriate feedback
    And the interface should remain responsive

  # Content Testing
  Scenario: Verify content presentation
    Then content should be well-organized
    And information should be easy to scan
    And important information should be prominently displayed
    And content should be up-to-date and accurate

  # Interactive Element Testing
  Scenario: Test dropdown menus and modals
    When I interact with dropdown menus
    Then menus should open and close smoothly
    And menu items should be easily selectable
    When I open modals or popups
    Then they should be properly positioned
    And they should be easily dismissible

  # Animation and Transition Testing
  Scenario: Test smooth animations
    When I navigate between pages
    Then transitions should be smooth
    When I hover over interactive elements
    Then animations should be subtle and not distracting
    And animations should enhance the user experience
