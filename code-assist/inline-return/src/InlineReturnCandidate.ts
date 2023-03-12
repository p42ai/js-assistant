import { Binding, Match } from "@p42/engine";
import ts from "typescript";

export interface InlineReturnCandidate
  extends Match<
    ts.ExpressionStatement,
    {
      variableName: string;
      variableBinding: Binding;
      assignedExpression: ts.Expression;
      removableReturnStatement: ts.ReturnStatement | undefined;
    },
    {
      canRemoveVariableDeclaration: boolean;
    }
  > {}
