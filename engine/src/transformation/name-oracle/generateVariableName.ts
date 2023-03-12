import { RESERVED_KEYWORDS } from "../../ast/Keywords";
import { Scope } from "../../augmentation/scope/Scope";
import { generateNameWithIncreasingNumber } from "./generateNameWithIncreasingNumber";
import { NameOracle } from "./NameOracle";

const MAX_ITERATIONS = 50;

const FALLBACK_ORACLE = generateNameWithIncreasingNumber("variable");

// exclude other JavaScript-specific words (mostly global properties)
// to prevent shadowing
const excludedWords = RESERVED_KEYWORDS.concat([
  "undefined",
  "arguments",
  "Infinity",
  "NaN",
  "eval",
  "globalThis",
]);

const isExcludedWord = (name: string) => excludedWords.includes(name);

/**
 * The first character of a variable name is a letter, the $ sign, and
 * the _ sign.
 */
const isValidFirstCharacter = (name: string) =>
  name.length >= 1 && /[a-zA-Z\\$\\_]/.test(name[0]);

function attemptGenerateVariableName(
  oracle: NameOracle,
  isUsedInScopes: (name: string) => boolean
): string | undefined {
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    const name = oracle.next().value;

    if (
      isValidFirstCharacter(name) &&
      !isExcludedWord(name) &&
      !isUsedInScopes(name)
    ) {
      return name;
    }
  }
}

/**
 * Generates a non-conflicting variable name.
 */
export function generateVariableName(
  oracle: NameOracle,
  ...scopes: Scope[]
): string {
  const isUsedInScopes = (name: string) =>
    scopes.some((scope) => scope.hasBinding(name));

  let name = attemptGenerateVariableName(oracle, isUsedInScopes);

  if (name != null) {
    return name;
  }

  // unable to generate valid variable name with the supplied oracle,
  // use fallback oracle

  name = attemptGenerateVariableName(FALLBACK_ORACLE, isUsedInScopes);

  if (name != null) {
    return name;
  }

  throw new Error("could not find variable name");
}
