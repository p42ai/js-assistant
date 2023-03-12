
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  ConvertArrayIndexOfToArrayIncludesMatch,
  ConvertArrayIndexOfToArrayIncludesMatchType,
} from "./ConvertArrayIndexOfToArrayIncludesMatch";

const { ast } = m;

export class ConvertArrayIndexOfToArrayIncludesMatcher extends PatternMatcher<ConvertArrayIndexOfToArrayIncludesMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  createMatch(
    node: ConvertArrayIndexOfToArrayIncludesMatchType["node"],
    captures: ConvertArrayIndexOfToArrayIncludesMatchType["captures"],
    data: ConvertArrayIndexOfToArrayIncludesMatchType["data"],
    context: Context
  ): ConvertArrayIndexOfToArrayIncludesMatch {
    return new ConvertArrayIndexOfToArrayIncludesMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      indexOfCall: capture.node<ts.CallExpression>(),
      indexOfPropertyAccess: capture.node<ts.PropertyAccessExpression>(),
      firstParameter: capture.node<ts.Expression>(),
      isNegated: capture.value<boolean>(),
    };

    const indexOfCall = captures.indexOfCall.record({
      match: ast.callExpression({
        expression: captures.indexOfPropertyAccess.record({
          match: ast.propertyAccessExpression({
            name: ast.identifier({
              text: "indexOf",
            }),
            isOptional: false,
          }),
        }),
        args: p.firstArrayElements(captures.firstParameter.record()),
      }),
    });

    const minusOne = ast.prefixUnaryExpression({
      operator: ts.SyntaxKind.MinusToken,
      operand: ast.numericLiteral({
        text: "1",
      }),
    });

    const zero = ast.numericLiteral({
      text: "0",
    });

    return {
      match: p.or(
        captures.isNegated.record({
          value: false,
          match: p.or(
            ast.binaryExpression({
              left: indexOfCall,
              operator: [
                ts.SyntaxKind.ExclamationEqualsEqualsToken,
                ts.SyntaxKind.ExclamationEqualsToken,
                ts.SyntaxKind.GreaterThanToken,
              ],
              right: minusOne,
            }),
            ast.binaryExpression({
              left: minusOne,
              operator: [
                ts.SyntaxKind.ExclamationEqualsEqualsToken,
                ts.SyntaxKind.ExclamationEqualsToken,
                ts.SyntaxKind.LessThanToken,
              ],
              right: indexOfCall,
            }),
            ast.binaryExpression({
              left: indexOfCall,
              operator: ts.SyntaxKind.GreaterThanEqualsToken,
              right: zero,
            }),
            ast.binaryExpression({
              left: zero,
              operator: ts.SyntaxKind.LessThanEqualsToken,
              right: indexOfCall,
            })
          ),
        }),
        captures.isNegated.record({
          value: true,
          match: p.or(
            ast.binaryExpression({
              left: indexOfCall,
              operator: [
                ts.SyntaxKind.EqualsEqualsEqualsToken,
                ts.SyntaxKind.EqualsEqualsToken,
                ts.SyntaxKind.LessThanEqualsToken,
              ],
              right: minusOne,
            }),
            ast.binaryExpression({
              left: minusOne,
              operator: [
                ts.SyntaxKind.EqualsEqualsEqualsToken,
                ts.SyntaxKind.EqualsEqualsToken,
                ts.SyntaxKind.GreaterThanEqualsToken,
              ],
              right: indexOfCall,
            }),
            ast.binaryExpression({
              left: indexOfCall,
              operator: ts.SyntaxKind.LessThanToken,
              right: zero,
            }),
            ast.binaryExpression({
              left: zero,
              operator: ts.SyntaxKind.GreaterThanToken,
              right: indexOfCall,
            })
          ),
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ConvertArrayIndexOfToArrayIncludesMatch["node"],
    captures: ConvertArrayIndexOfToArrayIncludesMatch["captures"],
    context: Context
  ): ConvertArrayIndexOfToArrayIncludesMatch["data"] {
    return {
      targetType: context.typeSystem.getType(
        captures.indexOfPropertyAccess.expression
      )!,
    };
  }

  verifyMatch(match: ConvertArrayIndexOfToArrayIncludesMatch): boolean {
    const { typeSystem } = match.context;
    const { targetType } = match.data;
    return (
      typeSystem.isArrayType(targetType) ||
      typeSystem.isAny(targetType) ||
      typeSystem.isUnknown(targetType)
    );
  }
}
