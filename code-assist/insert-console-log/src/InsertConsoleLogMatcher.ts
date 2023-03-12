
import {
  Context,
  Statement,
  matchers as m,
  PatternMatcher,
  Scope,
} from "@p42/engine";
import ts from "typescript";
import { InsertConsoleLogCandidate } from "./InsertConsoleLogCandidate";

const { ast } = m;

export class InsertConsoleLogMatcher extends PatternMatcher<InsertConsoleLogCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.Identifier],
  };

  createPattern() {
    const captures = {};

    return {
      match: ast.identifier({
        bindingReference: (reference, context) => {
          if (reference == null) {
            return false;
          }
          // the statement scope must be similar or a child of the identifier scope
          // (otherwise the identifier would not be available for console.log)
          const nodeScope = reference.binding?.scope;

          if (nodeScope == null) {
            return false;
          }

          let currentScope: Scope | undefined = context.getScope(
            Statement.getStatementAncestor(reference.identifier)
          );
          while (currentScope != null) {
            if (currentScope === nodeScope) {
              return true;
            }
            currentScope = currentScope.parent;
          }
          return false;
        },
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: InsertConsoleLogCandidate["node"],
    captures: InsertConsoleLogCandidate["captures"],
    context: Context
  ): InsertConsoleLogCandidate["data"] {
    return {
      statementAncestor: Statement.getStatementAncestor(matchedNode),
    };
  }
}
