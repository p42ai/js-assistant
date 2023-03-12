
import {
  ActionZone,
  createActionZones,
  hasDescendant,
  isSideEffectFree,
  matchers as m,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationList,
} from "@p42/engine";
import ts from "typescript";
import { ConvertIfElseToSwitchCandidate } from "./ConvertIfElseToSwitchCandidate";

export class ConvertIfElseToSwitchTransformation extends Transformation<ConvertIfElseToSwitchCandidate> {
  async apply(
    match: ConvertIfElseToSwitchCandidate,
    tree: TransformedNodeTree
  ) {
    function isConvertibleBlock(
      statement: ts.Statement
    ): statement is ts.Block {
      return (
        ts.isBlock(statement) &&
        // when there is a let or const statement, keep the block:
        !statement.statements.some(
          (node) =>
            ts.isVariableStatement(node) &&
            !VariableDeclarationList.isVar(node.declarationList)
        )
      );
    }

    function getClauseStatements(
      originalBody: ts.Statement
    ): Array<ts.Statement> {
      const statements = isConvertibleBlock(originalBody)
        ? originalBody.statements.slice(0)
        : [originalBody];

      if (statements.length === 0) {
        return [tree.createBreakStatement({})];
      }

      const lastStatement =
        statements.length === 1 && ts.isBlock(statements[0])
          ? statements[0].statements[statements[0].statements.length - 1]
          : statements[statements.length - 1];

      return ts.isReturnStatement(lastStatement)
        ? statements
        : statements.concat(tree.createBreakStatement({}));
    }

    const clauses: Array<ts.CaseOrDefaultClause> =
      match.data.groupedConditions.flatMap((expressions, groupIndex) =>
        expressions.map((expression, index) =>
          tree.createCaseClause({
            expression,
            statements:
              index === expressions.length - 1
                ? getClauseStatements(match.captures.bodyList[groupIndex])
                : [],
          })
        )
      );

    if (match.captures.elseBody != null) {
      clauses.push(
        tree.createDefaultClause({
          statements: getClauseStatements(match.captures.elseBody),
        })
      );
    }

    tree.replace(
      match.node,
      tree.createSwitchStatement({
        expression: match.captures.expression,
        caseBlock: tree.createCaseBlock({
          clauses,
        }),
      })
    );
  }

  analyzeSafety(match: ConvertIfElseToSwitchCandidate): Safety {
    // TOD use safety message list
    const messages: Array<string> = [];

    const containsBreakStatement = hasDescendant(
      match.node,
      m.ast.breakStatement(),
      match.context
    );
    if (containsBreakStatement) {
      messages.push("behavior of existing break statements could change");
    }

    const hasLooseComparison = match.captures.operatorList.some(
      (operator) => operator === ts.SyntaxKind.EqualsEqualsToken
    );
    if (hasLooseComparison) {
      messages.push("changes == to strict equality");
    }

    const expressionIsSideEffectFree = isSideEffectFree(
      match.captures.expression,
      match.context
    );
    if (!expressionIsSideEffectFree) {
      messages.push("evaluates expression only once");
    }

    if (containsBreakStatement || hasLooseComparison) {
      return Safety.warning(messages.join("; "));
    }

    const hasMultipleConditionEvaluations =
      match.captures.conditionList.length > 1;

    if (!expressionIsSideEffectFree && hasMultipleConditionEvaluations) {
      return Safety.warning(messages.join("; "));
    }

    return Safety.safe();
  }

  getActionZones(
    match: ConvertIfElseToSwitchCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Convert into switch",
      [
        {
          range: NodeRange.ifStatementIfKeyword(match.node),
        },
      ]
    );
  }
}
