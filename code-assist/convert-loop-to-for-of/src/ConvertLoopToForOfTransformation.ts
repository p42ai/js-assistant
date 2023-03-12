
import {
  ActionZone,
  CodeAssistLevel,
  Context,
  createActionZones,
  EditorOperation,
  FunctionLike,
  NodeRange,
  predicates as p,
  Range,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ConvertLoopToForOfCandidate } from "./ConvertLoopToForOfCandidate";

export class ConvertLoopToForOfTransformation extends Transformation<ConvertLoopToForOfCandidate> {
  async apply(match: ConvertLoopToForOfCandidate, tree: TransformedNodeTree) {
    const { arrayLoop } = match.captures;

    if (arrayLoop.data.type === "for-each") {
      const forOfReplacement = this.replaceMatchNodeWithForOf({
        tree,
        match,
        elementVariable: {
          identifier: tree.createIdentifier({
            text: arrayLoop.captures.elementBinding!.name,
          }),
        },
      });

      // need to capture the node path early, because the return replace will change the for-of node in the tree
      const forOfPath = tree.getNodePath(forOfReplacement);

      // replace return statements with continue statements:
      FunctionLike.findReturnStatements(
        match.captures.arrayLoop.captures.body
      ).forEach((returnStatement) => {
        tree.replace(returnStatement, tree.createContinueStatement({}));
      });

      return EditorOperation.compose(
        EditorOperation.highlightNodes(tree, {
          nodePath: forOfPath,
          f: (node) => NodeRange.loopHeadContent(node as ts.ForOfStatement),
        })
      );
    }

    const elementVariable = arrayLoop.getElementVariable(tree);

    arrayLoop.removeSizeBindingIfOnlyUsedInLoopIteration(tree);

    // run prior to element binding replacement to prevent overrides
    const forOfReplacement = this.replaceMatchNodeWithForOf({
      tree,
      match,
      elementVariable,
    });

    // need to capture the node path early, because the variable replace will change the for-of node in the tree
    const forOfPath = tree.getNodePath(forOfReplacement);

    const { elementVariableReplacements } =
      arrayLoop.replaceElementVariablesInBody(elementVariable.name, tree);

    return EditorOperation.compose(
      // highlight head & variable replacements:
      EditorOperation.highlightNodes(
        tree,
        {
          nodePath: forOfPath,
          f: (node) => NodeRange.loopHeadContent(node as ts.ForOfStatement),
        },
        ...elementVariableReplacements
      ),
      // if a parameter has been introduced, rename it:
      elementVariable.isSynthesized
        ? EditorOperation.renameNode(tree, elementVariable.identifier)
        : undefined
    );
  }

  private replaceMatchNodeWithForOf({
    elementVariable,
    match,
    tree,
  }: {
    elementVariable: {
      identifier: ts.Identifier;
      type?: ts.TypeNode | undefined;
      declarationFlags?: ts.NodeFlags | undefined;
    };
    match: ConvertLoopToForOfCandidate;
    tree: TransformedNodeTree;
  }) {
    const { arrayLoop } = match.captures;

    const replacement = tree.createForOfStatement({
      initializer: tree.createVariableDeclarationList({
        flags: elementVariable.declarationFlags ?? ts.NodeFlags.Const,
        declarations: [
          tree.createVariableDeclaration({
            name: elementVariable.identifier,
            type: elementVariable.type,
          }),
        ],
      }),
      expression: arrayLoop.captures.arrayExpression,
      statement: arrayLoop.captures.body,
    });

    tree.replace(match.node, replacement);

    return replacement;
  }

  analyzeSafety(match: ConvertLoopToForOfCandidate) {
    const { arrayLoop } = match.captures;
    const { arrayExpression } = arrayLoop.captures;

    const messages = new SafetyMessageList();

    if (match.data.isArrayPotentiallyModifiedInLoop) {
      messages.warning(
        `'${arrayExpression.getText()}' might be modified inside loop`
      );
    }

    if (
      arrayLoop.data.type === "for-each" &&
      FunctionLike.findReturnStatements(
        match.captures.arrayLoop.captures.body
      ).some((returnStatement) => returnStatement.expression != null)
    ) {
      messages.warning("contains return statements with expressions");
    }

    return messages.produceUnknown();
  }

  getSuggestion(
    match: ConvertLoopToForOfCandidate,
    safety: Safety
  ): Suggestion | null {
    if (
      match.captures.arrayLoop.data.type === "for-each" ||
      (!safety.isSafe() && !safety.isUnknown())
    ) {
      return null;
    }

    return {
      description: `You can convert the ${match.captures.arrayLoop.data.typeLabel} loop into a 'for…of' loop.`,
      highlightRanges: this.getHighlightRanges(match),
      shortActionLabel: "Convert",
    };
  }

  getHighlightRanges(match: ConvertLoopToForOfCandidate) {
    const { arrayLoop } = match.captures;
    const loopType = arrayLoop.data.type;

    switch (loopType) {
      case "for-element": {
        const ranges: Array<Range> = [];

        const sizeNode = arrayLoop.captures.sizeBinding?.declaringNodes[0];
        if (sizeNode != null) {
          ranges.push(NodeRange.node(sizeNode.parent));
        }

        const forStatement = match.node as ts.ForStatement;
        ranges.push(
          new Range(forStatement.getStart(), forStatement.incrementor!.end + 1)
        );

        const elementDeclaration = arrayLoop.getElementDeclaration();
        if (elementDeclaration != null) {
          ranges.push(NodeRange.node(elementDeclaration));
        }

        const elementBindingDeclarator =
          arrayLoop.captures.elementBinding?.declaringNodes[0]?.parent;
        const indexReferences = arrayLoop.getBindingReferencesInBody(
          arrayLoop.captures.indexBinding!
        );
        for (const indexReference of indexReferences) {
          const arrayAccess = indexReference.identifier.parent;

          // ignore the existing element binding:
          if (
            elementBindingDeclarator != null &&
            match.context
              .getAncestors(arrayAccess)
              .contains(
                p.same<ts.Node, Context>(elementBindingDeclarator),
                match.context
              )
          ) {
            continue;
          }

          ranges.push(NodeRange.node(arrayAccess));
        }

        return ranges;
      }
      default:
        return [NodeRange.node(match.node)];
    }
  }

  getActionZones(
    match: ConvertLoopToForOfCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to for…of loop", [
      {
        range: match.captures.arrayLoop.getLoopHeadRange(),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
