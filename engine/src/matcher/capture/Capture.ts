import * as p from "../predicate";
import * as _ from "lodash";

// TODO this should be abstract
export class Capture<T> {
  value: T | undefined;

  /**
   * Resets the set capture to it's previous value if the evaluation of the predicate
   * returned false.
   *
   * This can solve the problem where set captures happen on subtrees,
   * but then the parent tree ends up being evaluated to false. Without a checkpoint,
   * the captures would still be retained, even though the parent was evaluated to
   * false.
   */
  // TODO push down into some sort of collection capture
  checkpoint<S, C>(predicate: p.Predicate<S, C>) {
    return (value: S, context: C) => {
      // shallow clone, assumes value is an array (only valid for collection captures)
      const previousValue = _.clone(this.value);

      const result = predicate(value, context);
      if (!result) {
        this.value = previousValue;
      }
      return result;
    };
  }

  reset() {
    this.value = undefined;
  }

  extractValue(): T {
    return this.value!;
  }
}
