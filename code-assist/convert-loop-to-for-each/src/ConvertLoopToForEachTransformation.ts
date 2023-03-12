
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  NodeRange,
  Range,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertLoopToForEachCandidate } from "./ConvertLoopToForEachCandidate";

const forEachHighlight = (node: ts.Node) =>
  new Range(
    node.getStart(),
    (
      ((node as ts.ExpressionStatement).expression as ts.CallExpression)
        .arguments[0] as ts.ArrowFunction
    ).equalsGreaterThanToken.getEnd()
  );

export class ConvertLoopToForEachTransformation extends Transformation<ConvertLoopToForEachCandidate> {
  async apply(match: ConvertLoopToForEachCandidate, tree: TransformedNodeTree) {
    const { arrayLoop } = match.captures;

    if (arrayLoop.data.type === "for-of") {
      const forEachReplacement = this.replaceMatchNodeWithForEach({
        tree,
        match,
        elementVariable: {
          identifier: tree.createIdentifier({
            text: arrayLoop.captures.elementBinding!.name,
          }),
        },
      });

      return EditorOperation.compose(
        EditorOperation.highlightNodes(tree, [
          forEachReplacement,
          forEachHighlight,
        ])
      );
    }

    const elementVariable = arrayLoop.getElementVariable(tree);

    arrayLoop.removeSizeBindingIfOnlyUsedInLoopIteration(tree);

    // run prior to element binding replacement to prevent overrides
    const forEachReplacement = this.replaceMatchNodeWithForEach({
      tree,
      match,
      elementVariable,
    });

    // need to capture the node path early, because the variable replace will change the for-of node in the tree
    const forEachPath = tree.getNodePath(forEachReplacement);

    const { elementVariableReplacements } =
      arrayLoop.replaceElementVariablesInBody(elementVariable.name, tree);

    return EditorOperation.compose(
      // highlight head & variable replacements:
      EditorOperation.highlightNodes(
        tree,
        {
          nodePath: forEachPath,
          f: forEachHighlight,
        },
        ...elementVariableReplacements
      ),
      // if a parameter has been introduced, rename it:
      elementVariable.isSynthesized
        ? EditorOperation.renameNode(tree, elementVariable.identifier)
        : undefined
    );
  }

  private replaceMatchNodeWithForEach({
    elementVariable,
    match,
    tree,
  }: {
    elementVariable: {
      identifier: ts.Identifier;
      type?: ts.TypeNode | undefined;
      declarationFlags?: ts.NodeFlags | undefined;
    };
    match: ConvertLoopToForEachCandidate;
    tree: TransformedNodeTree;
  }) {
    const { arrayLoop } = match.captures;

    const elementDeclaration = arrayLoop.getElementDeclaration();
    const elementParameter = tree.createParameterDeclaration({
      name: elementVariable.identifier,
      type: elementDeclaration?.type, // TODO use elementVariable.type
    });

    const indexDeclaration = arrayLoop.getIndexDeclaration();
    const parameters = [elementParameter];

    if (arrayLoop.hasDirectIndexVariableAccess()) {
      parameters.push(
        tree.createParameterDeclaration({
          name: indexDeclaration!.name,
          type: indexDeclaration!.type,
        })
      );
    }

    // TODO extract into engine
    const body = ts.isBlock(arrayLoop.captures.body)
      ? arrayLoop.captures.body
      : tree.createBlock({
          statements: [arrayLoop.captures.body],
        });

    const replacement = tree.createExpressionStatement({
      expression: tree.createCallExpression({
        expression: tree.createPropertyAccessExpression({
          expression: arrayLoop.captures.arrayExpression,
          name: "forEach",
        }),
        argumentsArray: [
          tree.createArrowFunction({
            parameters,
            body,
          }),
        ],
      }),
    });

    tree.replace(match.node, replacement);

    return replacement;
  }

  analyzeSafety(match: ConvertLoopToForEachCandidate) {
    return Safety.unknown();
  }

  getActionZones(
    match: ConvertLoopToForEachCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to .forEach()", [
      {
        range: NodeRange.loopHead(match.node),
        level: CodeAssistLevel.Suggestion,
      },
    ]);
  }
}
