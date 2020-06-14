import settings from "electron-settings";
import { google } from "googleapis";
import OAuth from "./oauth";

let S = require("string");

export default class CalendarApi {
    constructor() {
        this.auth = new OAuth();

        let auth = this.auth.oAuth2Client;
        this.calendar = google.calendar({
            version: "v3",
            auth,
        });
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
            orderBy = "startTime",
        } = {}
    ) {
        this.calendar.events.list(
            {
                calendarId: calendarId,
                timeMin: timeMin,
                maxResults: maxResults,
                singleEvents: singleEvents,
                orderBy: orderBy,
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

    /**
     * Parse the description for a screening event
     *
     * @param {Object} event
     * @return {Object}
     *
     * {
     *     screeningName: '',
     *     meetingLocation: '',
     *     firstName: '',
     *     lastName: '',
     *     email: ''
     * }
     */
    parseDescription(event) {
        let parsed = {
            screeningName: "",
            meetingLocation: "",
            firstName: "",
            lastName: "",
            email: "",
        };

        let description = S(event.description).lines();

        description.forEach((line, index) => {
            if (
                line.includes("Meeting Location") &&
                parsed.meetingLocation === ""
            ) {
                parsed.meetingLocation = description[index + 1].trim();
            } else if (
                line.includes("Screening") &&
                parsed.screeningName === ""
            ) {
                parsed.screeningName = description[index + 1].trim();
            } else if (line.includes("Customer Information")) {
                parsed.email = description[index + 1]
                    .replace("Email:", "")
                    .trim();
                parsed.firstName = description[index + 2]
                    .replace("First Name:", "")
                    .trim();
                parsed.lastName = description[index + 3]
                    .replace("Last Name:", "")
                    .trim();
            }
        });

        return parsed;
    }
}
