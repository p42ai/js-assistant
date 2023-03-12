import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { Augmentation } from "./Augmentation";
import { AugmentationErrorHandler } from "./AugmentationErrorHandler";

export class SourceFileAugmentation<VALUE> {
  readonly type = "source-file";

  constructor(
    readonly id: string,
    /**
     * Adds additional information to the nodes in the AST.
     */
    readonly augment: (
      sourceFile: ts.SourceFile,
      context: Context,
      logger: AugmentationErrorHandler
    ) => VALUE
  ) {}

  getValue(node: ts.Node, context: Context): VALUE {
    return context.getFileAugmentationValue(this);
  }
}
