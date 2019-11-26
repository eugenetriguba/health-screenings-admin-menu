import path from "path";
import jetpack from "fs-jetpack";
import url from "url";
import {app, Menu} from "electron";
import {devMenuTemplate} from "./menu/dev_menu_template";
import {editMenuTemplate} from "./menu/edit_menu_template";
import createWindow from "./helpers/window";
import env from "env";

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

app.on("ready", () => {
    setApplicationMenu();

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

/**
 * Determine the starting page based on if we've already
 * authenticated with the calendar api yet.
 *
 * @return {string} The path of the starting page
 */
function determineStartingPage() {
    let appPagePath = path.join(__dirname, "../app/views/app.html");
    let oAuthPagePath = path.join(__dirname, "../app/views/oauth.html");
    let tokenPath = path.join(__dirname, "../config/token.json");

    if (jetpack.exists(tokenPath)) {
        return appPagePath;
    }

    return oAuthPagePath;
}
