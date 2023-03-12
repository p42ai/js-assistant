import {
  arrayLoop,
  ArrayLoopAugmentation,
  ArrayLoopMatch,
} from "@p42/augmentation-array-loop";
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  ConvertLoopToMapMatch,
  ConvertLoopToMapMatchType,
} from "./ConvertLoopToMapMatch";

const { ast, path } = m;

export class ConvertLoopToMapMatcher extends PatternMatcher<ConvertLoopToMapMatch> {
  candidates = {
    patterns: [ArrayLoopAugmentation],
  };

  requiredAugmentations = [ArrayLoopAugmentation];

  createMatch(
    node: ConvertLoopToMapMatchType["node"],
    captures: ConvertLoopToMapMatchType["captures"],
    data: ConvertLoopToMapMatchType["data"],
    context: Context
  ): ConvertLoopToMapMatch {
    return new ConvertLoopToMapMatch(node, captures, data, context);
  }

  createPattern() {
    const captures = {
      loop: capture.value<ArrayLoopMatch>(),
      resultArray: capture.node<ts.Identifier>(),
      elementExpression: capture.node<ts.Expression>(),
      block: capture.node<ts.Block>(),
      variableDeclaration: capture.node<ts.VariableDeclaration>(),
    };

    return {
      match: arrayLoop({
        body: ast.block({
          statements: p.lastArrayElements(
            ast.expressionStatement({
              expression: ast.callExpression({
                expression: ast.propertyAccessExpression({
                  expression: captures.resultArray.record(),
                  name: ast.identifier({
                    text: "push",
                  }),
                }),
                args: p.array(captures.elementExpression.record()),
              }),
            })
          ),
          constraints: [captures.block.record()],
        }),
        node: path.previousStatement(
          ast.variableStatement({
            declarationList: ast.variableDeclarationList({
              declarations: p.array(
                captures.variableDeclaration.record({
                  match: ast.variableDeclaration({
                    name: captures.resultArray.record({
                      match: ast.identifier(),
                    }),
                    initializer: ast.arrayLiteralExpression({
                      elements: p.emptyArray(),
                    }), // TODO empty or new array (empty)
                  }),
                })
              ),
            }),
          })
        ),
        constraints: [captures.loop.record()],
      }),
      captures,
    };
  }
}
