import { Binding, Match } from "@p42/engine";
import ts from "typescript";

export interface RemoveIifeCandidate
  extends Match<
    ts.CallExpression,
    {
      function: ts.FunctionExpression | ts.ArrowFunction;
      body: ts.Expression | ts.Block;
    },
    {
      type: "IIFE" | "IIAF";
      hoistedBindings: Array<Binding>;
    }
  > {}
