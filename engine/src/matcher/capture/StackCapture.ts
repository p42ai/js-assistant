import * as _ from "lodash";
import { sameComparator } from "../../util/Comparator";
import { Predicate } from "../predicate/Predicate";
import { Capture } from "./Capture";
import { ContextualComparator } from "./ContextualComparator";

export class StackCapture<T, C> extends Capture<Array<T>> {
  private readonly compare: ContextualComparator<T, C>;

  constructor(compare: ContextualComparator<T, C> = sameComparator) {
    super();
    this.compare = compare;
  }

  checkpoint<S, C>(predicate: Predicate<S, C>) {
    return (value: S, context: C) => {
      const previousStack = _.clone(this.value);
      const result = predicate(value, context);
      if (!result) {
        this.value = previousStack;
      }
      return result;
    };
  }

  push<S>(
    predicate: Predicate<S, C> = undefined as unknown as Predicate<S, C>
  ) {
    return (value: S, context: C) => {
      if (predicate != null) {
        const result = predicate(value, context);

        if (!result) {
          return false;
        }
      }

      if (this.value == null) {
        this.value = [];
      }

      // Assume that after the predicate has been evaluated, value is of type T.
      // This is not fully typesafe.
      const castedValue = value as any as T;

      this.value!.push(castedValue);

      return true;
    };
  }

  isEmpty() {
    return this.value == null || this.value?.length === 0;
  }

  getLastElement() {
    return this.isEmpty() ? undefined : this.value![this.value!.length - 1];
  }

  getFirstElement() {
    return this.isEmpty() ? undefined : this.value![0];
  }

  peek() {
    return (value: T, context: C) => {
      const lastElement = this.getLastElement();
      return lastElement != null
        ? this.compare(value, lastElement, context)
        : false;
    };
  }

  peekFirstValue() {
    return (value: T, context: C) => {
      const firstElement = this.getFirstElement();
      return firstElement != null
        ? this.compare(value, firstElement, context)
        : false;
    };
  }

  /**
   * Removes the last element from the stack. Restores the full stack when the predicate is exited
   * (all changes to the capture value are reset at that point).
   */
  popForValidation<S, C>(predicate: Predicate<S, C>) {
    return (value: S, context: C) => {
      const currentStack = this.value;

      this.value = this.value != null ? _.clone(this.value) : this.value;

      if (this.value != null) {
        this.value.splice(-1, 1); // remove last element
      }

      const result = predicate(value, context);

      this.value = currentStack; // restore stack

      return result;
    };
  }

  extractValue() {
    return this.value ?? [];
  }
}
