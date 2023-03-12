import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertArrayFilterToFindMatch } from "./ConvertArrayFilterToFindMatch";

const { ast } = m;

export class ConvertArrayFilterToFindMatcher extends PatternMatcher<ConvertArrayFilterToFindMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ElementAccessExpression],
  };

  constructor() {
    super(ConvertArrayFilterToFindMatch);
  }

  createPattern() {
    const captures = {
      filterCall: capture.node<ts.CallExpression>(),
      filterName: capture.node<ts.Identifier>(),
      target: capture.node<ts.Expression>(),
    };

    return {
      match: ast.elementAccessExpression({
        expression: ast.callExpression({
          expression: ast.propertyAccessExpression({
            name: ast.identifier({
              text: "filter",
              constraints: [captures.filterName.record()],
            }),
            expression: captures.target.record(),
          }),
          constraints: [captures.filterCall.record()],
        }),
        argumentExpression: ast.numericLiteral({
          text: "0",
        }),
        isOptional: false,
      }),
      captures,
    };
  }
}
