// src/App.js

import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import { InfoAlert } from './components/Alert';
import { ErrorAlert } from './components/Alert';
import { WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';
import { EventGenresChart } from './components/EventGenresChart';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState ("");
  const [warningAlert, setWarningAlert] = useState("");

  const fetchData = async () => {
    const allEvents = await getEvents();

    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  }
  useEffect(() => {
    const updateOnlineStatus = () => {
      setWarningAlert(navigator.onLine ? "" : "This application is currently offline");
    };

    updateOnlineStatus(); 
  
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
  
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  useEffect(() => {

    fetchData();
  }, [currentCity, currentNOE]);



  return (
    <div className="App">
      <div className = 'alerts-container'>
        {infoAlert.length ? <InfoAlert text = {infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text = {errorAlert}/> : null}
        {warningAlert.length? <WarningAlert text = {warningAlert} /> : null}
      </div>      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert = {setInfoAlert} />
      <NumberOfEvents currentNOE = {currentNOE} setCurrentNOE = {setCurrentNOE} setErrorAlert = {setErrorAlert} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventGenresChart events={events} />
      </div>
      <EventList events={events} />
    </div>
  );
}

export default App;