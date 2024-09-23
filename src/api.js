import mockData from "./mock-data";
import nProgress from "nprogress";

export const getEvents = async () => {
  nProgress.start();
  
  if (window.location.href.startsWith("http://localhost")) {
    nProgress.done();
    return mockData;
  }
  
  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    nProgress.done();
    console.log("Last Events from Local Storage:", events ? JSON.parse(events) : []);
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = "https://8gilx17aye.execute-api.us-east-1.amazonaws.com/dev/api/get-events/" + token;
    const response = await fetch(url);
    const result = await response.json();
    
    if (result) {
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      console.log("Last Events Stored in Local Storage:", result.events); // Log the events being stored
      nProgress.done();
      return result.events;
    } else return null;
  }
};
