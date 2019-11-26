import { expect } from "chai";
import testUtils from "../utils";

describe("application launch", () => {
    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it('shows an initial window', function() {
        return this.app.client.getWindowCount().then(count => {
            expect(count).to.equal(1);
        });
    });

    it("has the correct title", function() {
        return this.app.client.getTitle().then(title => {
            expect(title).to.equal("Augustana Health Screenings Admin Menu");
        });
    });

    it('does not have the developer tools open', function() {
        return this.app.client.waitUntilWindowLoaded().browserWindow.isDevToolsOpened().then(devToolsAreOpen => {
            expect(devToolsAreOpen).to.equal(false);
        });
    });
});
