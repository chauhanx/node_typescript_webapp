// Requiring module
const assert = require('assert');

// We can group similar tests inside a describe block
describe("Simple Calculations", () => {
    before(() => {
        console.log("This part executes once before all tests");
    });

    after(() => {
        console.log("This part executes once after all tests");
    });

    // We can add nested blocks for different tests
    describe("Test1", () => {
        beforeEach(() => {
            console.log("executes before every test");
        });

        it("Is Database string present", () => {
            assert.equal(2 + 3, 5);
        });

        it("Validate build syntax", () => {
            assert.equal(2 * 3, 6);
        });
    });

});