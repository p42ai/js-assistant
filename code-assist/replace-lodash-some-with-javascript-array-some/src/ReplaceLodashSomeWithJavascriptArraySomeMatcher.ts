
import {
  lodashCall,
  LodashCallAugmentation,
} from "@p42/augmentation-lodash-call";
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import { ReplaceLodashSomeWithJavascriptArraySomeCandidate } from "./ReplaceLodashSomeWithJavascriptArraySomeCandidate";

const { ast, type } = m;

export class ReplaceLodashSomeWithJavascriptArraySomeMatcher extends PatternMatcher<ReplaceLodashSomeWithJavascriptArraySomeCandidate> {
  candidates = {
    patterns: [LodashCallAugmentation],
  };

  requiredAugmentations = [LodashCallAugmentation];

  createPattern() {
    const captures = {};

    return {
      match: lodashCall({
        name: "some",
        args: p.array(
          type.array,
          p.or(ast.arrowFunction(), ast.functionExpression())
        ),
      }),
      captures,
    };
  }
}
