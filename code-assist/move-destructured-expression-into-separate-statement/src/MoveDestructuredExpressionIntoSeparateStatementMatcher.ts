
import { capture, matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { MoveDestructuredExpressionIntoSeparateStatementMatch } from "./MoveDestructuredExpressionIntoSeparateStatementMatch";

const { ast, path } = m;

export class MoveDestructuredExpressionIntoSeparateStatementMatcher extends PatternMatcher<MoveDestructuredExpressionIntoSeparateStatementMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.BindingElement],
  };

  constructor() {
    super(MoveDestructuredExpressionIntoSeparateStatementMatch);
  }

  createPattern() {
    const captures = {
      baseExpression: capture.node<ts.Expression>(),
      statement: capture.node<ts.VariableStatement>(),
    };

    return {
      match: ast.bindingElement({
        constraints: [
          path.declarationRoot(
            ast.variableDeclaration({
              initializer: captures.baseExpression.record(),
              parent: ast.variableDeclarationList({
                parent: ast.variableStatement({
                  constraints: [captures.statement.record()],
                }),
              }),
            })
          ),
        ],
      }),
      captures,
    };
  }
}
