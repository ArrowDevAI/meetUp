import { useState } from "react";

const NumberOfEvents = () => {
 const [query, setQuery] = useState('');
 const [visibleEvents, setVisibleEvents] = useState(32)

 const handleInputChange = (event) => {
  const value = event.target.value;
  const numberValue = Number(value);
  if (!isNaN(numberValue) && numberValue > 0) {
    setVisibleEvents(numberValue);
  } else {
    setVisibleEvents(32); 
  }
  setQuery(value);
};

  return (
    <div id="events-loaded">
      <input
        id="eventsTextBox"
        type="text" 
        className="eventsLoaded"
        placeholder="Events per Page"
        value={query}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default NumberOfEvents;
