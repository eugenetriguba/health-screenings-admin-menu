import "./stylesheets/main.css";
import "./helpers/context_menu.js";
import { remote } from "electron";
import { OAuth, retrieveCredentials } from "./scripts/auth/oauth";

let auth = new OAuth(retrieveCredentials());
let authUrl = auth.generateAuthUrl();
let authUrlLink = document.querySelector('#calendar-api-authorization-url');
authUrlLink.href = authUrl;
authUrlLink.innerHTML = authUrl;

document.querySelector('button[type=submit]').addEventListener('click', () => {
    let code = document.querySelector('#code').value;
    auth.getToken(code);
    remote.getCurrentWindow().loadURL(`file://${__dirname}/app.html`);
});
