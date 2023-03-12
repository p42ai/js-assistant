import _ from "lodash";
import { sameComparator } from "../../util/Comparator";
import { Predicate } from "../predicate/Predicate";
import { Capture } from "./Capture";
import { ContextualComparator } from "./ContextualComparator";

export class ValueCapture<T, C> extends Capture<T> {
  private readonly compare: ContextualComparator<T, C>;

  constructor(compare: ContextualComparator<T, C> = sameComparator) {
    super();
    this.compare = compare;
  }

  checkpoint<S, C>(predicate: Predicate<S, C>) {
    return (value: S, context: C) => {
      const previousValue = this.value;
      const result = predicate(value, context);
      if (!result) {
        this.value = previousValue;
      }
      return result;
    };
  }

  record<S>({
    match = undefined,
    value = undefined,
    overwrite = false,
  }: {
    match?: Predicate<S, C> | undefined;
    value?: ((match: any) => T) | T | undefined;
    overwrite?: boolean | undefined;
  } = {}) {
    return (object: S, context: C) => {
      // when a match predicate is defined, evaluate it
      if (match != null) {
        const result = match(object, context);
        if (!result) {
          return false;
        }
      }

      // value determines what is recorded / compared:
      let valueToRecord: T;
      if (_.isFunction(value)) {
        valueToRecord = value(object);
      } else if (value === undefined) {
        // Assume that after the predicate has been evaluated, value is of type T.
        // This is not fully typesafe.
        valueToRecord = object as any as T;
      } else {
        valueToRecord = value;
      }

      // Value captures expect that the same value is used for all instances of the capture.
      // If this constraint is violated, the pattern is not matched. This is useful for referencing
      // e.g. names from other parts of the pattern and making sure they match.
      if (
        this.value !== undefined &&
        !this.compare(this.value, valueToRecord, context)
      ) {
        return false;
      }

      if (overwrite || this.value === undefined) {
        this.value = valueToRecord;
      }

      return true;
    };
  }
}
