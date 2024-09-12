import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <li data-testid = 'event-component' id ="event-component">
      <div>
        <h1 data-testid = 'title'>{event.summary}</h1>
        <p><strong>Location: </strong> {event.location}</p>
        <p>{event && (new Date(event.created)).toUTCString()}</p>
      </div>
      <button data-testid = 'details-button' id="details-button" onClick={toggleDetails}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      
      {showDetails && (
      <section data-testid="event-details">
        <h3>About Event</h3><br></br>
        <p><strong>Summary: </strong> {event.description}</p><br></br>
        <p><strong>Start: </strong> {event.created}</p><br></br>
       
      </section>
      )}
    </li>
  );
};

export default Event;