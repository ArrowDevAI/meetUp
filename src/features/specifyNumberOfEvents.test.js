
import { loadFeature, defineFeature } from 'jest-cucumber';
import { getEvents } from '../api';
import { render, within, waitFor } from '@testing-library/react';
import { act } from 'react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {

    test('When user hasn’t specified a number, 32 events are shown by default.', ({ given, when, then }) => {
        let AppComponent;
        let EventListDOM;
        let AppDOM;
        let EventListItems;
        given('user has not specified the number of events to display', () => {

        });

        when('all events are displayed', async() => {
        let allEvents = await getEvents();
        AppComponent = render (<App/>)
        AppDOM = AppComponent.container.firstChild
        EventListDOM = AppDOM.querySelector('#event-list')
        await waitFor(() => {
            EventListItems = within(EventListDOM).queryAllByRole('listitem');
          });
          
        });

        then('thirty two events should be shown by default', async () => {
            let allEvents = await getEvents();
            AppComponent = render (<App/>)
            AppDOM = AppComponent.container.firstChild
            EventListDOM = AppDOM.querySelector('#event-list')
            await waitFor(() => {
                 EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(allEvents.length);
            });
        });
    });

    test('User can change the number of events displayed.', ({ given, when, then }) => {
        let AppComponent;
        let AppDOM;
        let NumberOfEventsDOM;
        let user;
        let eventsTextBox;
        given('the user wants to change the number of events displayed', () => {
           
        });

        when('the user specifies a number of events in the input', async () => {
            user = userEvent.setup();
            AppComponent = render (<App/>);
            AppDOM = AppComponent.container.firstChild;
            
            NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
            eventsTextBox = within(NumberOfEventsDOM).queryByRole('textbox');
           
                await user.clear(eventsTextBox);
                await user.type(eventsTextBox, '5');
         
           
          
        });

        then('the specified number of events should be displayed', async () => {

            const allEvents = await getEvents();
            AppComponent.rerender(<App allEvents={allEvents} />);
            const numberOfEventsText = eventsTextBox.value;
            const numberOfEvents = parseInt(numberOfEventsText, 10);

            // Ensure the number of displayed events matches the input
            const EventListDOM = AppDOM.querySelector('#event-list');

            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                expect(EventListItems.length).toBe(numberOfEvents);
            
            });
        });
    });

});