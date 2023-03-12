import {
  capture,
  isBlockLike,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { MergeVariableDeclarationAndInitializationCandidate } from "./MergeVariableDeclarationAndInitializationCandidate";

const { ast, constraint } = m;

export class MergeVariableDeclarationAndInitializationMatcher extends PatternMatcher<MergeVariableDeclarationAndInitializationCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  getCandidateChildren(node: ts.Node) {
    if (isBlockLike(node)) {
      const variableStatements = node.statements.filter((statement) =>
        ts.isVariableStatement(statement)
      ) as Array<ts.VariableStatement>;

      return variableStatements.flatMap(
        (statement) => statement.declarationList.declarations
      );
    }
  }

  createPattern() {
    const captures = {
      variableName: capture.value<string>(),
      assignmentExpression: capture.node<ts.ExpressionStatement>(),
      initializer: capture.node<ts.Expression>(),
    };

    const variableStatement = capture.temporaryValue<ts.Statement>();

    return {
      match: ast.variableDeclaration({
        name: ast.identifier({
          text: captures.variableName.record(),
        }),
        initializer: p.isUndefined,
        parent: ast.variableDeclarationList({
          declarations: constraint.hasExactlyOneElement,
          parent: variableStatement.record(
            ast.variableStatement({
              parent: ast.blockLike({
                statements: m.statementAfter(
                  variableStatement,
                  captures.assignmentExpression.record({
                    match: ast.expressionStatement({
                      expression: ast.binaryExpression({
                        left: ast.identifier({
                          text: captures.variableName.record(),
                        }),
                        operator: ts.SyntaxKind.EqualsToken,
                        right: captures.initializer.record(),
                      }),
                    }),
                  })
                ),
              }),
            })
          ),
        }),
      }),
      captures,
    };
  }
}
