import "../stylesheets/main.css";
import "../helpers/context_menu.js";
import { remote } from "electron";
import OAuth from "../scripts/oauth";

let auth = new OAuth();
let authUrl = auth.generateAuthUrl();
let authUrlLink = document.querySelector('#calendar-api-authorization-url');
authUrlLink.href = authUrl;
authUrlLink.innerHTML = authUrl;

document.querySelector('#submit-auth-code').addEventListener('click', () => {
    let code = document.querySelector('#code').value;
    auth.generateToken(code, () => {
        remote.getCurrentWindow().loadURL(`file://${__dirname}/home.pug`);
    });
});
