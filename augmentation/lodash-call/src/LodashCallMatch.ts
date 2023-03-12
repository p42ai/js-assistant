import { Match } from "@p42/engine";
import ts from "typescript";

export interface LodashCallMatch
  extends Match<
    ts.CallExpression,
    {
      name: string;
      propertyAccess: ts.PropertyAccessExpression;
    },
    undefined
  > {}
