import { generateNameWithIncreasingNumber } from "./generateNameWithIncreasingNumber";
import { NameOracle } from "./NameOracle";

export const generateIndexVariableName = (): NameOracle =>
  generateNameWithIncreasingNumber("i", "j", "k");
