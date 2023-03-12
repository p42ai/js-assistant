import ts from "typescript";
import { SourceFileNodeAugmentation } from "./SourceFileNodeAugmentation";

export type AugmentationErrorHandler = (
  augmentation: SourceFileNodeAugmentation<any>,
  node: ts.Node,
  error: any
) => void;
