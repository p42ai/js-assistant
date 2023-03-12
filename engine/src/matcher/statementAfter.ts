import ts from "typescript";
import { ValueContainer } from "./capture/ValueContainer";
import { Context } from "./engine/Context";
import { Predicate } from "./predicate/Predicate";

export function statementAfter(
  referenceStatementContainer: ValueContainer<ts.Statement>,
  matcher: Predicate<ts.Node, Context>
) {
  return (statements: ts.NodeArray<ts.Statement>, context: Context) => {
    const referenceStatement = referenceStatementContainer.value;

    if (referenceStatement == null) {
      return false;
    }

    const index = statements.indexOf(referenceStatement);
    const nextStatement = statements[index + 1];

    if (nextStatement == null) {
      return false;
    }

    return matcher(nextStatement, context);
  };
}
