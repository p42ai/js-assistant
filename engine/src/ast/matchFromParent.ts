import ts from "typescript";
import { path } from "../matcher";
import { temporaryValue } from "../matcher/capture";
import { Context } from "../matcher/engine/Context";
import { Predicate } from "../matcher/predicate/Predicate";

// TODO move to matcher?
export function matchFromParent(
  matchChild: (
    child: Predicate<ts.Node, Context>
  ) => Predicate<ts.Node, Context>
) {
  const matchedNode = temporaryValue<ts.Node>();
  return matchedNode.record(path.parent(matchChild(matchedNode.same())));
}
