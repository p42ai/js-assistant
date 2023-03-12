import ts from "typescript";
import { getId } from "../ast/getId";
import { Context } from "../matcher/engine/Context";
import { AnyMatch } from "../matcher/engine/Match";
import {
  PatternCandidates,
  PatternMatcherClass,
} from "../matcher/engine/PatternMatcher";
import { Augmentation } from "./Augmentation";

/**
 * Augments node matches.
 */
export class MatchAugmentation<PATTERN extends AnyMatch> {
  readonly type = "match";
  readonly id;

  private readonly matchers;

  constructor({
    id,
    matchers,
  }: {
    id: string;
    matchers: Array<PatternMatcherClass<PATTERN>>;
  }) {
    this.id = id;
    this.matchers = matchers;
  }

  get requiredAugmentations(): Array<Augmentation<unknown>> {
    const augmentations: Array<Augmentation<unknown>> = [];

    // TODO convert to flatMap: AUTOMATED REFACTORING
    for (const Matcher of this.matchers) {
      const matcher = new Matcher(); // TODO inefficient (but not on hot path)
      augmentations.push(...matcher.requiredAugmentations);
    }

    return augmentations;
  }

  augment(
    context: Context,
    getCandidates: (patternCandidates: PatternCandidates) => Iterable<ts.Node>
  ): Map<ts.Node, PATTERN> {
    const matchers = this.matchers.map(
      (SpecificMatcher) => new SpecificMatcher()
    );

    const result = new Map<ts.Node, PATTERN>();

    for (const matcher of matchers) {
      // performance: limit search to applicable candidates:
      const candidates = getCandidates(matcher.candidates);

      for (const candidate of candidates) {
        // when the candidate has already been augmented, skip this matcher:
        if (result.has(candidate)) {
          continue;
        }

        const match = matcher.matchPattern(candidate, context);

        if (match != null) {
          result.set(candidate, match);
        }
      }
    }

    return result;
  }

  getValue(node: ts.Node, context: Context): PATTERN | undefined {
    try {
      return context.getNodeAugmentationValues(this)!.get(node)!;
    } catch (error: any) {
      throw new Error(
        `unable to get augmentation '${this.id}' for node ${getId(node)}: ${
          error.message ?? error
        }`
      );
    }
  }
}
