
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ReplaceVarWithLetAndConstCandidate
  extends Match<
    ts.VariableDeclarationList,
    {
      constDeclarators: Array<ts.VariableDeclaration>;
      letDeclarators: Array<ts.VariableDeclaration>;
    },
    undefined
  > {}
