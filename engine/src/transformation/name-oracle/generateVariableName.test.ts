import { generateVariableName } from "./generateVariableName";
import { generateNameWithIncreasingNumber } from "./generateNameWithIncreasingNumber";

describe("generateVariableName", () => {
  it("should generate valid name if oracle does not", () => {
    expect(generateVariableName(generateNameWithIncreasingNumber(""))).toEqual(
      "variable"
    );
  });
});
