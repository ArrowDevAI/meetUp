// src/components/NumberOfEvents.js

import { useState } from "react";

const NumberOfEvents = ({setCurrentNOE}) => {

  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);
  }

  const clearInput = () => {
    setNumber('');
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        onChange={handleInputChanged}
      />
      <button onClick={clearInput} style={{ marginLeft: '10px' }}>
        Clear
      </button>
    </div>
  );
}

export default NumberOfEvents;