import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { Augmentation } from "./Augmentation";
import { AugmentationErrorHandler } from "./AugmentationErrorHandler";

/**
 * Augments a full AST. Tree Augmentation can optimize the their performance by storing information
 * while traversing the tree, e.g. scope data that is aggregated, and by determining the details of
 * how the traversal works.
 */
export class SourceFileNodeAugmentation<VALUE> {
  readonly type = "source-file-node";

  constructor(
    readonly id: string,
    /**
     * Adds additional information to the nodes in the AST.
     */
    readonly augment: (
      sourceFile: ts.SourceFile,
      context: Context,
      logger: AugmentationErrorHandler
    ) => Map<ts.Node, VALUE>
  ) {}

  getValue(node: ts.Node, context: Context): VALUE | undefined {
    return context.getNodeAugmentationValues(this)!.get(node)!;
  }
}
