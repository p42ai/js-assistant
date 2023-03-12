import {
  capture,
  Context,
  getFirstAncestorOrSelfOfKind,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertIfElseToSwitchCandidate } from "./ConvertIfElseToSwitchCandidate";

const { ast } = m;

export class ConvertIfElseToSwitchMatcher extends PatternMatcher<ConvertIfElseToSwitchCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.IfStatement],
  };

  createPattern() {
    const captures = {
      expression: capture.node<ts.Expression>(),
      conditionList: capture.set<ts.Expression>(),
      bodyList: capture.set<ts.Statement>(),
      operatorList:
        capture.set<
          | ts.SyntaxKind.EqualsEqualsEqualsToken
          | ts.SyntaxKind.EqualsEqualsToken
        >(),
      elseBody: capture.node<ts.Statement>(),
    };

    const recordOperator = captures.operatorList.record(
      p.toPrimitivePredicate([
        ts.SyntaxKind.EqualsEqualsEqualsToken,
        ts.SyntaxKind.EqualsEqualsToken,
      ])
    );

    const matchElse = (recursion: p.Predicate<ts.Node | undefined, Context>) =>
      p.or(
        p.isUndefined,
        recursion,
        p.and(p.not(ast.ifStatement()), captures.elseBody.record())
      );

    const optionalParenthesis = (
      expression: p.Predicate<ts.Node | undefined, Context>
    ) =>
      p.or(
        ast.parenthesizedExpression({
          expression,
        }),
        expression
      );

    const leftCondition = optionalParenthesis(
      ast.binaryExpression({
        left: captures.conditionList.record(),
        operator: recordOperator,
        right: captures.expression.record(),
      })
    );

    const rightCondition = optionalParenthesis(
      ast.binaryExpression({
        left: captures.expression.record(),
        operator: recordOperator,
        right: captures.conditionList.record(),
      })
    );

    const checkpointCondition = (
      match: p.Predicate<ts.Node | undefined, Context>
    ) =>
      captures.operatorList.checkpoint(
        captures.conditionList.checkpoint(captures.expression.checkpoint(match))
      );

    const conditionRecursion = (
      base: p.Predicate<ts.Node | undefined, Context>
    ) =>
      p.or(
        checkpointCondition(base),
        ast.binaryExpression({
          left: p.recursive<ts.Node | undefined, Context>((recursion) =>
            p.or(
              checkpointCondition(base),
              ast.binaryExpression({
                left: recursion,
                operator: ts.SyntaxKind.BarBarToken,
                right: p.or(
                  checkpointCondition(leftCondition),
                  checkpointCondition(rightCondition)
                ),
              })
            )
          ),
          operator: ts.SyntaxKind.BarBarToken,
          right: p.or(
            checkpointCondition(leftCondition),
            checkpointCondition(rightCondition)
          ),
        })
      );

    const matchIfChain = p.recursive<ts.Node | undefined, Context>(
      (recursion) =>
        p.or(
          captures.bodyList.checkpoint(
            checkpointCondition(
              ast.ifStatement({
                expression: conditionRecursion(rightCondition),
                thenStatement: captures.bodyList.record(),
                elseStatement: matchElse(recursion),
              })
            )
          ),
          ast.ifStatement({
            expression: conditionRecursion(leftCondition),
            thenStatement: captures.bodyList.record(),
            elseStatement: matchElse(recursion),
          })
        )
    );

    const parentIsNoIfStatement = (node: ts.Node) =>
      node.parent != null && !ts.isIfStatement(node.parent);

    return {
      match: p.and(parentIsNoIfStatement, matchIfChain),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ConvertIfElseToSwitchCandidate["node"],
    captures: ConvertIfElseToSwitchCandidate["captures"],
    context: Context
  ): ConvertIfElseToSwitchCandidate["data"] {
    const groupedConditions: Array<Array<ts.Expression>> = [];

    let currentIfStatement: ts.IfStatement | undefined = undefined;
    let currentGroup: Array<ts.Expression> = [];
    captures.conditionList.forEach((condition) => {
      const ifStatement = getFirstAncestorOrSelfOfKind(condition, [
        ts.SyntaxKind.IfStatement,
      ])! as ts.IfStatement;

      if (ifStatement !== currentIfStatement) {
        currentIfStatement = ifStatement;
        currentGroup = [condition];
        groupedConditions.push(currentGroup);
      } else {
        currentGroup.push(condition);
      }
    });

    return { groupedConditions };
  }
}
