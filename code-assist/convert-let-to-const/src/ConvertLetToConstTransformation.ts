import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationKind,
} from "@p42/engine";
import { ConvertLetToConstCandidate } from "./ConvertLetToConstCandidate";

export class ConvertLetToConstTransformation extends Transformation<ConvertLetToConstCandidate> {
  async apply(match: ConvertLetToConstCandidate, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.updateVariableDeclarationList(match.node, {
        declarations: match.node.declarations.slice(0),
        flags: VariableDeclarationKind.Const.set(match.node.flags),
      })
    );
  }

  analyzeSafety(match: ConvertLetToConstCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertLetToConstCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can convert 'let' to 'const'.",
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.variableDeclarationList(match.node)],
    };
  }

  getActionZones(
    match: ConvertLetToConstCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to const", [
      {
        range: NodeRange.variableDeclarationList(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
      {
        range: NodeRange.node(match.node),
      },
    ]);
  }

  getHighlightRanges(match: ConvertLetToConstCandidate) {
    return [NodeRange.variableDeclarationList(match.node)];
  }
}
