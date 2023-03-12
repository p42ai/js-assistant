import { createParseAndAugmentFunction } from "../../../augmentation/createParseAndAugmentFunction";
import { getLines } from "./getLines";

const parseAndAugment = createParseAndAugmentFunction();

describe("getLines", () => {
  it("should split lines correctly", async () => {
    const source = (
      await parseAndAugment(`const a = 1;
const b = 2;
const c = 3;`)
    ).sourceFile;

    expect(getLines(source)).toEqual([
      "const a = 1;",
      "const b = 2;",
      "const c = 3;",
    ]);
  });
});
