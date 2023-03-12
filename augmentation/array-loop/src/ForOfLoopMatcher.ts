import {
  Binding,
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  ArrayLoopMatch,
  ArrayMatchCaptures,
  ArrayMatchData,
  ArrayMatchNode,
} from "./ArrayLoopMatch";

const { ast } = m;

export class ForOfLoopMatcher extends PatternMatcher<ArrayLoopMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ForOfStatement],
  };

  createMatch(
    node: ArrayMatchNode,
    captures: ArrayMatchCaptures,
    data: ArrayMatchData,
    context: Context
  ): ArrayLoopMatch {
    return new ArrayLoopMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {
      arrayExpression: capture.node<ts.Expression>(),
      elementBinding: capture.value<Binding | undefined>(), // undefined
      indexBinding: capture.value<Binding | undefined>(), // undefined
      body: capture.node<ts.Statement>(),
      sizeBinding: capture.value<Binding | undefined>(), // undefined
    };

    return {
      match: ast.forOfStatement({
        awaitModifier: p.isUndefined,
        initializer: ast.variableDeclarationList({
          declarations: p.array(
            ast.variableDeclaration({
              name: ast.identifier({
                binding: captures.elementBinding.record(),
              }),
            })
          ),
        }),
        expression: captures.arrayExpression.record({
          match: ast.expression(),
        }),
        statement: captures.body.record(),
      }),
      captures,
    };
  }

  deriveMatchData(): ArrayLoopMatch["data"] {
    return {
      type: "for-of",
      typeLabel: "for..of",
    };
  }
}
