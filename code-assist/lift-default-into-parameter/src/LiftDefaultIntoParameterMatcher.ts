
import EqualityCheckAugmentation from "@p42/augmentation-equality-check";
import NullishCheckAugmentation, {
  nullishCheck,
} from "@p42/augmentation-nullish-check";
import UndefinedAliasAugmentation from "@p42/augmentation-undefined-alias";
import UndefinedCheckAugmentation, {
  undefinedCheck,
} from "@p42/augmentation-undefined-check";
import {
  capture,
  getFunctionScopeNode,
  matchers as m,
  NamedFunctionCallsAugmentation,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { LiftDefaultIntoParameterCandidate } from "./LiftDefaultIntoParameterCandidate";

const { ast } = m;

export class LiftDefaultIntoParameterMatcher extends PatternMatcher<LiftDefaultIntoParameterCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.Parameter],
  };

  requiredAugmentations = [
    UndefinedAliasAugmentation,
    EqualityCheckAugmentation,
    NullishCheckAugmentation,
    UndefinedCheckAugmentation,
  ];

  createPattern() {
    const captures = {
      defaultExpressionStatement: capture.node<ts.ExpressionStatement>(),
      defaultExpression: capture.node<ts.Expression>(),
      parameterName: capture.value<string>(),
      type: capture.value<"falsy" | "nullish" | "undefined">(),
    };

    const parameterIdentifier = ast.identifier({
      text: captures.parameterName.record(),
    });

    return {
      match: ast.parameter({
        // no object / array expressions for now:
        name: ast.identifier({
          bindingReference: (parameterReference, context) => {
            if (parameterReference == null) {
              return false;
            }

            const { binding } = parameterReference;
            const parameterScope = binding.scope;
            const parameter = parameterReference.identifier;

            // TODO there could be name collision and modification bugs here
            // TODO there could be bugs when modifications happen in hoisted functions)
            const areAllReferencesAvailableAtParameterDefinition = (
              defaultExpression: ts.Expression
            ) =>
              context
                .getDescendants(defaultExpression)
                .filter(ts.isIdentifier, context)
                .every((identifier) => {
                  // values from default expression must not have been changed between
                  // the parameter definition and the default expression:
                  if (
                    context
                      .getBinding(identifier)
                      ?.writeReferences.some(
                        (writeReference) =>
                          parameterReference.identifier.pos <
                            writeReference.identifier.pos &&
                          writeReference.identifier.pos < identifier.pos
                      )
                  ) {
                    return false;
                  }

                  return parameterScope.hasBinding(identifier.text, parameter);
                }, context);

            const isNotUsedBeforeInitialization = (
              defaultExpression: ts.BinaryExpression
            ): boolean => {
              const identifier = defaultExpression.left;
              const parameterScopeNode = getFunctionScopeNode(parameter);

              return !binding.references
                .filter(
                  (reference) =>
                    reference.identifier !== binding.declaringNodes[0]
                )
                .some((reference) => {
                  const referenceScopeNode = getFunctionScopeNode(
                    reference.identifier
                  );

                  // when in the same scope, parameter must not be used before default assignment
                  if (referenceScopeNode === parameterScopeNode) {
                    return m.isBefore(identifier)(reference.identifier);
                  }

                  // reference scope must be a function declaration in order for it to be hoisted
                  if (!ts.isFunctionDeclaration(referenceScopeNode)) {
                    return false;
                  }

                  return NamedFunctionCallsAugmentation.getValue(
                    referenceScopeNode,
                    context
                  )!.some(m.isBefore(identifier), context);
                });
            };

            const defaultExpression = captures.defaultExpression.record({
              match: areAllReferencesAvailableAtParameterDefinition,
            });

            const matcher = captures.defaultExpressionStatement.record({
              match: ast.expressionStatement({
                expression: p.or(
                  ast.binaryExpression({
                    left: parameterIdentifier,
                    operator: ts.SyntaxKind.EqualsToken,
                    right: p.or(
                      captures.type.record({
                        value: "nullish",
                        match: ast.binaryExpression({
                          left: parameterIdentifier,
                          operator: ts.SyntaxKind.QuestionQuestionToken,
                          right: defaultExpression,
                        }),
                      }),
                      captures.type.record({
                        value: "falsy",
                        match: ast.binaryExpression({
                          left: parameterIdentifier,
                          operator: ts.SyntaxKind.BarBarToken,
                          right: defaultExpression,
                        }),
                      }),
                      ast.conditionalExpression({
                        condition: p.or(
                          captures.type.record({
                            value: "falsy",
                            match: parameterIdentifier,
                          }),
                          captures.type.record({
                            value: "nullish",
                            match: nullishCheck({
                              checkedExpression: parameterIdentifier,
                              isNegated: true,
                            }),
                          }),
                          captures.type.record({
                            value: "undefined",
                            match: undefinedCheck({
                              checkedExpression: parameterIdentifier,
                              isNegated: true,
                            }),
                          })
                        ),
                        whenTrue: parameterIdentifier,
                        whenFalse: defaultExpression,
                      }),
                      ast.conditionalExpression({
                        condition: p.or(
                          captures.type.record({
                            value: "nullish",
                            match: nullishCheck({
                              checkedExpression: parameterIdentifier,
                              isNegated: false,
                            }),
                          }),
                          captures.type.record({
                            value: "undefined",
                            match: undefinedCheck({
                              checkedExpression: parameterIdentifier,
                              isNegated: false,
                            }),
                          })
                        ),
                        whenTrue: defaultExpression,
                        whenFalse: parameterIdentifier,
                      })
                    ),
                    constraints: [isNotUsedBeforeInitialization],
                  }),
                  captures.type.record({
                    value: "falsy",
                    match: ast.binaryExpression({
                      left: parameterIdentifier,
                      operator: ts.SyntaxKind.BarBarEqualsToken,
                      right: defaultExpression,
                      constraints: [isNotUsedBeforeInitialization],
                    }),
                  })
                ),
              }),
            });

            return matcher(
              binding.writeReferences[0]?.identifier.parent?.parent,
              context
            );
          },
        }),
        initializer: p.isUndefined,
        constraints: [
          (parameter) => !ts.isSetAccessorDeclaration(parameter.parent),
        ],
      }),
      captures,
    };
  }
}
