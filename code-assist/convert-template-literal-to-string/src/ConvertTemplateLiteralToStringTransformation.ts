
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertTemplateLiteralToStringCandidate } from "./ConvertTemplateLiteralToStringCandidate";

export class ConvertTemplateLiteralToStringTransformation extends Transformation<ConvertTemplateLiteralToStringCandidate> {
  async apply(
    match: ConvertTemplateLiteralToStringCandidate,
    tree: TransformedNodeTree
  ) {
    const replacement = tree.createStringLiteral({
      text: match.node.rawText!,
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

  analyzeSafety(match: ConvertTemplateLiteralToStringCandidate): Safety {
    return Safety.safe();
  }

  getActionZones(
    match: ConvertTemplateLiteralToStringCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to string", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.PreferredQuickFix,
      },
    ]);
  }
}
