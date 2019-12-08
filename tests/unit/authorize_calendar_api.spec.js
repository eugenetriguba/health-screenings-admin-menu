import { expect } from "chai";
import testUtils from "../utils";
import { OAuth } from "../../app/scripts/oauth";

describe("oauth with calendar api", () => {
    // it("throws error when the credentials file does not exist or is a folder", function() {
    //     //     expect(new OAuth('this/file/does/not/exist.json')).to.throw(Error);
    //     //     // expect(new OAuth(testUtils.DATA_FOLDER_PATH)).to.throw(Error);
    //     // });

    // it("retrieves credentials when the json file is present", function() {
    //     expect(retrieveCredentials(testUtils.DATA_FOLDER_PATH + '/credentials.json')).to.be.instanceOf(Object);
    // });
    //
    // it("has an undefined token when the token file is missing", function() {
    //     let auth = new OAuth(
    //         retrieveCredentials(testUtils.DATA_FOLDER_PATH + '/credentials.json'),
    //         '/does/not/exist/token.json'
    //     );
    //     expect(auth.token).to.equal(undefined);
    // });
    //
    // it("has a token when the file is present", function() {
    //     let auth = new OAuth(
    //         retrieveCredentials(testUtils.DATA_FOLDER_PATH + '/credentials.json'),
    //         testUtils.DATA_FOLDER_PATH + '/token.json'
    //     );
    //     expect(auth.token).to.be.instanceOf(Object);
    // });
    //
    // it("generates a auth url", function() {
    //     let auth = new OAuth(
    //         retrieveCredentials(testUtils.DATA_FOLDER_PATH + '/credentials.json'),
    //         testUtils.DATA_FOLDER_PATH + '/token.json'
    //     );
    //     expect(auth.generateAuthUrl()).to.be.a('string');
    //     expect(auth.generateAuthUrl()).to.include('accounts.google.com');
    // });
});
