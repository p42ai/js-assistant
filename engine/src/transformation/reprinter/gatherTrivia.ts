import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { getBaseIndentation } from "./format_inference/getBaseIndentation";
import { getNodeEndIncludingTrailingComments } from "./getNodeEndIncludingTrailingComments";
import { PrintSettings } from "./PrintSettings";
import { ReprintTemplate } from "./ReprintTemplate";
import { TriviaGatheringContext } from "./TriviaGatheringContext";

export function gatherTrivia({
  tree,
  templates,
  printSettings,
}: {
  tree: TransformedNodeTree;
  templates: Map<ts.SyntaxKind, ReprintTemplate>;
  printSettings: PrintSettings;
}) {
  // scan the modified tree, if any, or the whole source file when there is no modification:
  const originalNode =
    tree.modificationRoot == null
      ? tree.originalSource
      : tree.getOriginalNode(tree.modificationRoot)!;

  const originalFullText = originalNode.getSourceFile().getFullText();
  const fullStart = originalNode.getFullStart();
  const start = originalNode.getStart();
  const end = getNodeEndIncludingTrailingComments(
    originalNode,
    originalFullText
  );

  const baseIndentationLevel =
    getBaseIndentation(originalNode) / printSettings.singleIndentation.length;

  const gatheringContext = new TriviaGatheringContext(
    tree,
    baseIndentationLevel,
    originalFullText,
    templates,
    start
  );

  // record trivia
  gatheringContext.recordTrivia(
    originalNode,
    {
      pos: fullStart,
      end: start,
    },
    {
      pos: originalNode.getEnd(),
      end,
    },
    {
      pos: originalNode.getEnd(),
      end,
    },
    undefined,
    false,
    false
  );

  gatheringContext.gatherChildTrivia(originalNode);

  const { trivia } = gatheringContext;

  for (const move of tree.triviaUpdates) {
    move.addOverlays(trivia);
  }

  return trivia;
}
