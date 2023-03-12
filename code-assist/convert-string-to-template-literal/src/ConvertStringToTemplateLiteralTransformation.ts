import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  escapeTextForTemplate,
  getRawText,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertStringToTemplateLiteralCandidate } from "./ConvertStringToTemplateLiteralCandidate";

export class ConvertStringToTemplateLiteralTransformation extends Transformation<ConvertStringToTemplateLiteralCandidate> {
  async apply(
    match: ConvertStringToTemplateLiteralCandidate,
    tree: TransformedNodeTree
  ) {
    const replacement = tree.createNoSubstitutionTemplateLiteral({
      text: escapeTextForTemplate(getRawText(match.node)),
    });

    tree.replace(match.node, replacement);

    return EditorOperation.compose(
      EditorOperation.keepExistingSelection(
        tree,
        match.node,
        replacement,
        match.context
      )
    );
  }

  analyzeSafety(match: ConvertStringToTemplateLiteralCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(
    match: ConvertStringToTemplateLiteralCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to template literal", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.PreferredQuickFix,
      },
    ]);
  }
}
