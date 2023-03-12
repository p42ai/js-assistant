
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  ConvertNewArrayToArrayLiteralMatch,
  ConvertNewArrayToArrayLiteralMatchType,
} from "./ConvertNewArrayToArrayLiteralMatch";

const { ast } = m;

export class ConvertNewArrayToArrayLiteralMatcher extends PatternMatcher<ConvertNewArrayToArrayLiteralMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.NewExpression],
  };

  createMatch(
    node: ConvertNewArrayToArrayLiteralMatchType["node"],
    captures: ConvertNewArrayToArrayLiteralMatchType["captures"],
    data: ConvertNewArrayToArrayLiteralMatchType["data"],
    context: Context
  ): ConvertNewArrayToArrayLiteralMatch {
    return new ConvertNewArrayToArrayLiteralMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      type: capture.node<ts.TypeNode | undefined>(),
    };

    return {
      match: ast.newExpression({
        expression: ast.identifier({
          text: "Array",
        }),
        typeArguments: p.or(p.isUndefined, p.array(captures.type.record())),
      }),
      captures,
    };
  }
}
