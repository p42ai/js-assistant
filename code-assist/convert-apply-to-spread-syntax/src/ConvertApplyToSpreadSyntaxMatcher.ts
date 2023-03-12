
import UndefinedAliasAugmentation, {
  nullishConstant,
} from "@p42/augmentation-undefined-alias";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ConvertApplyToSpreadSyntaxCandidate } from "./ConvertApplyToSpreadSyntaxCandidate";

const { ast } = m;

export class ConvertApplyToSpreadSyntaxMatcher extends PatternMatcher<ConvertApplyToSpreadSyntaxCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.CallExpression],
  };

  requiredAugmentations = [UndefinedAliasAugmentation];

  createPattern() {
    const captures = {
      calledExpression: capture.node<ts.Expression>(),
      args: capture.node<ts.Expression>(),
      objectName: capture.value<string>(),
      apply: capture.node<ts.Identifier>(),
    };

    // object.apply(firstArg, args)
    function convertibleApplyCall(
      object: p.Predicate<ts.Expression, Context>,
      firstArg: p.Predicate<ts.Node, Context>
    ) {
      return ast.callExpression({
        expression: ast.propertyAccessExpression({
          expression: captures.calledExpression.record({
            match: object,
          }),
          name: captures.apply.record({
            match: ast.identifier({ text: "apply" }),
          }),
        }),
        args: p.array(firstArg, captures.args.record()),
      });
    }

    const objectIdentifier = ast.identifier({
      text: captures.objectName.record(),
    });

    return {
      match: p.or(
        // a.f.apply(a, args)
        convertibleApplyCall(
          ast.propertyAccessExpression({
            expression: objectIdentifier,
            name: ts.isIdentifier,
          }),
          objectIdentifier
        ),
        // this.f.apply(this, args)
        convertibleApplyCall(
          ast.propertyAccessExpression({
            expression: ast.thisExpression(),
            name: ts.isIdentifier,
          }),
          ast.thisExpression()
        ),
        // f.apply(null, args), f.apply(undefined, args)
        convertibleApplyCall(ts.isIdentifier, nullishConstant)
      ),
      captures,
    };
  }
}
