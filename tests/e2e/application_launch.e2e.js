import { expect } from "chai";
import testUtils from "./utils";

describe("application launch", () => {
    beforeEach(testUtils.beforeEach);
    afterEach(testUtils.afterEach);

    it("shows augustana health screenings admin menu for the title after launch", function() {
        return this.app.client.getTitle().then(title => {
            expect(title).to.equal("Augustana Health Screenings Admin Menu");
        });

    });
});
