import * as _ from "lodash";
import { Predicate } from "../../matcher/predicate/Predicate";
import { ValueProvider } from "./ValueProvider";
import { filteringValueProvider } from "./FilteringValueProvider";
import { Mapping } from "./Mapping";
import { mappingValueProvider } from "./MappingValueProvider";
import { untilValueProvider } from "./UntilValueProvider";
import { sortingValueProvider } from "./SortingValueProvider";

/**
 * A list where the execution of operations is deferred until the values area actually consumed.
 */
export class DeferredList<T, C> {
  private readonly valueProvider: ValueProvider<T, C>;

  constructor(valueProvider: ValueProvider<T, C>) {
    this.valueProvider = valueProvider;
  }

  values(context: C): T[] {
    return this.valueProvider(context);
  }

  contains(predicate: Predicate<T, C>, context: C): boolean {
    return this.find(predicate, context) !== undefined;
  }

  containsValue(value: T, context: C): boolean {
    return this.contains((listValue) => listValue === value, context);
  }

  every(predicate: Predicate<T, C>, context: C): boolean {
    return this.values(context).every((value) => predicate(value, context));
  }

  filter<U extends T, C>(
    predicate: (value: T, context: C) => value is U,
    context: C
  ): DeferredList<U, C>;
  filter(predicate: Predicate<T, C>, context: C): DeferredList<T, C>;
  filter(predicate: Predicate<T, C>, context: C): DeferredList<T, C> {
    return new DeferredList(
      filteringValueProvider(this.valueProvider, (value) =>
        predicate(value, context)
      )
    );
  }

  find(predicate: Predicate<T, C>, context: C): T | undefined {
    return this.values(context).find((value) => predicate(value, context));
  }

  first(context: C): T | undefined {
    return _.first(this.values(context));
  }

  forEach(callback: (value: T) => void, context: C): void {
    return this.values(context).forEach(callback);
  }

  map<U>(map: Mapping<T, U, C>) {
    return new DeferredList(mappingValueProvider(this.valueProvider, map));
  }

  none(predicate: Predicate<T, C>, context: C): boolean {
    return !this.some(predicate, context);
  }

  some(predicate: Predicate<T, C>, context: C): boolean {
    return this.values(context).some((value) => predicate(value, context));
  }

  sort(getSortValue: (value: T) => any): DeferredList<T, C> {
    return new DeferredList(
      sortingValueProvider(this.valueProvider, getSortValue)
    );
  }

  size(context: C): number {
    return this.values(context).length;
  }

  until(stopPredicate: Predicate<T, C>): DeferredList<T, C> {
    return new DeferredList(
      untilValueProvider(this.valueProvider, stopPredicate)
    );
  }
}
