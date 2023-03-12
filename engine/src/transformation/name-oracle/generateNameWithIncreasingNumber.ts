import { NameOracle } from "./NameOracle";

export function* generateNameWithIncreasingNumber(
  targetName: string,
  ...alternativeNames: string[]
): NameOracle {
  yield targetName;

  for (const alternativeName of alternativeNames) {
    yield alternativeName;
  }

  let counter = 2; // start with 2 to prevent 'newVariable1' if there is already 'newVariable'
  while (true) {
    yield targetName + counter++;
  }
}
