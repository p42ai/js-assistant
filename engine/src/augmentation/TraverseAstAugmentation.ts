import ts from "typescript";
import { visitSelfAndEachDescendant } from "../ast/visitSelfAndEachDescendant";
import { Context } from "../matcher/engine/Context";
import { AugmentationErrorHandler } from "./AugmentationErrorHandler";
import { SourceFileNodeAugmentation } from "./SourceFileNodeAugmentation";

export class TraverseAstAugmentation<
  VALUE
> extends SourceFileNodeAugmentation<VALUE> {
  constructor(
    id: string,
    createVisitor: (
      ast: ts.SourceFile
    ) => (node: ts.Node, context: Context, result: Map<ts.Node, VALUE>) => void
  ) {
    super(
      id,
      (
        ast: ts.SourceFile,
        context: Context,
        handleAugmentationError: AugmentationErrorHandler
      ) => {
        const valuesByNode = new Map<ts.Node, VALUE>();

        const visitor = createVisitor(ast);
        visitSelfAndEachDescendant(ast, (node: ts.Node) => {
          try {
            visitor(node, context, valuesByNode);
          } catch (error) {
            handleAugmentationError(this, node, error);
          }
        });

        return valuesByNode;
      }
    );
  }
}
