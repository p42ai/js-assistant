
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  isSideEffectFree,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  SwitchStatement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { SimplifySwitchMatch } from "./SimplifySwitchMatch";

export class SimplifySwitchTransformation extends Transformation<SimplifySwitchMatch> {
  async apply(match: SimplifySwitchMatch, tree: TransformedNodeTree) {
    const root = ts.isLabeledStatement(match.node.parent)
      ? match.node.parent
      : match.node;

    const defaultClause = SwitchStatement.getDefaultClause(match.node);

    if (defaultClause != null) {
      let statements = defaultClause.statements.slice();

      if (statements.length === 1 && ts.isBlock(statements[0])) {
        statements = statements[0].statements.slice();
      }

      if (statements.length > 0) {
        const lastStatement = statements[statements.length - 1];

        if (
          ts.isBreakStatement(lastStatement) &&
          (lastStatement.label == null ||
            (ts.isLabeledStatement(root) &&
              lastStatement.label.text === root.label.text))
        ) {
          statements.pop();
        }

        const replacement = match.containsVariableStatement()
          ? [tree.createBlock({ statements })]
          : statements;

        tree.insertStatementsAfter(root, ...replacement);
      }
    }

    tree.remove(root);
  }

  analyzeSafety(match: SimplifySwitchMatch): Safety {
    const messages = new SafetyMessageList();

    if (!isSideEffectFree(match.node.expression, match.context)) {
      messages.warning("condition could have side-effect");
    }

    return messages.produceSafe();
  }

  getSuggestion(match: SimplifySwitchMatch, safety: Safety): Suggestion | null {
    return {
      description: `You can ${
        SwitchStatement.hasDefaultClause(match.node)
          ? "simplify the"
          : "remove the empty"
      } switch statement.`,
      shortActionLabel: SwitchStatement.hasDefaultClause(match.node)
        ? "Simplify"
        : "Remove",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: SimplifySwitchMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `${
        SwitchStatement.hasDefaultClause(match.node) ? "Simplify" : "Remove"
      } switch statement`,
      [
        {
          range: NodeRange.node(match.node),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
      ]
    );
  }
}
