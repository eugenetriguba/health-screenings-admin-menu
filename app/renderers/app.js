import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import { OAuth, retrieveCredentials } from "../scripts/oauth";
import { google } from "googleapis";

let auth = new OAuth(retrieveCredentials()).oAuth2Client;
const calendar = google.calendar({version: 'v3', auth});
calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
}, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
            const start = event.start.dateTime || event.start.date;
            console.log(`${start} - ${event.summary}`);
        });
    } else {
        console.log('No upcoming events found.');
    }
});
