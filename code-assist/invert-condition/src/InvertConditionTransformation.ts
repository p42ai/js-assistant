
import { nullishConstant } from "@p42/augmentation-undefined-alias";
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  factory,
  getIndicatorText,
  matchers as m,
  NodeRange,
  predicates as p,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { InvertConditionCandidate } from "./InvertConditionCandidate";

const { ast } = m;

export class InvertConditionTransformation extends Transformation<InvertConditionCandidate> {
  async apply(match: InvertConditionCandidate, tree: TransformedNodeTree) {
    let invertedCondition = factory.negateExpression(
      match.captures.condition,
      tree,
      match.context
    );

    // remove unnecessary parentheses:
    if (ts.isParenthesizedExpression(invertedCondition)) {
      invertedCondition = invertedCondition.expression;
    }

    if (ts.isConditionalExpression(match.node)) {
      // invert ternary:
      tree.replace(
        match.node,
        tree.updateConditionalExpression(match.node, {
          condition: invertedCondition,
          whenTrue: match.node.whenFalse,
          whenFalse: match.node.whenTrue,
        })
      );
    } else {
      // invert if-else:
      const elseReplacement = ast.block({
        statements: p.array(ast.ifStatement()),
      })(match.node.thenStatement, match.context)
        ? (match.node.thenStatement as ts.Block).statements[0]
        : match.node.thenStatement;

      tree.replace(
        match.node,
        tree.updateIfStatement(match.node, {
          expression: invertedCondition,
          thenStatement: getThenReplacement(match.node.elseStatement, tree),
          elseStatement: elseReplacement,
        })
      );
    }
  }

  analyzeSafety(match: InvertConditionCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: InvertConditionCandidate,
    safety: Safety
  ): Suggestion | null {
    const { innerCondition } = match.captures;

    // TODO figure out how to recommend function extraction
    if (
      // only for negated conditions:
      !match.data.isNegated ||
      // no suggestion when it would introduce an if block:
      (ts.isIfStatement(match.node) &&
        (match.node.elseStatement == null ||
          !ts.isBlock(match.node.elseStatement))) ||
      // no suggestion for nested conditional expressions:
      (ts.isConditionalExpression(match.node) &&
        (ts.isConditionalExpression(match.node.whenTrue) ||
          ts.isConditionalExpression(match.node.whenFalse))) ||
      (ts.isConditionalExpression(match.node) &&
        ts.isBinaryExpression(innerCondition) &&
        (nullishConstant(innerCondition.left, match.context) ||
          nullishConstant(innerCondition.right, match.context))) ||
      // no suggestion for !! condition:
      (ts.isPrefixUnaryExpression(match.captures.innerCondition) &&
        match.captures.innerCondition.operator ===
          ts.SyntaxKind.ExclamationToken)
    ) {
      return null;
    }

    return {
      description: ts.isIfStatement(match.node)
        ? `You can invert the if-statement condition '${getIndicatorText(
            match.captures.condition
          )}' and swap the if- and else-blocks.`
        : `You can invert the condition '${getIndicatorText(
            match.captures.condition
          )}' and swap the expressions.`,
      shortActionLabel: "Invert",
      highlightRanges: [NodeRange.node(match.captures.condition)],
    };
  }

  getActionZones(
    match: InvertConditionCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const zones: Array<{
      range: Range;
      level?: CodeAssistLevel.CodeAssistLevel;
    }> = [
      {
        range: NodeRange.node(match.captures.condition),
      },
    ];

    if (isSuggestion) {
      zones.push(
        match.data.hasNegationPrefix
          ? {
              range: NodeRange.prefixUnaryExpression(
                match.captures.condition as ts.PrefixUnaryExpression
              ),
              level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
            }
          : {
              range: NodeRange.binaryExpressionOperator(
                match.captures.innerCondition as ts.BinaryExpression
              ),
              level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
            }
      );
    }

    if (ts.isIfStatement(match.node)) {
      zones.push({
        range: NodeRange.ifStatementIfKeyword(match.node),
      });
    }

    return createActionZones("Invert condition", zones);
  }
}

function getThenReplacement(
  elseStatement: ts.Statement | undefined,
  tree: TransformedNodeTree
) {
  if (elseStatement == null) {
    // insert empty block when there is no else statement:
    return tree.createBlock({ statements: [] });
  }

  // add block to new then statement when it's an if
  return ts.isIfStatement(elseStatement)
    ? tree.createBlock({
        statements: [elseStatement],
      })
    : elseStatement;
}
