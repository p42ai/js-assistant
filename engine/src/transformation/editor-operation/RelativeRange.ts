import { NodePath } from "../../ast/NodePath";
import { Range } from "../../util/text/Range";

export type RelativeRange = {
  /**
   * Path to resolve the node.
   */
  nodePath: NodePath;

  /**
   * Range offset relative to `node.getStart()` of the resolved node.
   */
  offset?: Range | undefined;
};
