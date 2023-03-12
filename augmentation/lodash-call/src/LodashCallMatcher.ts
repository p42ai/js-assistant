import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { LodashCallMatch } from "./LodashCallMatch";

const { ast } = m;

export class LodashCallMatcher extends PatternMatcher<LodashCallMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.CallExpression],
  };

  createPattern() {
    const captures = {
      name: capture.value<string>(),
      propertyAccess: capture.node<ts.PropertyAccessExpression>(),
    };

    return {
      match: ast.callExpression({
        expression: captures.propertyAccess.record({
          match: ast.propertyAccessExpression({
            expression: ast.identifier({ text: "_" }),
            name: ast.identifier({
              text: captures.name.record(),
            }),
          }),
        }),
      }),
      captures,
    };
  }
}
