import { Match } from "@p42/engine";
import ts from "typescript";

export interface ConvertIfElseToSwitchCandidate
  extends Match<
    ts.IfStatement,
    {
      expression: ts.Expression;
      conditionList: Array<ts.Expression>;
      operatorList: Array<
        ts.SyntaxKind.EqualsEqualsEqualsToken | ts.SyntaxKind.EqualsEqualsToken
      >;
      bodyList: Array<ts.Statement>;
      elseBody: ts.Statement | undefined;
    },
    {
      groupedConditions: Array<Array<ts.Expression>>;
    }
  > {}
