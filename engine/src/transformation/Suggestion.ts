import { Range } from "../util/text/Range";

export interface Suggestion {
  /**
   * Code ranges that should be highlighted when the user wants to see where a suggestion
   * is.
   */
  readonly highlightRanges: Array<Range>;

  /**
   * Returns a full description of what your can do with a result.
   */
  readonly description: string;

  /**
   * Short action label (e.g. "Convert") that is displayed instead of a generic "Apply" label.
   * When actionLabel is undefined, "Apply" is used.
   */
  readonly shortActionLabel?: string | undefined;
}
