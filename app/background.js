/**
 * Background.js is the main electron process.
 * @see https://electronjs.org/docs/tutorial/application-architecture
 */

import { app } from "electron";
import env from "env";
import url from "url";
import setupPug from 'electron-pug';
import { setApplicationMenu, determineStartingPage } from './helpers/startup';
import createWindow from "./helpers/window";

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
    const userDataPath = app.getPath("userData");
    app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", async () => {
    setApplicationMenu();

    // Setup the pug file translator
    try {
        let pug = await setupPug({pretty: true});
        pug.on('error', err => console.error('electron-pug error', err))
    } catch (err) {
        // Could not initiate 'electron-pug'
    }

    const mainWindow = createWindow("main", {
        width: 1000,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: determineStartingPage(),
            protocol: "file:",
            slashes: true
        })
    );

    if (env.name === "development") {
        mainWindow.openDevTools();
    }
});

app.on("window-all-closed", () => {
    app.quit();
});
