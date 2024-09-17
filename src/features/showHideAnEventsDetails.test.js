import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

    test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppComponent;
    let EventListDOM;
    let AppDOM;
        given('user is viewing a list of events', async () => {
        AppComponent = render (<App/>)
        AppDOM = AppComponent.container.firstChild
        EventListDOM = AppDOM.querySelector('#event-list')
        await waitFor(() => {
            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            expect(EventListItems.length).toBe(32);
          });
    
        });

        when('the events are displayed', async () => {

        });

        then('each events details should be collapsed by default',  () => {

            const EventListItems = within(EventListDOM).queryAllByRole('listitem');
            const firstEvent = EventListItems[0];
            const detailsButton = within(firstEvent).queryByRole('button');
            expect(detailsButton).toHaveTextContent('Show Details');
          
          
        });
    });

    test('User can expand an event to see details.', ({ given, when, then }) => {
        let AppComponent;
        let EventListDOM;
        let AppDOM;
        let user;
        let detailsButton;
        given('the user is viewing a list of events', async () => {
            AppComponent = render (<App/>)
            AppDOM = AppComponent.container.firstChild
            EventListDOM = AppDOM.querySelector('#event-list')
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                const firstEvent = EventListItems[0];
               detailsButton = within(firstEvent).queryByRole('button');
              });
        });

        when('the user clicks on an events Show Details button', async () => {
            user = userEvent.setup();
           await user.click(detailsButton)
              
        });

        then('the event details should be displayed', () => {
            expect(detailsButton).toHaveTextContent('Hide Details');
        });
    });

    
    test('User can collapse an event to hide details.', ({ given, and, when, then }) => {
        let AppComponent;
        let EventListDOM;
        let AppDOM;
        let user;
        let detailsButton;
        given('user is viewing a list of events', async () => {
            AppComponent = render (<App/>)
            AppDOM = AppComponent.container.firstChild
            EventListDOM = AppDOM.querySelector('#event-list')
            await waitFor(() => {
                const EventListItems = within(EventListDOM).queryAllByRole('listitem');
                const firstEvent = EventListItems[0];
               detailsButton = within(firstEvent).queryByRole('button');
              });
        });

        and('one of the events details is expanded', async () => {
            user = userEvent.setup();
            await user.click(detailsButton)
        });

        when('the user clicks the Hide Details button', async () => {
            await user.click(detailsButton)
        });

        then('the event details should be hidden', () => {
            expect(detailsButton).toHaveTextContent('Show Details');
        });
    });
        });