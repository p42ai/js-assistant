
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertToIncrementMatch } from "./ConvertToIncrementMatch";

const { ast, type } = m;

export class ConvertToIncrementMatcher extends PatternMatcher<ConvertToIncrementMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BinaryExpression],
  };

  constructor() {
    super(ConvertToIncrementMatch);
  }

  createPattern() {
    const captures = {
      targetExpression: capture.node<ts.Expression>(),
      type: capture.value<"increment" | "decrement">(),
    };

    return {
      match: p.or(
        p.and(
          p.or(
            ast.binaryExpression({
              left: captures.targetExpression.record({
                match: type.maybeNumber,
              }),
              operator: ts.SyntaxKind.PlusEqualsToken,
              right: ast.numericLiteral({
                text: "1",
              }),
            }),
            ast.binaryExpression({
              left: captures.targetExpression.record(),
              operator: ts.SyntaxKind.EqualsToken,
              right: ast.binaryExpression({
                left: captures.targetExpression.record({
                  match: type.maybeNumber,
                }),
                operator: ts.SyntaxKind.PlusToken,
                right: ast.numericLiteral({
                  text: "1",
                }),
              }),
            }),
            ast.binaryExpression({
              left: captures.targetExpression.record(),
              operator: ts.SyntaxKind.EqualsToken,
              right: ast.binaryExpression({
                left: ast.numericLiteral({
                  text: "1",
                }),
                operator: ts.SyntaxKind.PlusToken,
                right: captures.targetExpression.record({
                  match: type.maybeNumber,
                }),
              }),
            })
          ),
          captures.type.record({ value: "increment" })
        ),
        p.and(
          p.or(
            ast.binaryExpression({
              left: captures.targetExpression.record(),
              operator: ts.SyntaxKind.MinusEqualsToken,
              right: ast.numericLiteral({
                text: "1",
              }),
            }),
            ast.binaryExpression({
              left: captures.targetExpression.record(),
              operator: ts.SyntaxKind.EqualsToken,
              right: ast.binaryExpression({
                left: captures.targetExpression.record(),
                operator: ts.SyntaxKind.MinusToken,
                right: ast.numericLiteral({
                  text: "1",
                }),
              }),
            })
          ),
          captures.type.record({ value: "decrement" })
        )
      ),
      captures,
    };
  }
}
