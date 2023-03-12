import {
  AssignmentOperatorMapping,
  capture,
  Context,
  isAncestor,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  ConvertIfElseToConditionalExpressionCaptures,
  ConvertIfElseToConditionalExpressionMatch,
} from "./ConvertIfElseToConditionalExpressionMatch";

const { ast, path } = m;

export class ConvertIfElseToConditionalExpressionMatcher extends PatternMatcher<ConvertIfElseToConditionalExpressionMatch> {
  candidates = {
    nodes: [
      ts.SyntaxKind.Block,
      ts.SyntaxKind.CaseClause,
      ts.SyntaxKind.IfStatement,
    ],
  };

  constructor() {
    super(ConvertIfElseToConditionalExpressionMatch);
  }

  createPattern() {
    const captures = {
      ifStatement: capture.node<ts.IfStatement>(),
      whenTrue: capture.node<ts.Expression>(),
      whenFalse: capture.node<ts.Expression>(),
      assignmentOperator: capture.value<ts.BinaryOperator>(),
      assignmentStatement: capture.node<ts.ExpressionStatement>(),
      assignmentTarget:
        capture.node<ts.Identifier | ts.PropertyAccessExpression>(),
      type: capture.value<
        ConvertIfElseToConditionalExpressionCaptures["type"]
      >(),
      standaloneReturnStatement: capture.node<ts.ReturnStatement>(),
      variableDeclaration: capture.node<ts.VariableDeclaration>(),
    };

    function captureReturn(
      capture: capture.ValueCapture<ts.Expression, Context>
    ) {
      return ast.returnStatement({
        expression: p.isDefined(capture.record()),
      });
    }

    function captureAssignment(
      capture: capture.ValueCapture<ts.Expression, Context>,
      assignmentOperator: p.Predicate<
        ts.BinaryOperator,
        Context
      > = p.includedIn(
        ts.SyntaxKind.EqualsToken,
        ...AssignmentOperatorMapping.getAssignmentOperators()
      )
    ) {
      return ast.expressionStatement({
        expression: ast.binaryExpression({
          left: captures.assignmentTarget.record({
            match: p.or(
              ast.identifier(),
              ast.propertyAccessExpression(),
              ast.elementAccessExpression()
            ),
          }),
          operator: captures.assignmentOperator.record({
            match: assignmentOperator,
          }),
          right: capture.record(),
        }),
      });
    }

    const matchIfReturn = p.lastArrayElements(
      captures.ifStatement.record({
        match: ast.ifStatement({
          thenStatement: ast.singleStatementInOptionalBlock({
            statement: captureReturn(captures.whenTrue),
          }),
          elseStatement: p.isUndefined,
        }),
      }),
      captures.standaloneReturnStatement.record({
        match: captureReturn(captures.whenFalse),
      })
    );

    return {
      match: p.or(
        captures.type.record({
          value: "if-else-return",
          match: captures.ifStatement.record({
            match: ast.ifStatement({
              thenStatement: ast.singleStatementInOptionalBlock({
                statement: captureReturn(captures.whenTrue),
              }),
              elseStatement: ast.singleStatementInOptionalBlock({
                statement: captureReturn(captures.whenFalse),
              }),
            }),
          }),
        }),
        captures.type.record({
          value: "if-return",
          match: p.or(
            ast.block({
              statements: matchIfReturn,
            }),
            ast.caseClause({
              statements: matchIfReturn,
            })
          ),
        }),
        captures.type.record({
          value: "if-else-assignment",
          match: captures.ifStatement.record({
            match: ast.ifStatement({
              thenStatement: ast.singleStatementInOptionalBlock({
                statement: captures.assignmentStatement.record({
                  match: captureAssignment(captures.whenTrue),
                }),
              }),
              elseStatement: ast.singleStatementInOptionalBlock({
                statement: captureAssignment(captures.whenFalse),
              }),
            }),
          }),
        }),

        captures.type.record({
          value: "declaration-if-assignment",
          match: ast.ifStatement({
            thenStatement: ast.singleStatementInOptionalBlock({
              statement: captures.assignmentStatement.record({
                match: captureAssignment(
                  captures.whenTrue,
                  p.same<ts.BinaryOperator, Context>(ts.SyntaxKind.EqualsToken)
                ),
              }),
            }),
            elseStatement: p.isUndefined,
            constraints: [
              // TODO extract matcher for single variable declaration
              path.previousStatement(
                ast.variableStatement({
                  declarationList: ast.variableDeclarationList({
                    declarations: p.array(
                      ast.variableDeclaration({
                        name: captures.assignmentTarget.record({
                          match: ast.identifier(),
                        }),
                        initializer: p.isDefined(captures.whenFalse.record()),
                        constraints: [captures.variableDeclaration.record()],
                      })
                    ),
                  }),
                })
              ),
              captures.ifStatement.record(),
            ],
          }),
        })
      ),
      captures,
    };
  }

  verifyMatch(match: ConvertIfElseToConditionalExpressionMatch): boolean {
    if (match.captures.type !== "declaration-if-assignment") {
      return true;
    }

    const identifier = match.captures.assignmentTarget as ts.Identifier;
    const binding = match.context.getBinding(identifier);

    return !binding?.references.some((reference) => {
      const referenceIdentifier = reference.identifier;

      if (match.captures.assignmentTarget === referenceIdentifier) {
        return false;
      }

      return isAncestor(referenceIdentifier, match.captures.ifStatement);
    });
  }
}
