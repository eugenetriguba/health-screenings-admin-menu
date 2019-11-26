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
