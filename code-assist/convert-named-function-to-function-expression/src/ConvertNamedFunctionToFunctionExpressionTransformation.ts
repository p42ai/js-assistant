
import {
  ActionZone,
  createActionZones,
  Modifiers,
  NodeRange,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertNamedFunctionToFunctionExpressionCandidate } from "./ConvertNamedFunctionToFunctionExpressionCandidate";

export class ConvertNamedFunctionToFunctionExpressionTransformation extends Transformation<ConvertNamedFunctionToFunctionExpressionCandidate> {
  async apply(
    match: ConvertNamedFunctionToFunctionExpressionCandidate,
    tree: TransformedNodeTree
  ) {
    const namedFunction = match.node;

    const exportModifier = Modifiers.findExport(namedFunction);

    tree.replace(
      namedFunction,
      tree.createVariableStatement({
        modifiers: exportModifier != null ? [exportModifier] : undefined,
        declarationList: tree.createVariableDeclarationList({
          flags: ts.NodeFlags.Const,
          declarations: [
            tree.createVariableDeclaration({
              name: namedFunction.name!,
              initializer: tree.createFunctionExpression({
                parameters: namedFunction.parameters.slice(),
                body: namedFunction.body!,
                type: namedFunction.type,
                typeParameters: namedFunction.typeParameters?.slice(),
                modifiers: Modifiers.withoutExport(namedFunction),
                asteriskToken: namedFunction.asteriskToken,
              }),
            }),
          ],
        }),
      })
    );
  }

  analyzeSafety(
    match: ConvertNamedFunctionToFunctionExpressionCandidate
  ): Safety {
    return Safety.unknown();
  }

  getActionZones(
    match: ConvertNamedFunctionToFunctionExpressionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to 'const … = function(…)'", [
      {
        range: NodeRange.node(match.node.name!),
      },
      {
        range: NodeRange.functionLabel(match.node),
      },
    ]);
  }
}
