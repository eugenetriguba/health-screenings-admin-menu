import electron from "electron";
import { Application } from "spectron";
import jetpack from "fs-jetpack";

const TEST_FOLDER_PATH = jetpack.path('./tests/');
const DATA_FOLDER_PATH = TEST_FOLDER_PATH + '/data';

const beforeEach = function () {
    this.app = new Application({
        path: electron,
        args: ["."]
    });
    return this.app.start();
};

const afterEach = function () {
    if (this.app && this.app.isRunning()) {
        return this.app.stop();
    }
    return undefined;
};

export default {
    beforeEach,
    afterEach,
    TEST_FOLDER_PATH,
    DATA_FOLDER_PATH
};
