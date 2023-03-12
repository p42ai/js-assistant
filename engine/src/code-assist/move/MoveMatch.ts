import ts from "typescript";
import { Context } from "../../matcher/engine/Context";
import { Match } from "../../matcher/engine/Match";
import { Range } from "../../util/text/Range";

type Captures<CHILD extends ts.Node> = {
  selectedChildren: Array<CHILD>;
};

export abstract class MoveMatch<
  CONTAINER extends ts.Node,
  CHILD extends ts.Node
> implements Match<CONTAINER, Captures<CHILD>, undefined>
{
  constructor(
    readonly node: CONTAINER,
    readonly captures: Captures<CHILD>,
    readonly data: undefined,
    readonly context: Context
  ) {}

  abstract get allChildren(): ts.NodeArray<CHILD>;

  get selectedChildren() {
    return this.captures.selectedChildren;
  }

  get firstSelectedChild(): CHILD {
    return this.selectedChildren[0];
  }

  get lastSelectedChild(): CHILD {
    return this.selectedChildren[this.selectedChildren.length - 1];
  }

  get actionRange(): Range {
    return new Range(
      this.firstSelectedChild.getStart(),
      this.lastSelectedChild.getEnd()
    );
  }

  get startIndex(): number {
    return this.allChildren.indexOf(this.firstSelectedChild);
  }

  get endIndex(): number {
    return this.allChildren.indexOf(this.lastSelectedChild);
  }
}
