
import { Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveConsoleLogCandidate
  extends Match<
    ts.ExpressionStatement,
    {
      propertyAccess: ts.PropertyAccessExpression;
    },
    undefined
  > {}
