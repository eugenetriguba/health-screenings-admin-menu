import { expect } from "chai";
import env from "env";
import { describe, it } from "mocha";

describe("env and babel", () => {
  it("should load test environment variables", () => {
    expect(env.name).to.equal("test");
    expect(env.description).to.equal(
      "Environment variable for testing use."
    );
  });

  it("babel features should work", () => {
    const a = { a: 1 };
    const b = { ...a, b: 2 };
    expect(b).to.eql({ a: 1, b: 2 });
  });
});
