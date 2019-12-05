import settings from "electron-settings";

let form = document.querySelector("#settings-form");

if (form.attachEvent) {
    form.attachEvent("submit", saveSettings());
} else {
    form.addEventListener("submit", saveSettings);
}

if (!settings.get('calendar.id')) {
    settings.set('calendar.id', 'primary');
}

document.querySelector("#calendar-id").value = settings.get('calendar.id');

function saveSettings(event) {
    if (event.preventDefault) {
        event.preventDefault();
    }

    let calendarId = document.querySelector("#calendar-id").value;

    if (!calendarId) {
        calendarId = 'primary';
    }

    settings.set('calendar.id', calendarId);
    console.log(`Set the calendar id to ${calendarId}!`);

    // false must be returned to prevent the default form behavior
    return false;
}
