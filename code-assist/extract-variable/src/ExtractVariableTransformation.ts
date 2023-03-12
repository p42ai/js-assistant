
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  factory,
  FunctionLike,
  getSyntaxKindLabel,
  isAncestor,
  isBlockLike,
  isMethodCallTarget,
  nameOracle,
  NodeRange,
  PrefixTriviaMove,
  Safety,
  SafetyMessageList,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ExtractVariableCandidate } from "./ExtractVariableCandidate";

export class ExtractVariableTransformation extends Transformation<ExtractVariableCandidate> {
  async apply(match: ExtractVariableCandidate, tree: TransformedNodeTree) {
    const { occurrences, targetScope } = match.data;

    const targetScopeNode = targetScope.node!;

    // when some occurrences are not part of the loop body (e.g. they are in the head),
    // then the outer scope should be used for inserting the variable.
    const insertionScopeNode =
      (ts.isForStatement(targetScopeNode) ||
        ts.isForOfStatement(targetScopeNode) ||
        ts.isForInStatement(targetScopeNode) ||
        ts.isWithStatement(targetScopeNode)) &&
      occurrences.some(
        (occurrence) => !isAncestor(occurrence, targetScopeNode.statement)
      )
        ? targetScopeNode.parent
        : targetScopeNode;

    let block: ts.BlockLike;
    if (isBlockLike(insertionScopeNode)) {
      block = insertionScopeNode;
    } else if (FunctionLike.isFunctionLike(insertionScopeNode)) {
      const body = insertionScopeNode.body!; // body needs to exist because match was inside

      if (ts.isBlock(body)) {
        block = body;
      } else {
        block = tree.createBlock({
          statements: [
            tree.createReturnStatement({
              expression: body,
            }),
          ],
        });

        tree.replace(body, block);
      }
    } else if (ts.isCaseBlock(insertionScopeNode)) {
      // switch-block: need to insert outside, right before switch block
      const surroundingNode = insertionScopeNode.parent.parent;
      if (isBlockLike(surroundingNode)) {
        block = surroundingNode;
      } else {
        block = tree.createBlock({
          statements: [insertionScopeNode.parent],
        });
        tree.replace(targetScopeNode.parent, block);
      }
    } else if (
      ts.isForStatement(insertionScopeNode) ||
      ts.isForOfStatement(insertionScopeNode) ||
      ts.isForInStatement(insertionScopeNode) ||
      ts.isWithStatement(insertionScopeNode)
    ) {
      const body = insertionScopeNode.statement;
      if (ts.isBlock(body)) {
        block = body;
      } else {
        block = tree.createBlock({
          statements: [body],
        });
        tree.replace(body, block);
      }
    } else {
      throw new Error(
        `unsupported scope node kind ${getSyntaxKindLabel(
          targetScopeNode.kind
        )}`
      );
    }

    const variableName = nameOracle.generateVariableName(
      nameOracle.nameWithIncreasingNumber(
        nameOracle.extractVariableName(match.node) ?? "newVariable"
      ),
      ...occurrences.map((occurrence) => match.context.getScope(occurrence))
    );

    // the variable statement needs to come before the first occurrence:
    const insertIndex = tree.isNew(block)
      ? 0
      : ts.isCaseBlock(targetScopeNode)
      ? Statement.getStatementIndex(targetScopeNode.parent)
      : Math.min(
          ...occurrences.map((occurrence) => {
            // TODO extract getParentThatIsDirectChildOf
            let targetBlockChild: ts.Node = occurrence;
            while (targetBlockChild.parent !== block) {
              targetBlockChild = targetBlockChild.parent;
            }
            return Statement.getStatementIndex(
              targetBlockChild as ts.Statement
            );
          })
        );

    const declarationIdentifier = tree.createIdentifier({
      text: variableName,
    });

    const extractedVariableStatement = factory.createSingleVariableStatement({
      flags: ts.NodeFlags.Const,
      name: declarationIdentifier,
      initializer: match.node,
      tree,
    });

    // TODO insertBefore (would be better because it can deal with tree changes)
    tree.insertStatement(block, extractedVariableStatement, insertIndex);

    // transfer prefix whitespace from first occurrence statement
    tree.updateTrivia(
      new PrefixTriviaMove(
        block.statements[insertIndex],
        extractedVariableStatement
      )
    );

    // replace expression occurrences (incl. original match)
    const highlightedNodes: Array<ts.Node> = [extractedVariableStatement];
    for (const occurrence of occurrences) {
      const replacementIdentifier = tree.createIdentifier({
        text: variableName,
      });

      const { parent } = occurrence;

      // automatically expand shorthand expression when needed
      if (ts.isShorthandPropertyAssignment(parent)) {
        const replacement = tree.createPropertyAssignment({
          name: parent.name,
          initializer: replacementIdentifier,
        });
        tree.replace(parent, replacement);
        highlightedNodes.push(replacement);
        continue;
      }

      // automatically wrap in JSX expression when needed:
      const replacement =
        ts.isJsxAttribute(parent) ||
        ts.isJsxElement(parent) ||
        ts.isJsxFragment(parent)
          ? tree.createJsxExpression({
              expression: replacementIdentifier,
            })
          : replacementIdentifier;
      tree.replace(occurrence, replacement);
      highlightedNodes.push(replacement);
    }

    // order important: rename blocks highlighting
    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, ...highlightedNodes),
      EditorOperation.rename(tree.getNodePath(declarationIdentifier))
    );
  }

  analyzeSafety(match: ExtractVariableCandidate): Safety {
    const messages = new SafetyMessageList();

    if (match.data.occurrences.some(isMethodCallTarget)) {
      messages.warning("changes 'this' in a method call to the global object");
    }

    return messages.produceUnknown();
  }

  getActionZones(
    match: ExtractVariableCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(this.getActionLabel(match), [
      {
        range: NodeRange.node(match.node),
        level: isSuggestion
          ? CodeAssistLevel.Suggestion
          : CodeAssistLevel.PreferredQuickFix,
      },
    ]);
  }

  private getActionLabel(match: ExtractVariableCandidate): string {
    const occurrenceCount = match.data.occurrences.length;
    return occurrenceCount === 1
      ? `Extract const`
      : `Extract ${occurrenceCount} occurrences into const`;
  }
}
