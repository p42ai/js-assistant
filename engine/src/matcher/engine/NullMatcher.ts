import * as p from "../predicate";
import { PatternMatcher } from "./PatternMatcher";
import { NullMatch } from "./NullMatch";

export class NullMatcher extends PatternMatcher<NullMatch> {
  createPattern() {
    return {
      match: p.nothing,
      captures: {},
    };
  }
}
