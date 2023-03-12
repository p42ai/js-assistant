import { createParseAndAugmentFunction } from "../../../augmentation/createParseAndAugmentFunction";
import { inferLineBreak } from "./inferLineBreak";

const parseAndAugment = createParseAndAugmentFunction();

describe("inferLineBreak", () => {
  it("should infer carriage return + newline line separator", async () => {
    const source = (
      await parseAndAugment("const a = 1;\r\nconst b = 2;\r\nconst c = 3;")
    ).sourceFile;

    expect(inferLineBreak(source)).toEqual("\r\n");
  });

  it("should infer newline line separator", async () => {
    const source = (
      await parseAndAugment("const a = 1;\nconst b = 2;\nconst c = 3;")
    ).sourceFile;

    expect(inferLineBreak(source)).toEqual("\n");
  });
});
