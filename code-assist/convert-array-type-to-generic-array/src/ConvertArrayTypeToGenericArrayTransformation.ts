
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertArrayTypeToGenericArrayMatch } from "./ConvertArrayTypeToGenericArrayMatch";

export class ConvertArrayTypeToGenericArrayTransformation extends Transformation<ConvertArrayTypeToGenericArrayMatch> {
  async apply(
    match: ConvertArrayTypeToGenericArrayMatch,
    tree: TransformedNodeTree
  ) {
    tree.replace(
      match.node,
      tree.createTypeReferenceNode({
        typeName: tree.createIdentifier({
          text: "Array",
        }),
        typeArguments: [match.node.elementType],
      })
    );
  }

  analyzeSafety(match: ConvertArrayTypeToGenericArrayMatch): Safety {
    const messages = new SafetyMessageList();
    return messages.produceSafe();
  }

  getSuggestion(
    match: ConvertArrayTypeToGenericArrayMatch,
    safety: Safety
  ): Suggestion | null {
    return {
      description: "You can convert [] into Array<…>",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertArrayTypeToGenericArrayMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert [] to Array<…>", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
