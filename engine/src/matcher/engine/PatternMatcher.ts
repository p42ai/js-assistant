import ts from "typescript";
import { Augmentation } from "../../augmentation/Augmentation";
import { Capture } from "../capture/Capture";
import { Predicate } from "../predicate/Predicate";
import { Context } from "./Context";
import { AnyMatch } from "./Match";

type Captures<CAPTURES extends Record<string, any>> = {
  [KEY in keyof CAPTURES]: Capture<CAPTURES[KEY]>;
};

interface Pattern<CAPTURES extends Record<string, any>> {
  match: Predicate<ts.Node, Context>;
  captures: Captures<CAPTURES>;
}

export type PatternCandidates =
  | {
      nodes?: Array<ts.SyntaxKind> | undefined;
      patterns?: Array<Augmentation<unknown>> | undefined;
    }
  | undefined;

export type PatternMatcherClass<PATTERN extends AnyMatch> =
  new () => PatternMatcher<PATTERN>;

export type PatternClass<PATTERN extends AnyMatch> = new (
  node: PATTERN["node"],
  captures: PATTERN["captures"],
  data: PATTERN["data"],
  context: Context
) => PATTERN;

export abstract class PatternMatcher<PATTERN extends AnyMatch> {
  /**
   * Candidate nodes & augmentation patterns that are searched when looking for suggestions.
   * When undefined, a match is attempted on all nodes.
   * Not used for calculating code assists based on selection.
   */
  readonly candidates: PatternCandidates = undefined;

  readonly requiresDeduplication: boolean = false;

  private readonly pattern: Pattern<PATTERN["captures"]>;

  constructor(private readonly matchClass?: PatternClass<PATTERN>) {
    this.pattern = this.createPattern();
  }

  requiredAugmentations: Array<Augmentation<unknown>> = [];

  abstract createPattern(): Pattern<PATTERN["captures"]>;

  createMatch(
    node: PATTERN["node"],
    captures: PATTERN["captures"],
    data: PATTERN["data"],
    context: Context
  ): PATTERN {
    return this.matchClass != null
      ? new this.matchClass(node, captures, data, context)
      : ({
          node,
          captures,
          data,
          context,
        } as PATTERN);
  }

  matchPattern(node: ts.Node, context: Context): PATTERN | undefined {
    this.resetCaptures();

    if (this.pattern.match(node, context)) {
      const captures = this.extractCapturedValues();

      const match = this.createMatch(
        node,
        captures,
        this.deriveMatchData(node, captures, context),
        context
      );

      if (this.verifyMatch(match)) {
        return match;
      }
    }

    return undefined;
  }

  /**
   * Additional verification for matches once all values have been captured
   * and additional information has been derived. Defaults to true.
   */
  verifyMatch(match: PATTERN): boolean {
    return true;
  }

  /**
   * Derive data from the match, the captures and the context.
   */
  deriveMatchData(
    matchedNode: PATTERN["node"],
    captures: PATTERN["captures"],
    context: Context
  ): PATTERN["data"] {
    return undefined;
  }

  private extractCapturedValues(): PATTERN["captures"] {
    const capturedValues: PATTERN["captures"] = {};
    Object.entries(this.pattern.captures).forEach(([key, capture]) => {
      capturedValues[key] = capture.extractValue();
    });
    return capturedValues;
  }

  private resetCaptures() {
    for (const capture of Object.values(this.pattern.captures)) {
      capture.value = undefined;
    }
  }
}
