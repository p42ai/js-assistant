
import { FunctionDirectiveAugmentation } from "@p42/augmentation-function-directive";
import {
  capture,
  Context,
  This,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertFunctionToArrowFunctionCandidate } from "./ConvertFunctionToArrowFunctionCandidate";

const { ast } = m;

export class ConvertFunctionToArrowFunctionMatcher extends PatternMatcher<ConvertFunctionToArrowFunctionCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.CallExpression, ts.SyntaxKind.FunctionExpression],
  };

  requiredAugmentations = [FunctionDirectiveAugmentation];

  createPattern() {
    const captures = {
      functionExpression: capture.node<ts.FunctionExpression>(),
      return: capture.node<ts.LeftHandSideExpression>(),
      content: capture.node<ts.Block>(),
    };

    function convertibleFunctionExpression({
      constraints = [],
      debugName,
    }: {
      constraints?: Array<p.Predicate<ts.FunctionExpression, Context>>;
      debugName?: string;
    } = {}) {
      return captures.functionExpression.record({
        match: ast.functionExpression({
          debugName,
          name: p.isUndefined,
          modifiers: m.doesNotContainNodes(ast.asyncKeyword),
          isGenerator: false, // arrow functions cannot be generators
          body: captures.content.record({
            match: ast.block({
              statements: p.or(
                p.define(
                  "single return statement",
                  p.array(
                    ast.returnStatement({
                      expression: captures.return.record(),
                    })
                  )
                ),
                p.define("multi-line or no return", p.any)
              ),
            }),
          }),
          constraints: [
            // TODO extract, use p.isUndefined
            (node: ts.FunctionExpression, context: Context) =>
              FunctionDirectiveAugmentation.getValue(node, context) == null,
            ...constraints,
          ],
        }),
      });
    }

    return {
      match: p.define(
        "arrowFunctionTransformMatcher",
        p.and(
          p.or(
            ast.callExpression({
              debugName: "functionWithThisBinding",
              expression: ast.propertyAccessExpression({
                expression: captures.functionExpression.record({
                  match: convertibleFunctionExpression({
                    constraints: [This.hasNoArgumentsReference],
                  }),
                }),
                name: ast.identifier({ text: "bind" }),
              }),
              args: p.array(ast.thisExpression()),
            }),
            captures.functionExpression.record({
              match: convertibleFunctionExpression({
                debugName: "functionWithoutThisBinding",
                constraints: [
                  // function is not part of 'bind' expression:
                  (node, context) =>
                    !ast.propertyAccessExpression({
                      expression: convertibleFunctionExpression(),
                      name: ast.identifier({ text: "bind" }),
                    })(context.getTrueParent(node), context),
                  This.hasNoThisReference,
                  This.hasNoArgumentsReference,
                ],
              }),
            })
          ),
          // TODO this would benefit from more sophisticated dataflow analysis
          p.define<ts.Node, Context>(
            "not used as expression in 'new' expression",
            (node, context) =>
              p.not(
                ast.newExpression({
                  expression: p.same(node),
                })
              )(context.getTrueParent(node), context)
          )
        )
      ),
      captures,
    };
  }
}
