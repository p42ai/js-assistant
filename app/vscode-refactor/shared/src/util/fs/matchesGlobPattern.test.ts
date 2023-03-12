import { matchesGlobPattern } from "./matchesGlobPattern";

describe("matchesGlobPattern", () => {
  it("should match pattern with dot inside", () => {
    expect(
      matchesGlobPattern(
        "service/graphql-engine/.gradle/npm/npm-v7.15.1/lib/node_modules/npm/node_modules/sshpk/lib/formats/x509.js",
        ["**/node_modules/**"]
      )
    ).toStrictEqual(true);
  });
});
