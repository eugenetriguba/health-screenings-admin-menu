import { google } from "googleapis";
import { OAuth } from "./oauth";

export class CalendarApi {

    constructor() {
        this.auth = new OAuth();
    }

    /**
     * Lists the next maxEvents events on the user's calendarId calendar.
     */
    events(callback, maxEvents=10, calendarId='primary', orderBy='startTime') {
        let oAuth2Client = this.auth.oAuth2Client;
        const calendar = google.calendar({
            version: 'v3',
            oAuth2Client
        });
        console.log(calendar);

        calendar.events.list({
            calendarId: calendarId,
            timeMin: (new Date()).toISOString(),
            maxResults: maxEvents,
            singleEvents: true,
            orderBy: orderBy,
        }, (error, res) => {
            if (error) {
                return console.log('The API returned an error: ' + error);
            }
            const events = res.data.items;
            callback(res.data.items);
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

}
