import "./stylesheets/main.css";
import "./helpers/context_menu.js";
import { remote } from "electron";
import jetpack from "fs-jetpack";
import env from "env";

const app = remote.app;
const appDirectory = jetpack.cwd(app.getAppPath());
const manifest = appDirectory.read("package.json", "json");

