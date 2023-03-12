
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertFunctionToObjectMethodCandidate } from "./ConvertFunctionToObjectMethodCandidate";

export class ConvertFunctionToObjectMethodTransformation extends Transformation<ConvertFunctionToObjectMethodCandidate> {
  async apply(
    match: ConvertFunctionToObjectMethodCandidate,
    tree: TransformedNodeTree
  ) {
    const originalAssignment = match.node;
    const originalFunction = match.captures.functionExpression;

    tree.replace(
      originalAssignment,
      tree.createMethodDeclaration({
        name: originalAssignment.name,
        body: originalFunction.body,
        parameters: originalFunction.parameters.slice(),
        type: originalFunction.type,
        modifiers: originalFunction.modifiers?.slice(),
        typeParameters: originalFunction.typeParameters?.slice(),
        asteriskToken: originalFunction.asteriskToken,
      })
    );
  }

  analyzeSafety(match: ConvertFunctionToObjectMethodCandidate): Safety {
    return Safety.safe();
  }

  getSuggestion(
    match: ConvertFunctionToObjectMethodCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can convert the function property assignment '${match.captures.name}' into a method declaration.`,
      shortActionLabel: "Convert",
      highlightRanges: [
        new Range(
          match.node.getStart(),
          match.captures.functionExpression.body.getStart() - 1
        ),
      ],
    };
  }

  getActionZones(
    match: ConvertFunctionToObjectMethodCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to method declaration", [
      {
        range: NodeRange.node(match.node.name),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
