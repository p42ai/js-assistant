import * as _ from "lodash";

export type Mapping<S, T, C> = (node: S, context: C) => T[] | T | undefined;

export function normalize<S, T, C>(
  navigation: Mapping<S, T, C>
): (node: S, context: C) => T[] {
  return (node: S, context: C) => {
    const result = navigation(node, context);

    if (result === undefined) {
      return [];
    }

    if (_.isArray(result)) {
      return result;
    }

    return [result];
  };
}
