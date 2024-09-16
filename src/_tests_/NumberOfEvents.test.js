// src/__tests__/NumberOfEvents.test.js

import { render, within, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';
import EventList from '../components/EventList';
import { getEvents } from '../api';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents/>);
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  test('default number is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  test('number of events text box value changes when the user types in it', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE= {() => { }}
    />)
    await user.type(numberTextBox, "123")
    expect(numberTextBox).toHaveValue("32123");
  });
});

describe('<NumberOfEvents /> integration', () => {
  test('renders number of events that user has specified in input', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App/>)
    const AppDOM = AppComponent.container.firstChild
    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events')
    const numberTextBox = within(NumberOfEventsDOM).queryByRole('textbox');
    const EventListComponent = render (<EventList/>)
    const EventListDOM = AppComponent.container.querySelector('#event-list')

    await user.clear(numberTextBox);
    await user.type(numberTextBox, '3');

    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList allEvents = {allEvents}/>)
    const eventsLoaded = within(EventListDOM).queryAllByRole('listitem')
    expect(eventsLoaded.length).toBe(3);

    const clearButton = within(NumberOfEventsDOM).queryByRole('button')
    expect(clearButton).toBeInTheDocument();

    await user.click(clearButton);

    await waitFor(() => {
      const eventsLoadedAfterClear = within(EventListDOM).queryAllByRole('listitem');
      expect(eventsLoadedAfterClear.length).toBe(32);
    });

    await user.type(numberTextBox, '3');
    expect(eventsLoaded.length).toBe(3);
  });
});