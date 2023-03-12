
import EqualityCheckAugmentation, {
  equalityCheck,
} from "@p42/augmentation-equality-check";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertComparisonChainToArrayIncludesCandidate } from "./ConvertComparisonChainToArrayIncludesCandidate";

const { ast, path } = m;

export class ConvertComparisonChainToArrayIncludesMatcher extends PatternMatcher<ConvertComparisonChainToArrayIncludesCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  requiredAugmentations = [EqualityCheckAugmentation];

  createPattern() {
    const captures = {
      expression: capture.node<ts.Expression>(),
      values: capture.set<ts.StringLiteral>(),
      isNegated: capture.value<boolean>(),
    };

    const stringLiteralComparison = (isNegated: boolean) =>
      m.maybeParenthesized(
        captures.values.checkpoint(
          equalityCheck({
            part1: captures.values.record(ast.stringLiteral()),
            part2: captures.expression.record(),
            isNegated,
            isStrict: true,
          })
        )
      );

    const equalsChain =
      (
        combinator:
          | ts.SyntaxKind.AmpersandAmpersandToken
          | ts.SyntaxKind.BarBarToken,
        isNegated: boolean
      ) =>
      (recursion: p.Predicate<ts.Expression, Context>) =>
        p.or(
          // final element:
          stringLiteralComparison(isNegated),
          // chain element, both sides could be recursive because of parentheses:
          ast.binaryExpression({
            left: stringLiteralComparison(isNegated),
            operator: combinator,
            right: m.maybeParenthesized(recursion),
          }),
          ast.binaryExpression({
            left: m.maybeParenthesized(recursion),
            operator: combinator,
            right: stringLiteralComparison(isNegated),
          })
        );

    const convertibleChain = (
      combinator:
        | ts.SyntaxKind.AmpersandAmpersandToken
        | ts.SyntaxKind.BarBarToken,
      isNegated: boolean
    ) =>
      captures.isNegated.record({
        value: isNegated,
        match: ast.binaryExpression({
          constraints: [
            // not available in inner nodes of chain:
            p.not(
              path.trueParent(
                ast.binaryExpression({
                  operator: combinator,
                })
              )
            ),
            // actual chain matching:
            p.recursive(equalsChain(combinator, isNegated)),
          ],
        }),
      });

    return {
      match: p.or(
        convertibleChain(ts.SyntaxKind.BarBarToken, false),
        convertibleChain(ts.SyntaxKind.AmpersandAmpersandToken, true)
      ),
      captures,
    };
  }
}
