Feature: Specify Number of Events
  Scenario: When user hasn’t specified a number, 32 events are shown by default.
    Given user has not specified the number of events to display
    When all events are displayed
    Then thirty two events should be shown by default

  Scenario: User can change the number of events displayed.
    Given the user wants to change the number of events displayed
    When the user specifies a number of events in the input
    Then the specified number of events should be displayed 
 