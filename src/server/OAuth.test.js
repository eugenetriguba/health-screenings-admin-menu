import { expect } from "chai";
import { suite, test } from "mocha";
import testUtils from "../../tests/utils";
import OAuth from "../../app/scripts/oauth";

suite("oauth", () => {
    test("retrieves credentials when the file is present", function () {
        expect(
            new OAuth(testUtils.DATA_FOLDER_PATH + "/credentials.json")
        ).to.be.instanceOf(Object);
    });

    test("throws error when the credentials file does not exist", function () {
        let auth = new OAuth(testUtils.DATA_FOLDER_PATH + "/credentials.json");

        expect(
            auth.setCredentials.bind(auth, "this/file/does/not/exist")
        ).to.throw(
            Error,
            "Cannot continue with oauth without a credentials.json file"
        );
    });

    test("throws error when the credentials file is a folder", function () {
        let auth = new OAuth(testUtils.DATA_FOLDER_PATH + "/credentials.json");

        expect(
            auth.setCredentials.bind(auth, testUtils.DATA_FOLDER_PATH)
        ).to.throw(
            Error,
            "Cannot continue with oauth without a credentials.json file"
        );
    });

    test("has an undefined token when the token file is missing", function () {
        let auth = new OAuth(
            testUtils.DATA_FOLDER_PATH + "/credentials.json",
            "/does/not/exist/token.json"
        );

        expect(auth.token).to.equal(undefined);
    });

    test("has a token when the file is present", function () {
        let auth = new OAuth(
            testUtils.DATA_FOLDER_PATH + "/credentials.json",
            testUtils.DATA_FOLDER_PATH + "/token.json"
        );

        expect(auth.token.access_token).to.be.a("string");
        expect(auth.token.refresh_token).to.be.a("string");
        expect(auth.token.scope).to.be.a("string");
        expect(auth.token.token_type).to.be.a("string");
        expect(auth.token.expiry_date).to.be.a("number");
    });

    test("generates a auth url", function () {
        let authUrl = new OAuth(
            testUtils.DATA_FOLDER_PATH + "/credentials.json",
            testUtils.DATA_FOLDER_PATH + "/token.json"
        ).generateAuthUrl();

        expect(authUrl).to.be.a("string");
        expect(authUrl).to.include("accounts.google.com");
    });
});
