
import EqualityCheckAugmentation from "@p42/augmentation-equality-check";
import NullishCheckAugmentation, {
  nullishCheck,
} from "@p42/augmentation-nullish-check";
import UndefinedAliasAugmentation, {
  undefinedAlias,
} from "@p42/augmentation-undefined-alias";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertToOptionalChainingMatch } from "./ConvertToOptionalChainingMatch";

const { ast } = m;

export class ConvertToOptionalChainingMatcher extends PatternMatcher<ConvertToOptionalChainingMatch> {
  candidates = {
    nodes: [
      ts.SyntaxKind.BinaryExpression,
      ts.SyntaxKind.ConditionalExpression,
    ],
  };

  constructor() {
    super(ConvertToOptionalChainingMatch);
  }

  requiredAugmentations = [
    UndefinedAliasAugmentation,
    EqualityCheckAugmentation,
    NullishCheckAugmentation,
  ];

  createPattern() {
    const captures = {
      mainExpression: capture.node<ts.Expression>(),
      finalExpression: capture.node<ts.Expression>(),
      finalExpressionReplacementPart:
        capture.node<
          ts.PropertyAccessExpression | ts.ElementAccessExpression
        >(),
      finalMemberAccess: capture.node<ts.Expression>(),
      // only used internally to make a?.b <=> a.b checks possible:
      verification: capture.node<ts.Expression>({
        ignoreOptionalChaining: true,
        ignoreBindings: false,
      }),
      nullishCheckType:
        capture.value<"== null ||" | "!= null &&" | undefined>(),
    };

    const finalPropertyAccess = captures.finalExpressionReplacementPart.record({
      match: p.or(
        ast.propertyAccessExpression({
          expression: captures.verification.record(),
          name: captures.finalMemberAccess.record(),
        }),
        ast.elementAccessExpression({
          expression: captures.verification.record(),
          argumentExpression: captures.finalMemberAccess.record(),
        })
      ),
    });

    // recursion that enables having several additional member expression elements
    // after the optional chain, e.g. as in `a && a.b.c.d` => `a?.b.c.d`
    const finalPropertyAccessSequence = p.recursive<ts.Expression, Context>(
      (finalPropertyAccessRecursion) =>
        p.or(
          // final element:
          finalPropertyAccess,
          // recursion:
          ast.propertyAccessExpression({
            expression: finalPropertyAccessRecursion,
          })
        )
    );

    const finalExpression = p.or(
      // property access sequence:
      captures.finalExpression.record({
        match: finalPropertyAccessSequence,
      }),
      // call expression sequence:
      captures.finalExpression.record({
        match: p.or(
          // direct function call: f && f()
          captures.finalExpressionReplacementPart.record({
            match: ast.callExpression({
              expression: captures.verification.record(),
            }),
          }),
          // chained method call: a && a.b()
          ast.callExpression({
            expression: finalPropertyAccessSequence,
          })
        ),
      }),
      // // nullish pattern:
      // TODO any binary expression where property is on left end
      nullishCheck({
        node: captures.finalExpression.record(),
        checkedExpression: finalPropertyAccess,
        checkType: "EQ_EQ_NULL",
      })
    );

    const recordMainExpression = captures.mainExpression.record({
      match: captures.verification.record(),
    });

    return {
      match: p.or(
        ast.conditionalExpression({
          condition: nullishCheck({
            checkedExpression: recordMainExpression,
            isNegated: true,
          }),
          whenTrue: finalExpression,
          whenFalse: undefinedAlias(),
        }),
        ast.conditionalExpression({
          condition: nullishCheck({
            checkedExpression: recordMainExpression,
            isNegated: false,
          }),
          whenTrue: undefinedAlias(),
          whenFalse: finalExpression,
        }),
        ast.binaryExpression({
          left: p.or(
            nullishCheck({
              checkedExpression: recordMainExpression,
              isNegated: true,
              constraints: [
                captures.nullishCheckType.record({ value: "!= null &&" }),
              ],
            }),
            recordMainExpression
          ),
          operator: ts.SyntaxKind.AmpersandAmpersandToken,
          right: finalExpression,
        }),
        ast.binaryExpression({
          left: p.or(
            nullishCheck({
              checkedExpression: recordMainExpression,
              isNegated: false,
              constraints: [
                captures.nullishCheckType.record({ value: "== null ||" }),
              ],
            }),
            recordMainExpression
          ),
          operator: ts.SyntaxKind.BarBarToken,
          right: finalExpression,
        })
      ),
      captures,
    };
  }

  verifyMatch(match: ConvertToOptionalChainingMatch): boolean {
    const nullishCheckType = match.captures.nullishCheckType;

    if (nullishCheckType == null) {
      return true;
    }

    const finalNullishCheck = NullishCheckAugmentation.getValue(
      match.captures.finalExpression,
      match.context
    );

    if (finalNullishCheck == null) {
      return true;
    }

    return nullishCheckType === "== null ||"
      ? !finalNullishCheck.captures.isNegated
      : finalNullishCheck.captures.isNegated;
  }
}
