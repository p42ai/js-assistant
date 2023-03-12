import { Range } from "../../util/text/Range";

/**
 * Set that contains the comments from a single source file.
 *
 * Assumptions:
 * - single source file
 * - original comments parsed from text
 * - file not modified
 */
export class CommentSet {
  constructor(readonly comments: Array<Range>) {}

  filter(f: (commentRange: Range) => boolean): Array<Range> {
    const filteredComments: Array<Range> = [];

    for (const comment of this.comments) {
      if (f(comment)) {
        filteredComments.push(comment);
      }
    }

    return filteredComments;
  }

  some(f: (commentRange: Range) => boolean): boolean {
    for (const comment of this.comments) {
      if (f(comment)) {
        return true;
      }
    }

    return false;
  }

  getCommentsInRange(range: Range): Array<Range> {
    return this.filter((innerRange: Range) => range.overlapsWith(innerRange));
  }

  hasCommentsInRange(range: Range): boolean {
    return this.some((innerRange: Range) => range.overlapsWith(innerRange));
  }
}
