import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import CalendarApi from "../scripts/calendar_api";

let calendar = new CalendarApi();

calendar.events(events => {
    if (events.length) {
        document.querySelector(
            "#status"
        ).innerHTML = `Here are your upcoming ${events.length} events.`;
        let eventsList = document.querySelector("#events");
        events.map(event => {
            const date = new Date(event.start.dateTime || event.start.date);

            // Date formatted and padded with zeros
            var dateFormatted =
                ("0" + date.getDate()).slice(-2) +
                "-" +
                ("0" + (date.getMonth() + 1)).slice(-2) +
                "-" +
                date.getFullYear() +
                " " +
                ("0" + date.getHours()).slice(-2) +
                ":" +
                ("0" + date.getMinutes()).slice(-2);

            let item = document.createElement("li");
            item.setAttribute("class", "list-disc ml-8");
            item.appendChild(
                document.createTextNode(`${dateFormatted} - ${event.summary}`)
            );
            eventsList.appendChild(item);
        });
    } else {
        document.querySelector("#status").innerHTML =
            "No upcoming events found.";
    }
});
