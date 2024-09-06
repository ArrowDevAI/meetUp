import { render } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";

describe('<EventList/> component', () => {
    let EventListComponent;
    let rerender;
    
    beforeEach(() => {
        EventListComponent = render(<EventList events={[]} />);
        ({ rerender } = EventListComponent);
    });

    test('has an element with "list" role', () => {
        expect(EventListComponent.getByRole("list")).toBeInTheDocument();
      });

    test('renders the correct number of events based on visibleEvents prop', async () => {
   
        const allEvents = await getEvents();
        const visibleEvents = 32;
        rerender(<EventList events={allEvents} visibleEvents={visibleEvents} />);

        const eventComponents = EventListComponent.queryAllByTestId('event-component');
        
        expect(eventComponents).toHaveLength(visibleEvents);
        console.log("All visible Events: ", visibleEvents)
    });


    test('renders all events if visibleEvents prop is not passed', async () => {
        const allEvents = await getEvents();
        rerender(<EventList events={allEvents} />);
        const eventComponents = EventListComponent.queryAllByTestId('event-component');

        expect(eventComponents).toHaveLength(Math.min(allEvents.length, 32)); 
        console.log('All Events Total: ', allEvents.length);
    });
});
