
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  factory,
  isGlobalNaN,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import { ConvertArrayIndexOfToArrayIncludesMatch } from "./ConvertArrayIndexOfToArrayIncludesMatch";

export class ConvertArrayIndexOfToArrayIncludesTransformation extends Transformation<ConvertArrayIndexOfToArrayIncludesMatch> {
  async apply(
    match: ConvertArrayIndexOfToArrayIncludesMatch,
    tree: TransformedNodeTree
  ) {
    const updatedCall = tree.updateCallExpression(match.captures.indexOfCall, {
      expression: tree.updatePropertyAccessExpression(
        match.captures.indexOfPropertyAccess,
        {
          name: tree.createIdentifier({
            text: "includes",
          }),
        }
      ),
    });

    tree.replace(
      match.node,
      match.captures.isNegated
        ? factory.negateExpression(updatedCall, tree, match.context)
        : updatedCall
    );
  }

  // TODO multiple warning support
  analyzeSafety(match: ConvertArrayIndexOfToArrayIncludesMatch): Safety {
    const nanText = "changes behavior for NaN";
    const { typeSystem } = match.context;
    const arrayNode = match.captures.indexOfPropertyAccess.expression;
    const { firstParameter } = match.captures;
    const { targetType } = match.data;

    const isFirstParameterNaN = isGlobalNaN(firstParameter, match.context);
    const isArray = typeSystem.isArrayType(targetType);

    if (!isArray) {
      return Safety[isFirstParameterNaN ? "error" : "warning"](
        `'${arrayNode.getText()}' might not be an array; ${nanText}`
      );
    }

    if (isFirstParameterNaN) {
      return Safety.error(nanText);
    }

    const canFirstParameterBeNumber = typeSystem.isTypeAssignableTo(
      typeSystem.getNumberType(),
      typeSystem.getType(firstParameter)!
    );

    if (!canFirstParameterBeNumber) {
      return Safety.safe();
    }

    const canArrayContainNumbers = typeSystem.isTypeAssignableTo(
      typeSystem.getNumberType(),
      typeSystem.getElementTypeOfArrayType(targetType)
    );

    return canArrayContainNumbers ? Safety.warning(nanText) : Safety.safe();
  }

  getSuggestion(
    match: ConvertArrayIndexOfToArrayIncludesMatch,
    safety: Safety
  ): Suggestion | null {
    if (safety.isError()) {
      return null;
    }

    return {
      description:
        "You can convert an array '.indexOf()' call to an '.includes()' call.",
      shortActionLabel: "Convert",
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: ConvertArrayIndexOfToArrayIncludesMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to .includes()", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
