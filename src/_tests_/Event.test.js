import {render } from "@testing-library/react";
import Event from "../components/Event"
import { getEvents } from "../api";
import userEvent from "@testing-library/user-event";

describe('<Event/> Component', () => {
    let EventComponent;
    beforeEach(() => {
        EventComponent = render(<Event event={{}} />);
        ({ rerender } = EventComponent);
    });
    test('event has a button', async () => {
        let allEvents = await getEvents();
        const event = allEvents[0];
        rerender (<Event event = {event}/>)

        const detailsButton = EventComponent.getAllByTestId('details-button');
        expect(detailsButton).toHaveLength(1);
        expect(detailsButton[0]).toBeInTheDocument();

    });
    test('event has a title', async () => {
        let allEvents = await getEvents();
        const event = allEvents[0];
        rerender (<Event event = {event}/>)

        const title = EventComponent.getByTestId('title');
        expect(title).toBeInTheDocument();
        expect(title).toHaveTextContent(event.summary);

    });

    test('initially event is shown with no details and button reads "Show Details" ', async () => {
        let allEvents = await getEvents();
        const event = allEvents[0];
        rerender (<Event event = {event}/>)

        const detailsButton = EventComponent.getAllByTestId('details-button');
        expect(detailsButton).toHaveLength(1);
        expect(detailsButton[0]).toBeInTheDocument();

        expect(detailsButton[0]).toHaveTextContent('Show Details');
    
        const eventDetails = EventComponent.queryByTestId('event-details');
        expect(eventDetails).not.toBeInTheDocument();
   
      });


      test('shows event details when "Show Details" button is clicked', async () => {
        let user = userEvent.setup();
        let allEvents = await getEvents();
        const event = allEvents[0];
        rerender (<Event event = {event}/>)

        const detailsButton = EventComponent.getAllByTestId('details-button');
    
        await user.click(detailsButton[0]);
        expect(detailsButton[0]).toHaveTextContent("Hide Details");
        const eventDetails = await EventComponent.findByTestId('event-details');
        expect(eventDetails).toBeInTheDocument();
        expect(eventDetails.textContent).toContain(event.description);
        expect(eventDetails.textContent).toContain(event.location);
        expect(eventDetails.textContent).toContain(event.created);

      });

      test('hides event details when "Hide Detail" button is clicked', async () => {
        let user = userEvent.setup();
        let allEvents = await getEvents();
        const event = allEvents[0];
        rerender (<Event event = {event}/>)

        const detailsButton = EventComponent.getAllByTestId('details-button');
    
        await user.click(detailsButton[0]);

        expect(detailsButton[0]).toHaveTextContent("Hide Details");
        const eventDetails = await EventComponent.findByTestId('event-details');
        expect(eventDetails).toBeInTheDocument();
        expect(eventDetails.textContent).toContain(event.description);
        expect(eventDetails.textContent).toContain(event.location);
        expect(eventDetails.textContent).toContain(event.created);

        await user.click(detailsButton[0]);
    
        expect(eventDetails).not.toBeInTheDocument();
    
      });
});

