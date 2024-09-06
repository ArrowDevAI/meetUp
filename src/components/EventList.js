import Event from "./Event";

const EventList = ({ events, visibleEvents }) => {
  // Use the visibleEvents number to determine how many events to render
  const eventsToRender = events?.slice(0, visibleEvents || 32); // Default to 32 if visibleEvents is not provided

  return (
    <ul id="event-list">
      {eventsToRender
        ? eventsToRender.map((event) => (
            <Event key={event.id} event={event} />
          ))
        : null}
    </ul>
  );
};

export default EventList;