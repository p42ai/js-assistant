import ts from "typescript";

import { TypeSystem } from "../../ast/TypeSystem";
import { Augmentation } from "../../augmentation/Augmentation";
import { AugmentationErrorHandler } from "../../augmentation/AugmentationErrorHandler";
import { ScriptMetadata } from "./ScriptMetadata";
import { CancellationToken } from "../../util/concurrency/CancellationToken";
import { NullCancellationToken } from "../../util/concurrency/NullCancellationToken";
import {
  NullPerformanceRecorder,
  PerformanceRecorder,
} from "../../util/performance/PerformanceRecorder";
import { Range } from "../../util/text/Range";
import { deduplicateMatches } from "../deduplicateMatches";
import { Context } from "./Context";
import { AnyMatch } from "./Match";
import { NodeIndex } from "./NodeIndex";
import { PatternCandidates, PatternMatcher } from "./PatternMatcher";

export class PatternMatcherEngine {
  /**
   * Values from file augmentations
   */
  #fileAugmentationValues: Map<string, unknown> = new Map();

  /**
   * Values from augmentations that store values on individual nodes.
   */
  #nodeAugmentationValues: Map<string, Map<ts.Node, unknown>> = new Map();

  constructor(
    readonly nodeIndex: NodeIndex,
    private readonly metadata: ScriptMetadata,
    private readonly typeSystem: TypeSystem,
    private readonly augmentations: Array<Augmentation<unknown>>,
    private readonly performanceRecorder: PerformanceRecorder = NullPerformanceRecorder,
    private readonly cancellationToken: CancellationToken = NullCancellationToken
  ) {}

  createContext(selectedRange?: Range | undefined): Context {
    return new Context(
      this.typeSystem,
      this.metadata,
      selectedRange,
      this.nodeIndex,
      this.#nodeAugmentationValues,
      this.#fileAugmentationValues
    );
  }

  async augment(logger: AugmentationErrorHandler) {
    for (const augmentation of this.augmentations) {
      await this.cancellationToken.deferAndThrowIfCancellationRequested();

      // context is created per augmentation because it can change
      const context = this.createContext();
      const { type } = augmentation;
      const { sourceFile } = this.nodeIndex;

      this.performanceRecorder.run(
        `augment (${type}) - ${augmentation.id}`,
        "detail",
        () => {
          switch (type) {
            case "source-file":
              this.#fileAugmentationValues.set(
                augmentation.id,
                augmentation.augment(sourceFile, context, logger)
              );
              break;
            case "source-file-node":
              this.#nodeAugmentationValues.set(
                augmentation.id,
                augmentation.augment(sourceFile, context, logger)
              );
              break;
            case "match":
              this.#nodeAugmentationValues.set(
                augmentation.id,
                augmentation.augment(context, (patternCandidates) =>
                  this.getCandidates(patternCandidates)
                )
              );
              break;
            case "on-demand":
              this.#nodeAugmentationValues.set(
                augmentation.id,
                new Map<ts.Node, any>()
              );
          }
        }
      );
    }
  }

  getCandidates(candidates: PatternCandidates): Iterable<ts.Node> {
    const nodeCandidates = candidates?.nodes;
    const patternCandidates = candidates?.patterns;

    // Case 1) no candidates defined - return all nodes
    if (
      candidates == null ||
      (nodeCandidates == null && patternCandidates == null)
    ) {
      return this.nodeIndex.allNodes;
    }

    // Case 2)  Performance: prevent re-allocation for single pattern candidates

    // Case 2a) single node kind, no augmentation kind -> return node kind set
    if (
      nodeCandidates?.length === 1 &&
      (patternCandidates == null || patternCandidates.length === 0)
    ) {
      return this.nodeIndex.nodesBySyntaxKind[nodeCandidates[0]];
    }

    // Case 2b) single pattern kind, no augmentation kind -> return node kind set
    if (
      patternCandidates?.length === 1 &&
      (nodeCandidates == null || nodeCandidates.length === 0)
    ) {
      return this.#nodeAugmentationValues.get(patternCandidates[0].id)!.keys();
    }

    // Case 3) specific set of nodes needs to be calculated
    // using a set to de-duplicate candidates:
    const result = new Set<ts.Node>();

    if (nodeCandidates != null) {
      for (const kind of nodeCandidates) {
        const nodes = this.nodeIndex.nodesBySyntaxKind[kind];
        if (nodes != null) {
          for (const node of nodes) {
            result.add(node);
          }
        }
      }
    }

    if (patternCandidates != null) {
      for (const pattern of patternCandidates) {
        const nodes = this.#nodeAugmentationValues.get(pattern.id)?.keys();

        if (nodes != null) {
          for (const node of nodes) {
            result.add(node);
          }
        }
      }
    }

    return result;
  }

  findMatches<PATTERN extends AnyMatch>(
    matcher: PatternMatcher<PATTERN>
  ): Array<PATTERN> {
    const context = this.createContext();

    const matches: Array<PATTERN> = [];
    const candidates = this.getCandidates(matcher.candidates);
    for (const candidate of candidates) {
      // TODO resiliency / error logging
      const match = matcher.matchPattern(candidate, context);
      if (match != null) {
        matches.push(match);
      }
    }

    return matcher.requiresDeduplication
      ? deduplicateMatches(matches, context)
      : matches;
  }
}
