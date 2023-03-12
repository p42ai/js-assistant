
import {
  capture,
  Context,
  hasDescendant,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { RemoveIifeCandidate } from "./RemoveIifeCandidate";

const { ast } = m;

export class RemoveIifeMatcher extends PatternMatcher<RemoveIifeCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.CallExpression],
  };

  createPattern() {
    const captures = {
      function: capture.node<ts.FunctionExpression | ts.ArrowFunction>(),
      body: capture.node<ts.Expression | ts.Block>(),
    };

    const expressionBody = captures.body.record({
      match: ast.expression(),
    });

    const blockBody = captures.body.record({
      match: ast.block({
        constraints: [
          // TODO extract augmentation that provides return statements
          // of function, arrow function or method
          (block, context) =>
            !hasDescendant(block, ast.returnStatement(), context),
        ],
      }),
    });

    const functionWithReturnValue = p.or(
      // arrow function with expression body:
      ast.arrowFunction({
        body: p.or(
          ast.singleStatementReturnBlock({
            returnExpression: expressionBody,
          }),
          expressionBody
        ),
        parameters: p.emptyArray(),
      }),
      // function expression with expression body:
      ast.functionExpression({
        body: ast.singleStatementReturnBlock({
          returnExpression: expressionBody,
        }),
        parameters: p.emptyArray(),
      })
    );

    const functionWithoutReturnValue = p.or(
      // arrow function with block body:
      ast.arrowFunction({
        body: blockBody,
        parameters: p.emptyArray(),
      }),
      // function expression with block body:
      ast.functionExpression({
        body: blockBody,
        parameters: p.emptyArray(),
      })
    );

    return {
      match: p.or(
        // function with expression body:
        ast.callExpression({
          expression: m.maybeParenthesized(
            captures.function.record({
              match: functionWithReturnValue,
            })
          ),
          args: p.emptyArray(),
        }),
        // inside expression statement:
        ast.callExpression({
          expression: m.maybeParenthesized(
            captures.function.record({
              match: functionWithoutReturnValue,
            })
          ),
          args: p.emptyArray(),
          parent: p.or(
            ast.expressionStatement(),
            ast.voidExpression({
              parent: ast.expressionStatement(),
            })
          ),
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: RemoveIifeCandidate["node"],
    captures: RemoveIifeCandidate["captures"],
    context: Context
  ): RemoveIifeCandidate["data"] {
    return {
      type: ts.isArrowFunction(captures.function) ? "IIAF" : "IIFE",
      hoistedBindings: ts.isBlock(captures.body)
        ? Array.from(
            context.getScope(captures.function).bindings.values()
          ).filter((binding) => binding.kind.isHoisted)
        : [],
    };
  }

  verifyMatch(match: RemoveIifeCandidate): boolean {
    const f = match.captures.function;

    if (!ts.isFunctionExpression(f) || f.name == null) {
      return true;
    }

    const binding = match.context.getBinding(f.name);

    if (binding == null) {
      return true;
    }

    return binding.readReferences.length === 1;
  }
}
