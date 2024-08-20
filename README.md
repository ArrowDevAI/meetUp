# meetUp

## Description
`meetUp` is an application designed to help users find and manage upcoming events in various cities. This README provides an overview of the application’s features and outlines the behavior of each feature using Gherkin syntax for behavior-driven development.

## Features and Scenarios

### 1. Filter Events By City

**Scenario 1:** When user hasn’t searched for a city, show upcoming events from all cities.

Given the user has not searched for a city
When the user views the list of events
Then the user should see upcoming events from all cities

**Scenario 2:** User should see a list of suggestions when they search for a city.

Given the user is on the search page
When the user types in the search bar to search for a city
Then the user should see a list of city suggestions

**Scenario 3:** User can select a city from the suggested list.

Given the user is presented with a list of city suggestions
When the user selects a city from the list
Then the user should see events filtered by the selected city


### Feature 2: Show/Hide Event Details

**Scenario 1:** An event element is collapsed by default.

Given the user is viewing a list of events
When the events are displayed
Then each event's details should be collapsed by default

**Scenario 2:** User can expand an event to see details.

Given the user is viewing a list of events
When the user clicks on an event's expand button
Then the event details should be displayed

**Scenario 3:** User can collapse an event to hide details.

Given the user has expanded an event's details
When the user clicks on the event's collapse button
Then the event details should be hidden

### Feature 3: Specify Number of Events

**Scenario 1:** When user hasn’t specified a number, 32 events are shown by default.

Given the user has not specified the number of events to display
When the events are displayed
Then 32 events should be shown by default

**Scenario 2:** User can change the number of events displayed.

Given the user wants to change the number of events displayed
When the user specifies a number of events
Then the specified number of events should be displayed

### Feature 4: Use the App When Offline

**Scenario 1:** Show cached data when there’s no internet connection.

Given the user has previously accessed the app with an internet connection
And the app has cached data
When the user opens the app without an internet connection
Then the app should display the cached data

**Scenario 2:** Show error when user changes search settings (city, number of events).

Given the user is offline
When the user attempts to change the search settings
Then the app should display an error message indicating no internet connection


### Feature 5: Add an App Shortcut to the Home Screen

**Scenario 1:** User can install the meet app as a shortcut on their device home screen.

Given the user is using the app on a compatible device
When the app prompts the user to add a shortcut to the home screen
Then the user should be able to install the meet app as a home screen shortcut

### Feature 6: Display Charts Visualizing Event Details

**Scenario 1:** Show a chart with the number of upcoming events in each city.

Given the user is viewing the app's dashboard
When the user has events available for multiple cities
Then the app should display a chart showing the number of upcoming events in each city
