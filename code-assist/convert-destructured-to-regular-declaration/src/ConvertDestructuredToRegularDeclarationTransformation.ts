
import {
  ActionZone,
  BindingElement,
  CodeAssistLevel,
  createActionZones,
  factory,
  NodeRange,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertDestructuredToRegularDeclarationMatch } from "./ConvertDestructuredToRegularDeclarationMatch";

export class ConvertDestructuredToRegularDeclarationTransformation extends Transformation<ConvertDestructuredToRegularDeclarationMatch> {
  getImpactedNodes(
    match: ConvertDestructuredToRegularDeclarationMatch
  ): ts.Node[] {
    return [match.variableDeclarationList];
  }

  async apply(
    match: ConvertDestructuredToRegularDeclarationMatch,
    tree: TransformedNodeTree
  ) {
    const declarations = match.data.bindings.map((bindingElement) =>
      tree.createVariableDeclaration({
        name: bindingElement.name as ts.Identifier,
        initializer: factory.createFlattenedExpressionFromDestructuring({
          bindingElement,
          baseExpression: match.captures.initializer,
          tree,
        }),
      })
    );

    for (let i = 1; i < declarations.length; i++) {
      tree.forceLeadingNewLine(declarations[i]);
    }

    const { variableDeclarationList } = match;
    const newDeclarations = variableDeclarationList.declarations.slice();
    newDeclarations.splice(0, 1, ...declarations);

    tree.replace(
      match.node.parent,
      tree.updateVariableDeclarationList(variableDeclarationList, {
        declarations: newDeclarations,
      })
    );
  }

  analyzeSafety(match: ConvertDestructuredToRegularDeclarationMatch): Safety {
    const messages = new SafetyMessageList();

    if (
      match.data.bindings.some((bindingElement) =>
        BindingElement.hasDefault(bindingElement)
      )
    ) {
      messages.error("removes default application");
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: ConvertDestructuredToRegularDeclarationMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      "Convert destructuring to regular variable declaration",
      [
        {
          range: NodeRange.node(match.node),
          level: CodeAssistLevel.QuickFix,
        },
      ]
    );
  }
}
