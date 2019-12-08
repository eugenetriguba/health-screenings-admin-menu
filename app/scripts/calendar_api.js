import settings from "electron-settings";
import { google } from "googleapis";
import OAuth from "./oauth";

export default class CalendarApi {
    constructor() {
        this.auth = new OAuth();
        this.tokenExpirationTime = new Date(this.auth.token.expiry_date);
    }

    /**
     * Retrieves events from the Google Calendar API.
     *
     * The second argument is an optional object utilizing parameter
     * destructuring to allow optional named arguments to tailor
     * the api results.
     *
     * @param {function} callback - Receives the events as an argument
     *
     * @param {string} calendarId
     * @param {int} maxResults
     * @param {string} timeMin
     * @param {boolean} singleEvents
     * @param {string} orderBy
     */
    events(
        callback,
        {
            calendarId = settings.get("calendar.id"),
            maxResults = 10,
            timeMin = new Date().toISOString(),
            singleEvents = true,
            orderBy = "startTime"
        } = {}
    ) {
        if (this.tokenExpirationTime.getTime() < new Date().getTime()) {
            this.auth.refreshToken();
        }

        let auth = this.auth.oAuth2Client;
        const calendar = google.calendar({
            version: "v3",
            auth
        });
        calendar.events.list(
            {
                calendarId: calendarId,
                timeMin: timeMin,
                maxResults: maxResults,
                singleEvents: singleEvents,
                orderBy: orderBy
            },
            (err, res) => {
                if (err) {
                    throw Error(
                        "Error retrieving events from the calendar api: " + err
                    );
                }

                callback(res.data.items);
            }
        );
    }
}
