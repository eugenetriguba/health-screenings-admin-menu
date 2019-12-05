import path from "path";
import env from "env";
import jetpack from "fs-jetpack";
import settings from "electron-settings";
import { editMenuTemplate } from "../menu/edit_menu_template";
import { devMenuTemplate } from "../menu/dev_menu_template";
import { Menu , ipcMain } from "electron";

/**
 * Sets up Inter-process communication events
 * for the main electron process.
 */
export function setupIpcEvents() {
    // WIP
}

/**
 * Determine the starting page based on if we've already
 * authenticated with the calendar api yet.
 *
 * @return {string} The path of the starting page
 */
export function determineStartingPage() {
    let appPagePath = path.join(__dirname, "../app/views/home.pug");
    let oAuthPagePath = path.join(__dirname, "../app/views/auth.pug");
    let tokenPath = path.join(__dirname, "../config/token.json");

    let token = jetpack.read(tokenPath, 'json');

    if (jetpack.exists(tokenPath) && token !== null) {
        return appPagePath;
    }

    return oAuthPagePath;
}

export function setApplicationMenu() {
    const menus = [editMenuTemplate];
    if (env.name !== "production") {
        menus.push(devMenuTemplate);
    }
    Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
}
