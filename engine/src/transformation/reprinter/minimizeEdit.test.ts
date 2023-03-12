import { Range } from "../../util/text/Range";
import { Edit } from "./Edit";
import { minimizeEdit } from "./minimizeEdit";

const testMinimizeEdit = (
  testDescription: string,
  originalText: string,
  originalEdit: Edit,
  expectedEdit: Edit
) => {
  it(testDescription, () => {
    expect(minimizeEdit(originalEdit, originalText)).toEqual(expectedEdit);
  });
};

describe("minimizeEdit", () => {
  testMinimizeEdit(
    "should return full edit when it cannot be minimized",
    "aaa",
    new Edit(new Range(1, 2), "111"),
    new Edit(new Range(1, 2), "111")
  );

  testMinimizeEdit(
    "should remove single character prefix",
    "abc",
    new Edit(new Range(0, 1), "a111"),
    new Edit(new Range(1, 1), "111")
  );

  testMinimizeEdit(
    "should remove multi character prefix",
    "abcdefg",
    new Edit(new Range(1, 4), "bcd111"),
    new Edit(new Range(4, 4), "111")
  );

  testMinimizeEdit(
    "should remove single character suffix",
    "abc",
    new Edit(new Range(0, 1), "111a"),
    new Edit(new Range(0, 0), "111")
  );

  testMinimizeEdit(
    "should remove multi character suffix",
    "abcdefg",
    new Edit(new Range(1, 4), "111bcd"),
    new Edit(new Range(1, 1), "111")
  );

  testMinimizeEdit(
    "should remove single character suffix and prefix",
    "abc",
    new Edit(new Range(0, 2), "a111b"),
    new Edit(new Range(1, 1), "111")
  );

  testMinimizeEdit(
    "should return empty edit when it removes text after prefix adjustment",
    "abc",
    new Edit(new Range(0, 2), "a"),
    new Edit(new Range(1, 2), "")
  );

  it("should return undefined when the edit is fully redundant", () => {
    expect(minimizeEdit(new Edit(new Range(1, 2), "b"), "abc")).toBeUndefined();
  });
});
