import { Match } from "@p42/engine";
import ts from "typescript";

export interface FunctionDirectiveMatch
  extends Match<
    ts.FunctionExpression | ts.FunctionDeclaration,
    {
      /**
       * Contains a directive defining string literal (such as "use strict")
       * that has been set for the function.
       */
      directive: ts.StringLiteral;
    },
    undefined
  > {}
