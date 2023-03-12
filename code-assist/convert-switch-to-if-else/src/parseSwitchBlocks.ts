
import {
  BlockTerminatorStatement,
  TrailingSeparatorTriviaEdit,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";

type CaseBlock = {
  conditions: Array<ts.Expression>;
  block: ts.Block;
};

export type SwitchBlocks = {
  cases: Array<CaseBlock>;
  elseBlock: ts.Block | undefined;
};

export function parseSwitchBlocks(
  switchStatement: ts.SwitchStatement,
  tree: TransformedNodeTree
): SwitchBlocks {
  const finishedClauses: Array<{
    kind: ts.SyntaxKind.CaseClause | ts.SyntaxKind.DefaultClause;
    conditions: Array<ts.Expression>;
    block: ts.Block;
  }> = [];

  let activeClauses: Array<{
    kind: ts.SyntaxKind.CaseClause | ts.SyntaxKind.DefaultClause;
    conditions: Array<ts.Expression>;
    statements: Array<ts.Statement>;
    block: ts.Block | undefined;
  }> = [];

  function updateFinishedClauses() {
    finishedClauses.push(
      ...activeClauses.map(({ block, kind, conditions, statements }) => {
        // remove final break statement:
        if (ts.isBreakStatement(statements[statements.length - 1])) {
          statements = statements.slice(0, -1);
        }

        return {
          kind,
          conditions,
          block:
            block != null
              ? tree.updateBlock(block, {
                  statements,
                })
              : tree.createBlock({
                  statements,
                }),
        };
      })
    );
  }

  for (const clause of switchStatement.caseBlock.clauses) {
    // combine clauses when there are no statements:
    if (clause.statements.length === 0) {
      if (
        activeClauses.length === 0 ||
        activeClauses[activeClauses.length - 1].kind !== clause.kind
      ) {
        activeClauses.push({
          kind: clause.kind,
          conditions: ts.isCaseClause(clause) ? [clause.expression] : [],
          statements: [],
          block: undefined,
        });
      } else if (ts.isCaseClause(clause)) {
        activeClauses[activeClauses.length - 1].conditions.push(
          clause.expression
        );
      } else {
        throw new Error("only one default clause allowed");
      }
      continue;
    }

    // unwrap statements when there is a single block:
    let statements = clause.statements.slice();
    let block: ts.Block | undefined = undefined;
    if (statements.length === 1 && ts.isBlock(statements[0])) {
      block = statements[0];
      statements = block.statements.slice();
    }

    // create new clause if needed:
    if (
      activeClauses.length === 0 ||
      activeClauses[activeClauses.length - 1].kind !== clause.kind ||
      activeClauses[activeClauses.length - 1].statements.length > 0
    ) {
      activeClauses.push({
        kind: clause.kind,
        conditions: ts.isCaseClause(clause) ? [clause.expression] : [],
        statements: [], // will be filled below
        block,
      });
    } else if (ts.isCaseClause(clause)) {
      const lastActiveClause = activeClauses[activeClauses.length - 1];
      lastActiveClause.conditions.push(clause.expression);
      lastActiveClause.block = block;
    } else {
      throw new Error("only one default clause allowed");
    }

    // append statements to active clauses:
    // TODO need to handle breaks in the middle of the statement list -- problematic -- show error or not match
    for (const activeClause of activeClauses) {
      const lastActiveStatement =
        activeClause.statements[activeClause.statements.length - 1];

      if (lastActiveStatement != null) {
        tree.updateTrivia(
          new TrailingSeparatorTriviaEdit(lastActiveStatement, true)
        );
      }

      activeClause.statements.push(...statements);
    }

    if (!BlockTerminatorStatement.isStatementListTerminated(statements)) {
      continue;
    }

    updateFinishedClauses();
    activeClauses = [];
  }

  updateFinishedClauses();

  return {
    cases: finishedClauses
      .filter((clause) => clause.kind === ts.SyntaxKind.CaseClause)
      .map((clause) => ({
        conditions: clause.conditions,
        block: clause.block,
      })),
    elseBlock: finishedClauses.find(
      (clause) => clause.kind === ts.SyntaxKind.DefaultClause
    )?.block,
  };
}
