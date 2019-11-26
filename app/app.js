import "./stylesheets/main.css";
import "./helpers/context_menu.js";
import { remote } from "electron";
import { OAuth, retrieveCredentials } from "./auth/oauth";

const app = remote.app;
const appDirectory = app.getAppPath();
const credentials = retrieveCredentials();
const auth = new OAuth(credentials);

let authUrl = auth.generateAuthUrl();
let authUrlLink = document.querySelector('#calendar-api-authorization-url');
authUrlLink.href = authUrl;
authUrlLink.innerHTML = authUrl;

document.querySelector('button[type=submit]').addEventListener('click', () => {
    let code = document.querySelector('#code').value;
    auth.getToken(code);
    remote.getCurrentWindow().loadURL(`file://${__dirname}/app.html`);
});
