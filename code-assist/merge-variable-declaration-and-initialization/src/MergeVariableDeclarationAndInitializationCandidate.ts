import { Match } from "@p42/engine";
import ts from "typescript";

export interface MergeVariableDeclarationAndInitializationCandidate
  extends Match<
    ts.VariableDeclaration,
    {
      variableName: string;
      assignmentExpression: ts.ExpressionStatement;
      initializer: ts.Expression;
    },
    undefined
  > {}
