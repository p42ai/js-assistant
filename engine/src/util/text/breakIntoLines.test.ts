import assert from "assert";
import { breakIntoLines } from "./breakIntoLines";

describe("breakIntoLines", () => {
  it("3 words, all separate lines", () => {
    assert.deepStrictEqual(
      breakIntoLines({
        text: "1234 1234 1234",
        maxLineLength: 4,
      }),
      ["1234", "1234", "1234"]
    );
  });

  it("2 words, break after 2nd word", () => {
    assert.deepStrictEqual(
      breakIntoLines({
        text: "1234 1234 1234",
        maxLineLength: 9,
      }),
      ["1234 1234", "1234"]
    );
  });
});
