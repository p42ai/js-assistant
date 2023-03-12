
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  IfStatement,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { RemoveRedundantElseMatch } from "./RemoveRedundantElseMatch";

export class RemoveRedundantElseTransformation extends Transformation<RemoveRedundantElseMatch> {
  async apply(match: RemoveRedundantElseMatch, tree: TransformedNodeTree) {
    tree.replace(match.node.elseStatement!, match.captures.elseIfBody);
  }

  analyzeSafety(match: RemoveRedundantElseMatch): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: RemoveRedundantElseMatch,
    safety: Safety
  ): Suggestion | null {
    const { elseIf } = match.captures;

    const highlightRanges = [
      new Range(elseIf.getStart(), elseIf.expression.end + 1),
    ];

    if (match.hasElseStatement()) {
      highlightRanges.push(
        new Range(
          IfStatement.getElseKeyword(elseIf)!.getStart(),
          elseIf.elseStatement!.end
        )
      );
    }

    return {
      description: match.hasElseStatement()
        ? "You can remove the redundant else-if condition and the unreachable else."
        : "You can remove the redundant else-if condition.",
      shortActionLabel: "Remove",
      highlightRanges,
    };
  }

  getActionZones(
    match: RemoveRedundantElseMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      match.hasElseStatement()
        ? "Remove redundant condition and unreachable else"
        : "Remove redundant condition",
      [
        {
          range: match.hasElseStatement()
            ? NodeRange.ifStatementElseKeyword(match.captures.elseIf)
            : NodeRange.ifStatementIfKeyword(match.captures.elseIf),
          level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
        },
        {
          range: NodeRange.node(match.captures.elseIf),
        },
      ]
    );
  }
}
