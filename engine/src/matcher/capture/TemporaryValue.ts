import { Context } from "../engine/Context";
import { Predicate } from "../predicate/Predicate";

export class TemporaryValue<T> {
  value: T | undefined;
  record(matcher: Predicate<T, Context>): Predicate<T, Context> {
    return (value: T, context: Context) => {
      this.value = value;
      const result = matcher(value, context);
      this.value = undefined;
      return result;
    };
  }
  same(): Predicate<T | undefined, Context> {
    return (value: T | undefined, context: Context) => value === this.value;
  }
}
