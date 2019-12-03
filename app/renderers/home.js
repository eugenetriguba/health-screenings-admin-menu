import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import jetpack from 'fs-jetpack';
import { remote } from 'electron';
const { google } = require('googleapis');

let credentials = jetpack.read(remote.app.getAppPath() + '/config/credentials.json', 'json').installed;
let token = jetpack.read(remote.app.getAppPath() + '/config/token.json', 'json');
let oAuth2Client = new google.auth.OAuth2(
    credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]
);
oAuth2Client.setCredentials(token);
listEvents((events) => {
    document.querySelector('#events').innerHTML = JSON.stringify(events);
}, oAuth2Client);


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(callback, auth) {
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
        callback(events);
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
}
