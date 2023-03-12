import ts from "typescript";
import { ActionZone, createActionZones } from "../../transformation/ActionZone";
import { BlockedZone } from "../../transformation/BlockedZone";
import * as EditorOperation from "../../transformation/editor-operation/index";
import { Safety } from "../../transformation/safety/Safety";
import { Transformation } from "../../transformation/Transformation";
import { TransformedNodeTree } from "../../transformation/TransformedNodeTree.generated";
import { SwapPositionPrefixTriviaMove } from "../../transformation/trivia/SwapPositionPrefixTriviaMove";
import { SwapPositionSuffixTriviaMove } from "../../transformation/trivia/SwapPositionSuffixTriviaMove";
import * as CodeAssistLevel from "../CodeAssistLevel";
import { MoveMatch } from "./MoveMatch";

export class MoveTransformation<
  CONTAINER extends ts.Node,
  CHILD extends ts.Node,
  MATCH extends MoveMatch<CONTAINER, CHILD>
> extends Transformation<MATCH> {
  static createPair<
    CONTAINER extends ts.Node,
    CHILD extends ts.Node,
    MATCH extends MoveMatch<CONTAINER, CHILD>
  >({
    upActionLabel,
    downActionLabel,
    updateContainer,
    analyzeSafety,
  }: {
    upActionLabel: string;
    downActionLabel: string;
    updateContainer: (
      container: CONTAINER,
      newChildren: Array<CHILD>,
      tree: TransformedNodeTree
    ) => CONTAINER;
    analyzeSafety?: (match: MATCH) => Safety;
  }) {
    return [
      new MoveTransformation(
        "up",
        upActionLabel,
        0,
        (match: MATCH): boolean => match.startIndex > 0,
        updateContainer,
        analyzeSafety
      ),
      new MoveTransformation(
        "down",
        downActionLabel,
        1,
        (match: MATCH): boolean =>
          match.endIndex < match.allChildren.length - 1,
        updateContainer,
        analyzeSafety
      ),
    ];
  }

  constructor(
    id: "up" | "down",
    private readonly actionLabel: string,
    private readonly codeActionKindIndex: number,
    readonly isApplicable: (match: MATCH) => boolean,
    private updateContainer: (
      container: CONTAINER,
      newChildren: Array<CHILD>,
      tree: TransformedNodeTree
    ) => CONTAINER,
    readonly analyzeSafety: (match: MATCH) => Safety = () => Safety.unknown()
  ) {
    super(id);
  }

  private getSwapConfiguration(match: MATCH): {
    selectionTargetStartIndex: number;
    swapSourceIndex: number;
    swapTargetIndex: number;
  } {
    const { startIndex, endIndex } = match;
    switch (this.id) {
      case "up":
        return {
          selectionTargetStartIndex: startIndex - 1,
          swapSourceIndex: startIndex - 1,
          swapTargetIndex: endIndex,
        };
      case "down":
        return {
          selectionTargetStartIndex: startIndex + 1,
          swapSourceIndex: endIndex + 1,
          swapTargetIndex: startIndex,
        };
      default:
        throw new Error(`unknown id ${this.id}`);
    }
  }

  async apply(match: MATCH, tree: TransformedNodeTree) {
    const { allChildren, node: container, selectedChildren } = match;
    const { selectionTargetStartIndex, swapSourceIndex, swapTargetIndex } =
      this.getSwapConfiguration(match);

    const newChildren = allChildren.slice();
    for (let i = 0; i < selectedChildren.length; i++) {
      newChildren[selectionTargetStartIndex + i] = selectedChildren[i];
    }
    newChildren[swapTargetIndex] = allChildren[swapSourceIndex];

    tree.updateTrivia(
      new SwapPositionPrefixTriviaMove(
        match.firstSelectedChild,
        allChildren[swapSourceIndex]
      )
    );
    tree.updateTrivia(
      new SwapPositionSuffixTriviaMove(
        match.lastSelectedChild,
        allChildren[swapSourceIndex]
      )
    );

    tree.replace(container, this.updateContainer(container, newChildren, tree));

    return EditorOperation.compose(
      EditorOperation.keepExistingSelection(
        tree,
        match.firstSelectedChild,
        match.firstSelectedChild,
        match.context
      ),
      EditorOperation.highlightNodes(tree, ...selectedChildren)
    );
  }

  getActionZones(match: MATCH, isSuggestion: boolean): ActionZone[] {
    return createActionZones(
      this.actionLabel,
      [
        {
          range: match.actionRange,
          level: CodeAssistLevel.Regular,
        },
      ],
      this.codeActionKindIndex
    );
  }

  getBlockedZones(match: MATCH): BlockedZone[] | null {
    return [
      {
        range: match.actionRange,
        codeActionKindIndex: this.codeActionKindIndex,
      },
    ];
  }
}
