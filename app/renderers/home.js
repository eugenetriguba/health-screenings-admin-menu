import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import jetpack from 'fs-jetpack';
import settings from 'electron-settings';
import { remote } from 'electron';
const { google } = require('googleapis');

let credentials = jetpack.read(remote.app.getAppPath() + '/config/credentials.json', 'json').installed;
let token = jetpack.read(remote.app.getAppPath() + '/config/token.json', 'json');
let oAuth2Client = new google.auth.OAuth2(
    credentials.client_id, credentials.client_secret, credentials.redirect_uris[0]
);
oAuth2Client.setCredentials(token);

listEvents((events) => {
    if (events.length) {
        document.querySelector('#status').innerHTML = `Here are your upcoming ${events.length} events.`;
        let eventsList = document.querySelector("#events");
        events.map((event, i) => {
            const date = new Date(event.start.dateTime || event.start.date);

            // Date formatted and padded with zeros
            var dateFormatted = ("0" + date.getDate()).slice(-2) + "-" + ("0"+(date.getMonth()+1)).slice(-2) + "-" +
                date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

            let item = document.createElement("li");
            item.setAttribute('class', 'list-disc ml-8');
            item.appendChild(document.createTextNode(`${dateFormatted} - ${event.summary}`));
            eventsList.appendChild(item);
        });
    } else {
        document.querySelector('#status').innerHTML = "No upcoming events found.";
    }
}, oAuth2Client);


/**
 * Lists the next 10 events from the user's calendar that they
 * specified in the settings.
 *
 * @param {function} callback - Passed in the events
 * @param {google.auth.OAuth2} auth - An authorized OAuth2 client.
 */
function listEvents(callback, auth) {
    const calendar = google.calendar({
        version: 'v3',
        auth
    });
    calendar.events.list({
        calendarId: settings.get('calendar.id'),
        timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }, (err, res) => {
        if (err) {
            return console.log('The API returned an error: ' + err);
        }

        callback(res.data.items);
    });
}
