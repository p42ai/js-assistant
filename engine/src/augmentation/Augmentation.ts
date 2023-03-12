import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { PatternCandidates } from "../matcher/engine/PatternMatcher";
import { AugmentationErrorHandler } from "./AugmentationErrorHandler";

type BaseAugmentationType<VALUE> = {
  readonly id: string;

  getValue(node: ts.Node, context: Context): VALUE | undefined;
};

/**
 * Augmentation that is run lazily and returns a value for a node.
 */
export type OnDemandAugmentationType<VALUE> = BaseAugmentationType<VALUE> & {
  readonly type: "on-demand";
  computeValue(node: ts.Node, context: Context): VALUE;
};

/**
 * Augmentation that is run on a full sourceFile and returns a single value that is valid
 * for all nodes in the tree.
 */
export type SourceFileAugmentationType<VALUE> = BaseAugmentationType<VALUE> & {
  readonly type: "source-file";
  readonly augment: (
    sourceFile: ts.SourceFile,
    context: Context,
    logger: AugmentationErrorHandler
  ) => VALUE;
};

/**
 * Augmentation that is run on a full sourceFile and returns a map from node to augmentation value.
 */
export type SourceFileNodeAugmentationType<VALUE> =
  BaseAugmentationType<VALUE> & {
    readonly type: "source-file-node";
    readonly augment: (
      sourceFile: ts.SourceFile,
      context: Context,
      logger: AugmentationErrorHandler
    ) => Map<ts.Node, VALUE>;
  };

/**
 * Augmentation that matches a pattern and stores it related to their nodes.
 */
export type MatchAugmentationType<VALUE> = BaseAugmentationType<VALUE> & {
  readonly type: "match";
  augment(
    context: Context,
    getCandidates: (patternCandidates: PatternCandidates) => Iterable<ts.Node>
  ): Map<ts.Node, VALUE>;
};

export type Augmentation<VALUE> =
  | SourceFileAugmentationType<VALUE>
  | SourceFileNodeAugmentationType<VALUE>
  | MatchAugmentationType<VALUE>
  | OnDemandAugmentationType<VALUE>;
