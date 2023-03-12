
import {
  Binding,
  capture,
  Context,
  Expression,
  isNodeStructureEqual,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import {
  ReplaceExpressionWithExistingVariableMatch,
  ReplaceExpressionWithExistingVariableMatchType,
} from "./ReplaceExpressionWithExistingVariableMatch";

const { ast } = m;

export class ReplaceExpressionWithExistingVariableMatcher extends PatternMatcher<ReplaceExpressionWithExistingVariableMatch> {
  candidates = {
    nodes: Expression.SYNTAX_KINDS.filter(
      (kind) =>
        // TODO convert to includes automated refactoring
        kind !== ts.SyntaxKind.OmittedExpression &&
        kind !== ts.SyntaxKind.YieldExpression &&
        kind !== ts.SyntaxKind.AwaitExpression &&
        kind !== ts.SyntaxKind.SpreadElement &&
        kind !== ts.SyntaxKind.DeleteExpression
    ),
  };

  createMatch(
    node: ReplaceExpressionWithExistingVariableMatchType["node"],
    captures: ReplaceExpressionWithExistingVariableMatchType["captures"],
    data: ReplaceExpressionWithExistingVariableMatchType["data"],
    context: Context
  ): ReplaceExpressionWithExistingVariableMatch {
    return new ReplaceExpressionWithExistingVariableMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      binding: capture.value<Binding>(),
      variableDeclaration: capture.node<ts.VariableDeclaration>(),
    };

    return {
      match: ast.expression({
        constraints: [
          (expression, context) => {
            const scope = context.getScope(expression);
            const bindings = [...scope.getBindings().values()]
              .filter((binding) => !binding.isGlobal && binding.isConstant)
              .filter((binding) => {
                const declaration = binding.declaringNodes[0];
                const { parent } = declaration;
                return (
                  ts.isVariableDeclaration(parent) && parent.initializer != null
                );
              });

            for (const binding of bindings) {
              const declaration = binding.declaringNodes[0];
              const parent = declaration.parent as ts.VariableDeclaration;

              if (
                expression !== parent.initializer &&
                declaration.pos <= expression.pos &&
                isNodeStructureEqual(expression, parent.initializer, context)
              ) {
                captures.variableDeclaration.record()(parent, context);
                captures.binding.record()(binding, context);
                return true;
              }
            }

            return false;
          },
        ],
      }),
      captures,
    };
  }
}
