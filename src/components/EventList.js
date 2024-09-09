import Event from "./Event";

const EventList = ({ events, visibleEvents }) => {
  const eventsToRender = events?.slice(0, visibleEvents || 32); 

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