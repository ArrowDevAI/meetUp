// src/__tests__/Event.test.js

import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import Event from '../components/Event';

describe('<Event /> component', () => {
  let EventComponent;
  let allEvents;
  beforeEach(async () => {
    allEvents = await getEvents();
    EventComponent = render(<Event event={allEvents[0]} />)
  });

  test('renders event Title', () => {
    expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    expect(EventComponent.queryByTestId('event-details')).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
    await user.click(EventComponent.queryByText('Show Details'));

    expect(EventComponent.queryByTestId('event-details')).toBeInTheDocument();
    expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    expect(EventComponent.queryByText('Show Details')).not.toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();

    await user.click(EventComponent.queryByText('Show Details'));
    expect(EventComponent.queryByTestId('event-details')).toBeInTheDocument();
    expect(EventComponent.queryByText('Hide Details')).toBeInTheDocument();
    expect(EventComponent.queryByText('Show Details')).not.toBeInTheDocument();

    await user.click(EventComponent.queryByText('Hide Details'));
    expect(EventComponent.queryByTestId('event-details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Hide Details')).not.toBeInTheDocument();
    expect(EventComponent.queryByText('Show Details')).toBeInTheDocument();
  });
});

