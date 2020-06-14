import jetpack from "fs-jetpack";
import { google } from "googleapis";
import { remote } from "electron";

/**
 * OAuth with the Google Calendar API
 *
 * @param {Object} credentialsPath - The authorization client credentials.
 * @param {string} tokenPath - The path to the token.json file
 * @throws Error if there is an invalid credential file.
 */
export default class OAuth {
    constructor(
        credentialsPath = remote.app.getAppPath() + "/config/credentials.json",
        tokenPath = remote.app.getAppPath() + "/config/token.json"
    ) {
        this.credentials = undefined;
        this.token = undefined;

        // If modifying these scopes, delete token.json. You can pass multiple
        // scopes in as an array, but we only need access to the calendar at this time.
        this.scope = ["https://www.googleapis.com/auth/calendar.readonly"];

        this.setCredentials(credentialsPath);

        this.oAuth2Client = new google.auth.OAuth2(
            this.credentials.client_id,
            this.credentials.client_secret,
            this.credentials.redirect_uris[0]
        );

        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first time.
        this.tokenPath = tokenPath;

        try {
            this.setToken(tokenPath);
        } catch (error) {
            console.log(error.message);
            this.token = undefined;
        }
    }

    /**
     * Retrieves client secrets from a local file
     * and sets this OAuth's credentials to it.
     *
     * @param {string} path - Path to credentials.json
     * @throws Error if the credentials file doesn't exist or could not be read.
     */
    setCredentials(path) {
        let credentials;

        try {
            credentials = jetpack.read(path, "json");
            this.credentials = credentials.installed;
        } catch (error) {
            this.credentials = undefined;
            throw new Error(
                "Cannot continue with oauth without a credentials.json file"
            );
        }
    }

    /**
     * Sets this OAuth's token and the credentials
     * for the oAuth2Client.
     *
     * @param {string|Object} token
     * @throws Error if the token file doesn't exist or could not be read.
     */
    setToken(token) {
        if (typeof token === "string") {
            try {
                token = jetpack.read(token, "json");
            } catch (error) {
                this.token = undefined;
                throw new Error(
                    "The given token path is invalid. Token could not be set."
                );
            }
        }

        this.token = token;
        this.oAuth2Client.setCredentials(this.token);
    }

    /**
     * Set's this OAuth's token to a new token and stores the token at the tokenPath
     * for later execution.
     *
     * @param {string} code - The code presented from visiting the auth url
     * @param {function} callback
     */
    generateToken(code, callback = () => {}) {
        this.oAuth2Client.getToken(code, (error, token) => {
            if (error) {
                throw new Error(error.message);
            }

            this.setToken(token);

            try {
                jetpack.write(this.tokenPath, JSON.stringify(this.token));
            } catch (error) {
                throw new Error(error.message);
            }

            callback();
        });
    }

    /**
     * Generates a url for authorizing the calendar api which
     * is where we would retrieve the code to generate a token.
     *
     * @returns {string} auth url
     * @throws Error if oAuth2Client is undefined.
     */
    generateAuthUrl() {
        if (this.oAuth2Client !== undefined) {
            return this.oAuth2Client.generateAuthUrl({
                access_type: "offline",
                scope: this.scope,
            });
        }

        throw new Error(
            "oAuth2Client has not been initialized. " +
                "Check to make sure you have a valid credential and token file."
        );
    }
}
