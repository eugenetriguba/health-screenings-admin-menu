import jetpack from 'fs-jetpack';
import { google } from 'googleapis';
import { remote } from 'electron';

/**
 * @param {Object} credentials - The authorization client credentials.
 * @param {string} tokenPath - The path to the token.json file
 */
export class OAuth {
    constructor(credentials,
                tokenPath=remote.app.getAppPath() + '/config/token.json') {
        this.credentials = credentials.installed;

        // The file token.json stores the user's access and refresh tokens, and is
        // created automatically when the authorization flow completes for the first time.
        this.tokenPath = tokenPath;
        this.token = jetpack.read(this.tokenPath, 'json');

        this.oAuth2Client = new google.auth.OAuth2(
            this.credentials.client_id,
            this.credentials.client_secret,
            this.credentials.redirect_uris[0]);

        // If modifying these scopes, delete token.json. You can pass multiple
        // scopes in as an array, but we only need access to the calendar at this time.
        this.scope = 'https://www.googleapis.com/auth/calendar.readonly';

        this.oAuth2Client.setCredentials(this.token);
    }

    /**
     * Set's this OAuth's token to a new token and stores the token at this.tokenPath
     * for later execution. Use if the current token is undefined (haven't been through
     * oauth flow yet).
     *
     * @param {string} code - The code presented from visiting the auth url
     * @return {boolean}
     */
    getToken(code) {
        this.oAuth2Client.getToken(code, function(error, token) {
            if (error) {
                console.error('Error retrieving access token', error);
                return false;
            }

            this.oAuth2Client.setCredentials(token);
            this.token = JSON.stringify(token);

            // Store the token to disk for later program executions
            jetpack.write(this.tokenPath, this.token, function(error) {
                if (error) {
                    console.error('Error while writing token to disk', error);
                    return false;
                }

                return true;
            });
        });
    }

    generateAuthUrl() {
        return this.oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: this.scope,
        });
    }
}

/**
 * Loads client secrets from a local file.
 *
 * @param {string} path - Path to credentials.json
 * @return {Object|Boolean}
 */
export function retrieveCredentials(path = 'config/credentials.json') {
    let credentials;

    try {
        credentials = jetpack.read(path, 'json');
    } catch(error) {
        console.error("${path} is a directory and not a file.", error);
        return false;
    }

    if (credentials === undefined) {
        console.error("${path} does not exist.");
        return false;
    }

    return credentials;
}
