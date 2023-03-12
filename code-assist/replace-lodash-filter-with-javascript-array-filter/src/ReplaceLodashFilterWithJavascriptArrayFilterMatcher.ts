
import {
  lodashCall,
  LodashCallAugmentation,
} from "@p42/augmentation-lodash-call";
import { matchers as m, PatternMatcher, predicates as p } from "@p42/engine";
import { ReplaceLodashFilterWithJavascriptArrayFilterCandidate } from "./ReplaceLodashFilterWithJavascriptArrayFilterCandidate";

const { ast, type } = m;

export class ReplaceLodashFilterWithJavascriptArrayFilterMatcher extends PatternMatcher<ReplaceLodashFilterWithJavascriptArrayFilterCandidate> {
  candidates = {
    patterns: [LodashCallAugmentation],
  };

  requiredAugmentations = [LodashCallAugmentation];

  createPattern() {
    const captures = {};

    return {
      match: lodashCall({
        name: "filter",
        args: p.array(
          type.array,
          p.or(ast.arrowFunction(), ast.functionExpression())
        ),
      }),
      captures,
    };
  }
}
