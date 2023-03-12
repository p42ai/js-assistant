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

export class ForEachLoopMatcher extends PatternMatcher<ArrayLoopMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
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
      elementBinding: capture.value<Binding | undefined>(),
      indexBinding: capture.value<Binding | undefined>(), // undefined
      body: capture.node<ts.Statement>(),
      sizeBinding: capture.value<Binding | undefined>(), // undefined
    };

    return {
      // matching on expression statement to avoid issues when converting inside other expressions:
      match: ast.expressionStatement({
        expression: ast.callExpression({
          expression: ast.propertyAccessExpression({
            name: ast.identifier({
              text: "forEach",
            }),
            expression: captures.arrayExpression.record({
              match: ast.expression(),
            }),
          }),
          args: p.array(
            p.or(
              ast.functionExpression({
                parameters: p.array(
                  ast.parameter({
                    // TODO no default value
                    // TODO preserve type information?!?
                    name: ast.identifier({
                      binding: captures.elementBinding.record(),
                    }),
                  })
                ),
                body: captures.body.record(),
              }),
              ast.arrowFunction({
                parameters: p.array(
                  ast.parameter({
                    // TODO no default value
                    // TODO preserve type information?!?
                    name: ast.identifier({
                      binding: captures.elementBinding.record(),
                    }),
                  })
                ),
                body: captures.body.record(),
              })
            )
          ),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(): ArrayLoopMatch["data"] {
    return {
      type: "for-each",
      typeLabel: ".forEach",
    };
  }
}
