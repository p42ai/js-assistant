import { Match } from "@p42/engine";
import ts from "typescript";

export interface SplitVariableDeclarationAndInitializationCandidate
  extends Match<
    ts.VariableDeclaration,
    {
      name: string;
      initializer: ts.Expression;
      declarationList: ts.VariableDeclarationList;
      block: ts.SourceFile | ts.Block;
    },
    {
      insertionIndex: number;
    }
  > {}
