/**
 * Background.js is the main electron process.
 * @see https://electronjs.org/docs/tutorial/application-architecture
 */

import url from "url";
import path from "path";
import jetpack from "fs-jetpack";
import setupPug from 'electron-pug';
import { app, Menu } from "electron";
import { devMenuTemplate } from "./menu/dev_menu_template";
import { editMenuTemplate } from "./menu/edit_menu_template";
import createWindow from "./helpers/window";
import env from "env";

/**
 * Determine the starting page based on if we've already
 * authenticated with the calendar api yet.
 *
 * @return {string} The path of the starting page
 */
function determineStartingPage() {
    let appPagePath = path.join(__dirname, "../app/views/home.pug");
    let oAuthPagePath = path.join(__dirname, "../app/views/auth.pug");
    let tokenPath = path.join(__dirname, "../config/token.json");

    let token = jetpack.read(tokenPath, 'json');

    if (jetpack.exists(tokenPath) && token !== null) {
        return appPagePath;
    }

    return oAuthPagePath;
}

const setApplicationMenu = () => {
    const menus = [editMenuTemplate];
    if (env.name !== "production") {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== "production") {
    const userDataPath = app.getPath("userData");
    app.setPath("userData", `${userDataPath} (${env.name})`);
}

app.on("ready", async () => {
    setApplicationMenu();

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
            nodeIntegration: true,
            webSecurity: false
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
