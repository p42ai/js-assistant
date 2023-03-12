import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ReplaceLodashNoopWithArrowFunctionCandidate } from "./ReplaceLodashNoopWithArrowFunctionCandidate";

const { ast } = m;

export class ReplaceLodashNoopWithArrowFunctionMatcher extends PatternMatcher<ReplaceLodashNoopWithArrowFunctionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.PropertyAccessExpression],
  };

  createPattern() {
    const captures = {};

    // TODO figure out how to reuse this in the context of lodash-call (maybe as another augmentation)
    return {
      match: ast.propertyAccessExpression({
        expression: ast.identifier({
          text: "_",
        }),
        name: ast.identifier({
          text: "noop",
        }),
      }),
      captures,
    };
  }
}
