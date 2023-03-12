
import { LodashCallMatch } from "@p42/augmentation-lodash-call";
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ReplaceLodashForeachCandidate
  extends Match<
    ts.CallExpression,
    {
      lodashCall: LodashCallMatch;
      collection: ts.Expression;
      iteratee: ts.ArrowFunction | ts.FunctionExpression;
    },
    {
      collectionKind: "array" | "object" | "unknown" | undefined;
      collectionCanBeNull: boolean;
    }
  > {}
