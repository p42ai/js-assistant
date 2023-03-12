import assert from "assert";
import { checkMerge } from "./checkMerge";

function testCheckMerge(
  regexp: string,
  part1: string,
  part2: string,
  expected: boolean
) {
  assert.strictEqual(checkMerge(regexp, part1, part2), expected);
}

describe("checkMerge", () => {
  it("simple regular expression", () => {
    testCheckMerge("xx", "a", "b", true);
    testCheckMerge("xx", "ax", "xb", false);
    testCheckMerge("xx", "axx", "b", true);
    testCheckMerge("xx", "a", "xxb", true);
  });

  it("complex regular expression", () => {
    testCheckMerge("x+", "a", "b", true);
    testCheckMerge("x+", "ax", "xb", false);
    testCheckMerge("x+", "axx", "b", true);
    testCheckMerge("x+", "a", "xxb", true);
    testCheckMerge("x+", "axx", "xb", false);
    testCheckMerge("x+", "ax", "xxb", false);
  });

  it("regular expression that never finishes with regexp.exec", () => {
    testCheckMerge("x*", "a", "b", true);
  });

  it("double matches", () => {
    testCheckMerge("x+", "axxa", "b", true);
    testCheckMerge("x+", "axxax", "xb", false);
    testCheckMerge("x+", "axxaxx", "b", true);
    testCheckMerge("x+", "ax", "xbxxb", false);
    testCheckMerge("x+", "axx", "bxxb", true);
  });
});
