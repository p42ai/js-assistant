import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  matchers,
  NodeRange,
  Range,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertArrayFilterToFindMatch } from "./ConvertArrayFilterToFindMatch";

export class ConvertArrayFilterToFindTransformation extends Transformation<ConvertArrayFilterToFindMatch> {
  async apply(match: ConvertArrayFilterToFindMatch, tree: TransformedNodeTree) {
    tree.replace(match.node, match.captures.filterCall);
    tree.replace(
      match.captures.filterName,
      tree.updateIdentifier(match.captures.filterName, {
        text: "find",
      })
    );
  }

  analyzeSafety(match: ConvertArrayFilterToFindMatch): Safety {
    const messages = new SafetyMessageList();

    if (match.context.scriptMetadata.isTypeScript()) {
      messages.information("adds 'undefined' to type");
    }

    if (!matchers.type.array(match.captures.target, match.context)) {
      messages.warning("target might not be an array");
    }

    return messages.produceSafe();
  }

  getSuggestion(
    match: ConvertArrayFilterToFindMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can convert a '.filter' expression to '.find'.",
      shortActionLabel: "Convert",
      highlightRanges: [
        NodeRange.node(match.captures.filterName),
        new Range(
          NodeRange.childToken(
            match.node,
            ts.SyntaxKind.OpenBracketToken
          ).start,
          NodeRange.childToken(match.node, ts.SyntaxKind.CloseBracketToken).end
        ),
      ],
    };
  }

  getActionZones(
    match: ConvertArrayFilterToFindMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to .find", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
