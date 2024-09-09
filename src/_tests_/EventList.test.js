import { render, within, waitFor } from "@testing-library/react";
import EventList from "../components/EventList";
import { getEvents } from "../api";
import App from "../App";

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
    });



describe('<EventList/> integraion', () => {
        let EventListComponent;
        let rerender;
        
        beforeEach(() => {
            EventListComponent = render(<EventList events={[]} />);
            ({ rerender } = EventListComponent);
        });

      
        test('renders a list of 32 events when the app is mounted and rendered', async () => {
            const AppComponent = render(<App />);
            const AppDOM = AppComponent.container.firstChild;
            const EventListDOM = AppDOM.querySelector('#event-list');
            await waitFor(() => {
              const EventListItems = within(EventListDOM).queryAllByRole('listitem');
              expect(EventListItems.length).toBe(32);
            });
          });

});
