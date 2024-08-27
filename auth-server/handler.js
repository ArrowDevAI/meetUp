'use strict';

const {google} = require("googleapis");
const calendar = google.calendar("v3");
const SCOPES = ["https://www.googleapis.com/auth/calendar.events.public.readonly"];
const {CLIENT_SECRET, CLIENT_ID, CALENDAR_ID} = process.env;
const redirect_uris = ["https://ArrowDevAI.github.io/meetUp"];
const oAuth2Client = new google.auth.OAuth2 ( CLIENT_ID, CLIENT_SECRET, redirect_uris[0] );

module.exports.getAuthURL = async () => {
    const authURL = oAuth2Client.generateAuthUrl({
access_type: "offline",
scope: SCOPES,
    });

    return{
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin' : '*', // this is used for the CORS policy '*' will allow all origins...
        'Access-Control-Allow-Credentials' : true,
      },
      body : JSON.stringify({
        authURL,
      }),
    };
  };

  module.exports.getAccessToken = async (event) => {
    const code = decodeURIComponent(`${event.pathParameters.code}`)

    return new Promise ((resolve, reject) => {
oAuth2Client.getToken(code, (error, response) => {
  if (error) {
    return reject(error);
  }
    return resolve(response);
});
    })
    .then ((results) => {
      return {
      statusCode: 200,
      headers: {
      'Access-Control-Allow-Origin' : '*',
      'Access-Control-Allow-Credentials' : true,
      },
      body: JSON.stringify(results),
    };
    })
    .catch((error) => {
      return {
        statusCode: 500,
        body: JSON.stringify(error),
      };
    });
  }