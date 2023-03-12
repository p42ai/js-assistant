import { Match } from "@p42/engine";
import ts from "typescript";

export type UndefinedAliasType = "undefined-literal" | "void-constant";

export interface UndefinedAliasMatch
  extends Match<
    ts.Identifier,
    {
      type: UndefinedAliasType;
    },
    undefined
  > {}
