
import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertToDestructuringAssignmentCandidate
  extends Match<
    ts.VariableDeclaration,
    {
      variableName: ts.Identifier;
      propertyName: ts.Identifier;
    },
    {
      canBeShorthandExpression: boolean;
    }
  > {}
