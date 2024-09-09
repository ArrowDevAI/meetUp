//Components Imported
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';

//Funcions Imported
import React, { useState, useEffect } from 'react';
import { extractLocations, getEvents } from './api';
import {visibleEvents} from './components/NumberOfEvents';


import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);

useEffect(()=>{
  async function fetchEvents () {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);

    }
    catch (error) {
      console.log(error)
    }
  }
  fetchEvents();
  
},[]);

 return (
   <div className="App">
     <CitySearch extractLocations = {extractLocations}/>
     <EventList events = {events} visibleEvents={visibleEvents}/>
     <NumberOfEvents/> 
   </div>
 );

}

export default App;