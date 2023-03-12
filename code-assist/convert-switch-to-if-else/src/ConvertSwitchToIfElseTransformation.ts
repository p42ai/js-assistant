
import {
  ActionZone,
  BinaryExpression,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertSwitchToIfElseMatch } from "./ConvertSwitchToIfElseMatch";
import { parseSwitchBlocks } from "./parseSwitchBlocks";

export class ConvertSwitchToIfElseTransformation extends Transformation<ConvertSwitchToIfElseMatch> {
  async apply(match: ConvertSwitchToIfElseMatch, tree: TransformedNodeTree) {
    const switchBlocks = parseSwitchBlocks(match.node, tree);

    let currentElse: ts.Statement | undefined = switchBlocks.elseBlock;

    for (const part of switchBlocks.cases.reverse()) {
      currentElse = tree.createIfStatement({
        expression: BinaryExpression.combineWithOperator(
          part.conditions.map((condition) =>
            tree.createBinaryExpression({
              left: match.node.expression,
              operator: ts.SyntaxKind.EqualsEqualsEqualsToken,
              right: condition,
            })
          ),
          ts.SyntaxKind.BarBarToken,
          tree
        )!,
        thenStatement: part.block,
        elseStatement: currentElse,
      });
    }

    const ifStatement = currentElse!; // empty switch case cannot happen bc of matcher

    tree.replace(match.node, ifStatement);

    // TODO highlighting
  }

  analyzeSafety(match: ConvertSwitchToIfElseMatch): Safety {
    const messages = new SafetyMessageList();

    return messages.produceUnknown();
  }

  getSuggestion(
    match: ConvertSwitchToIfElseMatch,
    safety: Safety
  ): Suggestion | null {
    const caseClauses = match.caseClauses;

    if (caseClauses.length >= 2) {
      return null;
    }

    return {
      description: `You can convert the switch statement into an ${
        match.hasDefaultClause() ? "if-else" : "if"
      }-statement.`,
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertSwitchToIfElseMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to if-else", [
      {
        range: NodeRange.switchHead(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.Regular,
      },
    ]);
  }
}
