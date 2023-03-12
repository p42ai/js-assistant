import ts from "typescript";
import { matchParenthesizedExpression } from "./ast/matchParenthesizedExpression";
import { Context } from "./engine/Context";
import * as p from "./predicate";

export const matchMaybeParenthesized = (
  matcher: p.Predicate<ts.Expression, Context>
) =>
  p.recursive<ts.Expression, Context>((recursion) =>
    p.or(
      matchParenthesizedExpression({
        expression: recursion,
      }),
      matcher
    )
  );
