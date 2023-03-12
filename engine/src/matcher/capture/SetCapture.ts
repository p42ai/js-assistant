import * as _ from "lodash";
import * as p from "../predicate";
import { Capture } from "./Capture";

export class SetCapture<T> extends Capture<T[]> {
  record<S, C>(predicate: p.Predicate<S, C> = p.any) {
    return (value: S, context: C) => {
      const result = predicate(value, context);

      if (!result) {
        return false;
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

  extractValue() {
    return this.value ?? [];
  }
}
