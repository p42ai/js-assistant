import { and } from "./and";
import { Predicate } from "./Predicate";
import { define } from "./predicate-wrapper";

export function typeCheck<IN, OUT extends IN, CONTEXT>(
  typeGuard: (value: IN, context: CONTEXT) => value is OUT,
  ...matchers: (Predicate<OUT, CONTEXT> | undefined)[]
) {
  const typeChecked = define(
    `typeCheck ${typeGuard.name}`,
    (value: IN, context: CONTEXT) => typeGuard(value, context)
  );
  const additionalChecks = and<OUT, CONTEXT>(...matchers);
  return (value: IN | undefined, context: CONTEXT) =>
    value !== undefined &&
    typeChecked(value, context) &&
    additionalChecks(value as OUT, context);
}
