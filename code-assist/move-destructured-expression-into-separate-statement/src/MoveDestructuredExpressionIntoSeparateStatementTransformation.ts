
import {
  ActionZone,
  BindingElement,
  CodeAssistLevel,
  createActionZones,
  factory,
  getRemovalNode,
  NodeRange,
  Safety,
  SafetyMessageList,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { MoveDestructuredExpressionIntoSeparateStatementMatch } from "./MoveDestructuredExpressionIntoSeparateStatementMatch";

export class MoveDestructuredExpressionIntoSeparateStatementTransformation extends Transformation<MoveDestructuredExpressionIntoSeparateStatementMatch> {
  async apply(
    match: MoveDestructuredExpressionIntoSeparateStatementMatch,
    tree: TransformedNodeTree
  ) {
    const replacesStatement =
      getRemovalNode(match.node).replacedNode === match.captures.statement;

    const { declarationList } = match.captures.statement;

    const declarations = [
      tree.createVariableDeclaration({
        name: match.node.name,
        initializer: factory.createFlattenedExpressionFromDestructuring({
          bindingElement: match.node,
          baseExpression: match.captures.baseExpression,
          tree,
        }),
      }),
    ];

    if (replacesStatement) {
      tree.replace(
        declarationList,
        tree.updateVariableDeclarationList(declarationList, {
          declarations,
        })
      );
    } else {
      tree.remove(match.node);
      tree.insertStatementsAfter(
        Statement.getStatementAncestor(match.node),
        tree.createVariableStatement({
          modifiers: match.captures.statement.modifiers?.slice(0),
          declarationList: tree.createVariableDeclarationList({
            flags: declarationList.flags,
            declarations,
          }),
        })
      );
    }
  }

  analyzeSafety(
    match: MoveDestructuredExpressionIntoSeparateStatementMatch
  ): Safety {
    const messages = new SafetyMessageList();

    if (BindingElement.hasDefault(match.node)) {
      messages.error("removes default application");
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: MoveDestructuredExpressionIntoSeparateStatementMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Extract into separate variable declaration", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
