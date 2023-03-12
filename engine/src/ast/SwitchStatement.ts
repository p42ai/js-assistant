import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { hasDescendant } from "./hasDescendant";

export function getCaseClauses(node: ts.SwitchStatement): Array<ts.CaseClause> {
  return node.caseBlock.clauses.filter((clause): clause is ts.CaseClause =>
    ts.isCaseClause(clause)
  );
}

export function getDefaultClause(
  switchStatement: ts.SwitchStatement
): ts.DefaultClause | undefined {
  return switchStatement.caseBlock.clauses.find(
    (clause): clause is ts.DefaultClause => ts.isDefaultClause(clause)
  );
}

export function hasDefaultClause(switchStatement: ts.SwitchStatement): boolean {
  return getDefaultClause(switchStatement) != null;
}

export function hasInnerBreak(
  node: ts.SwitchStatement | ts.CaseOrDefaultClause,
  context: Context
): boolean {
  return hasDescendant(
    node,
    (descendant) => {
      const parent = descendant.parent;

      // TODO refactoring to combine the if statements
      if (!ts.isBreakStatement(descendant)) {
        return false;
      }

      if (descendant.label != null) {
        return false;
      }

      if (
        ts.isCaseOrDefaultClause(parent) &&
        parent.statements[parent.statements.length - 1] === descendant
      ) {
        return false;
      }

      if (
        ts.isBlock(parent) &&
        parent.statements[parent.statements.length - 1] === descendant &&
        ts.isCaseOrDefaultClause(parent.parent) &&
        parent.parent.statements[parent.parent.statements.length - 1] === parent
      ) {
        return false;
      }

      return true;
    },
    context
  );
}
