import {
  Binding,
  capture,
  VariableDeclarationKind,
  matchers as m,
  PatternMatcher,
  predicates as p,
  Context,
} from "@p42/engine";
import ts from "typescript";
import {
  ArrayLoopMatch,
  ArrayMatchCaptures,
  ArrayMatchData,
  ArrayMatchNode,
} from "./ArrayLoopMatch";

const { ast } = m;

export class ForLoopMatcher extends PatternMatcher<ArrayLoopMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ForStatement],
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
      counterName: capture.value<string>(), // internal capture
      arrayExpression: capture.node<ts.Expression>(),
      elementBinding: capture.value<Binding>(),
      indexBinding: capture.value<Binding>(),
      body: capture.node<ts.Statement>(),
      sizeBinding: capture.value<Binding | undefined>(),
    };

    const lengthExpression = ast.propertyAccessExpression({
      expression: captures.arrayExpression.record({
        match: ast.expression(),
        overwrite: true,
      }),
      name: ast.identifier({ text: "length" }),
    });

    return {
      match: ast.forStatement({
        initializer: ast.variableDeclarationList({
          declarations: p.array(
            ast.variableDeclaration({
              name: ast.identifier({
                text: captures.counterName.record(),
                binding: captures.indexBinding.record({
                  match: (binding) =>
                    binding != null &&
                    binding?.references.length >= 3 && // at least declare + compare + increment
                    binding.nonDeclarationWriteReferences.length === 1, // only increment
                }),
              }),
              initializer: ast.numericLiteral({ text: "0" }),
            })
          ),
        }),
        condition: ast.binaryExpression({
          operator: ts.SyntaxKind.LessThanToken,
          left: ast.identifier({ text: captures.counterName.record() }),
          right: p.or(
            lengthExpression,
            ast.identifier({
              binding: captures.sizeBinding.record({
                match: (binding, context) => {
                  // when there is no binding, i.e. there is no resolved variable definition, don't match:
                  if (binding == null) {
                    return false;
                  }

                  // the binding is not global:
                  if (binding.isGlobal) {
                    return false;
                  }

                  // the binding is changed:
                  if (!binding.isConstant) {
                    return false;
                  }

                  // declarator should be a length expression:
                  // TODO this is problematic bc we assume the parent is a variable declarator
                  return lengthExpression(
                    (binding.declaringNodes[0].parent as ts.VariableDeclaration)
                      .initializer,
                    context
                  );
                },
              }),
            })
          ),
        }),
        incrementor: ast.updateExpression({
          operator: ts.SyntaxKind.PlusPlusToken,
          operand: ast.identifier({ text: captures.counterName.record() }),
        }),
        statement: captures.body.record({
          match: ast.block({
            statements: p.or(
              captures.elementBinding.checkpoint(
                p.some(
                  ast.variableStatement({
                    declarationList: ast.variableDeclarationList({
                      kind: [
                        VariableDeclarationKind.Let,
                        VariableDeclarationKind.Const,
                      ],
                      declarations: p.some(
                        ast.variableDeclaration({
                          name: ast.identifier({
                            binding: captures.elementBinding.record(),
                          }),
                          initializer: ast.elementAccessExpression({
                            expression: captures.arrayExpression.record({
                              match: ast.expression(),
                            }),
                            argumentExpression: ast.identifier({
                              text: captures.counterName.record(),
                            }),
                          }),
                        })
                      ),
                    }),
                  })
                )
              ),
              p.any
            ),
          }),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(): ArrayLoopMatch["data"] {
    return {
      type: "for-element",
      typeLabel: "for",
    };
  }
}
