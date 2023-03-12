import { Context } from "../engine/Context";
import * as p from "../predicate";
import { Predicate } from "../predicate";

export const buildObject = <IN, OUT extends IN>(
  debugName: string,
  typeGuard: (value: IN) => value is OUT,
  ...matchers: Array<Predicate<OUT, Context> | undefined>
) => p.define(debugName, p.typeCheck(typeGuard, ...matchers));
