import ts from "typescript";
import { visitSelfAndEachDescendant } from "../ast/visitSelfAndEachDescendant";
import { calculateNodeMetric } from "./calculateNodeMetric";

export const calculateTokenComplexity: calculateNodeMetric<ts.Node> = (f) => {
  let tokenCount = 0;
  visitSelfAndEachDescendant(f, (node) => {
    if (node == null) {
      return 0;
    }

    switch (node.kind) {
      case ts.SyntaxKind.QuestionToken:
      case ts.SyntaxKind.ColonToken:
        break;
      case ts.SyntaxKind.BinaryExpression:
        tokenCount +=
          (node as ts.BinaryExpression).operatorToken.kind ===
          ts.SyntaxKind.EqualsEqualsEqualsToken
            ? 0.9
            : 1;
        break;
      case ts.SyntaxKind.ParenthesizedExpression:
        tokenCount += 1.2;
        break;
      case ts.SyntaxKind.VariableStatement:
        tokenCount += 5;
        break;
      case ts.SyntaxKind.Block:
        tokenCount += (node as ts.Block).statements.length === 0 ? 10 : 0.1;
        break;
      case ts.SyntaxKind.IfStatement: {
        const ifStatement = node as ts.IfStatement;
        tokenCount +=
          !ts.isBlock(ifStatement.thenStatement) ||
          (ifStatement.elseStatement != null &&
            !(
              ts.isIfStatement(ifStatement.elseStatement) ||
              ts.isBlock(ifStatement.elseStatement)
            ))
            ? 2
            : 1;
        break;
      }
      case ts.SyntaxKind.SwitchStatement:
        tokenCount += 1.2;
        break;
      case ts.SyntaxKind.ConditionalExpression:
        tokenCount += ts.isConditionalExpression(node.parent) ? 8 : 1;
        break;
      case ts.SyntaxKind.NoSubstitutionTemplateLiteral:
        tokenCount += 1.05;
        break;
      default:
        tokenCount++;
    }
  });
  return tokenCount;
};
