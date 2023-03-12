import { Range } from "./Range";

const testSubtract = (
  range: Range,
  rangesToSubtract: Array<Range>,
  expectedResult: Array<Range>
) => {
  it(`subtracting ${JSON.stringify(rangesToSubtract)} from ${JSON.stringify(
    range
  )} should result in ${JSON.stringify(expectedResult)}`, () => {
    expect(range.subtract(rangesToSubtract)).toEqual(expectedResult);
  });
};

describe("Range", () => {
  describe("subtract", () => {
    testSubtract(
      new Range(0, 10),
      [new Range(5, 7)],
      [new Range(0, 5), new Range(7, 10)]
    );

    testSubtract(
      new Range(0, 10),
      [new Range(4, 6), new Range(6, 8)],
      [new Range(0, 4), new Range(8, 10)]
    );

    testSubtract(new Range(0, 10), [new Range(5, 10)], [new Range(0, 5)]);
  });
});
