import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import ts from "typescript";
import { AddNumericSeparatorCandidate } from "./AddNumericSeparatorCandidate";

const { ast } = m;

const CONVERTIBLE_INT = "[1-9][0-9]+[0-9]{2}";

const CONVERTIBLE_DECIMAL = `${CONVERTIBLE_INT}(\\.[0-9]+)?`;

const CONVERTIBLE_HEX = "0x([0-9A-Fa-f][0-9A-Fa-f])[0-9A-Fa-f][0-9A-Fa-f]+";

const CONVERTIBLE_OCTAL = "0o[0-7][0-7]+";

const CONVERTIBLE_BINARY = "0b[0-1]{4}[0-1]+";

const CONVERTIBLE_NUMERIC_LITERAL = new RegExp(
  `^(${CONVERTIBLE_DECIMAL}|${CONVERTIBLE_HEX}|${CONVERTIBLE_OCTAL}|${CONVERTIBLE_BINARY})$`
);

const CONVERTIBLE_BIG_INT_LITERAL = new RegExp(
  `^(${CONVERTIBLE_INT}|${CONVERTIBLE_HEX}|${CONVERTIBLE_OCTAL}|${CONVERTIBLE_BINARY})n$`
);

export class AddNumericSeparatorMatcher extends PatternMatcher<AddNumericSeparatorCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.NumericLiteral, ts.SyntaxKind.BigIntLiteral],
  };

  createPattern() {
    const captures = {};

    return {
      match: p.or(
        ast.numericLiteral({
          constraints: [
            // use .getText() to get raw text (which would include existing underscores)
            (numericLiteral) =>
              numericLiteral.getText().match(CONVERTIBLE_NUMERIC_LITERAL) !=
              null,
          ],
        }),
        ast.bigIntLiteral({
          // use .getText() to get raw text (which would include existing underscores)
          constraints: [
            (bigIntLiteral) =>
              bigIntLiteral.getText().match(CONVERTIBLE_BIG_INT_LITERAL) !=
              null,
          ],
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: AddNumericSeparatorCandidate["node"],
    captures: AddNumericSeparatorCandidate["captures"]
  ): AddNumericSeparatorCandidate["data"] {
    const text = matchedNode.getText();
    const bigIntIndicator = ts.isBigIntLiteral(matchedNode) ? 1 : 0;

    if (text.startsWith("0x")) {
      return {
        type: "hex",
        nonDecimalLength: text.length - 2 - bigIntIndicator,
      };
    }

    if (text.startsWith("0o")) {
      return {
        type: "octal",
        nonDecimalLength: text.length - 2 - bigIntIndicator,
      };
    }

    if (text.startsWith("0b")) {
      return {
        type: "binary",
        nonDecimalLength: text.length - 2 - bigIntIndicator,
      };
    }

    if (text.includes(".")) {
      const [integerPart] = text.split(".");
      return {
        type: "decimal",
        nonDecimalLength: integerPart.length,
      };
    }

    return {
      type: "decimal",
      nonDecimalLength: text.length - bigIntIndicator,
    };
  }
}
