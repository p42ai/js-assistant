
import {
  BindingPattern,
  Context,
  getId,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  FlattenArrayRestPropertyMatch,
  FlattenArrayRestPropertyMatchType,
} from "./FlattenArrayRestPropertyMatch";

const { ast } = m;

export class FlattenArrayRestPropertyMatcher extends PatternMatcher<FlattenArrayRestPropertyMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BindingElement, ts.SyntaxKind.SpreadElement],
  };

  createMatch(
    node: FlattenArrayRestPropertyMatchType["node"],
    captures: FlattenArrayRestPropertyMatchType["captures"],
    data: FlattenArrayRestPropertyMatchType["data"],
    context: Context
  ): FlattenArrayRestPropertyMatch {
    return new FlattenArrayRestPropertyMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {};

    return {
      match: p.or(
        ast.bindingElement({
          name: ast.arrayBindingPattern(),
          constraints: [BindingPattern.isLastArrayBindingElement],
        }),
        ast.spreadElement({
          expression: ast.arrayLiteralExpression(),
          parent: ast.arrayLiteralExpression(),
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: FlattenArrayRestPropertyMatch["node"],
    captures: FlattenArrayRestPropertyMatch["captures"],
    context: Context
  ): FlattenArrayRestPropertyMatch["data"] {
    if (ts.isBindingElement(matchedNode)) {
      return {
        type: ts.SyntaxKind.BindingElement,
        innerExpression: matchedNode.name as ts.ArrayBindingPattern,
        outerExpression: matchedNode.parent as ts.ArrayBindingPattern,
      };
    }

    if (ts.isSpreadElement(matchedNode)) {
      return {
        type: ts.SyntaxKind.SpreadElement,
        innerExpression: matchedNode.expression as ts.ArrayLiteralExpression,
        outerExpression: matchedNode.parent as ts.ArrayLiteralExpression,
      };
    }

    throw new Error(`unsupported node type ${getId(matchedNode)}`);
  }
}
