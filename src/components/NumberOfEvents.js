
import { useState, useEffect } from "react";

const NumberOfEvents = ({setCurrentNOE, setErrorAlert}) => {

  const [number, setNumber] = useState(32);

  const handleInputChanged = (event) => {
    let value = event.target.value; 
    setNumber(value);
    setCurrentNOE(value);
  
  }
  useEffect(() => {
    let errorText;
   
    if (isNaN(number) || number <= 0) {
      errorText = "Please Enter a Valid Number";
    } else {
      errorText = "";
    }

    setErrorAlert(errorText);
  }, [number, setErrorAlert]);


  const clearInput = () => {
    setNumber('')
    setCurrentNOE('32')
  };

  return (
    <div id="number-of-events">
      <label htmlFor="number-of-events-input">Number of Events: </label>
      <input
        type="text"
        id="number-of-events-input"
        className="number-of-events-input"
        value={number}
        placeholder="Enter Number Value"
        onChange={handleInputChanged}
      />
      <button id = "clear-button"onClick={clearInput} style={{ marginLeft: '10px' }}>
        Clear
      </button>
    </div>
  );
}

export default NumberOfEvents;