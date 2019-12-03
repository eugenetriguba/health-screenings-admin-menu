import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import { CalendarApi } from "../scripts/calendar-api";

new CalendarApi().events((events) => {
    console.log(events);
    document.querySelector('#events').innerHTML = events;
});
