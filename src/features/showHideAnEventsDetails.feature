Feature: Show/Hide Event Details
  Scenario:An event element is collapsed by default.
    Given user is viewing a list of events
    When the events are displayed
    Then each events details should be collapsed by default 

  Scenario: User can expand an event to see details.
    Given the user is viewing a list of events
    When the user clicks on an events Show Details button
    Then the event details should be displayed


  Scenario: User can collapse an event to hide details.
    Given user is viewing a list of events
    And one of the events details is expanded
    When the user clicks the Hide Details button
    Then the event details should be hidden

