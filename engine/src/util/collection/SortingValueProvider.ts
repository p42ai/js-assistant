import * as _ from "lodash";
import { ValueProvider } from "./ValueProvider";

export function sortingValueProvider<T, C>(
  source: ValueProvider<T, C>,
  getSortValue: (value: T) => any
): ValueProvider<T, C> {
  return (context: C) => _.sortBy(source(context), [getSortValue]);
}
