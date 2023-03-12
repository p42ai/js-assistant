import * as p from "./predicate";

export function resolve<S, T, CONTEXT>({
  resolver,
  match,
  debugName = "resolve",
}: {
  resolver: (object: S, context: CONTEXT) => T;
  match: p.Predicate<T, CONTEXT>;
  debugName?: string | undefined;
}) {
  return p.define(debugName, (value: S, context: CONTEXT) =>
    match(resolver(value, context), context)
  );
}
