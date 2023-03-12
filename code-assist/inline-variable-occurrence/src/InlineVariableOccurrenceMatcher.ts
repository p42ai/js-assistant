
import {
  capture,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { InlineVariableOccurrenceMatch } from "./InlineVariableOccurrenceMatch";

const { ast } = m;

export class InlineVariableOccurrenceMatcher extends PatternMatcher<InlineVariableOccurrenceMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.Identifier],
  };

  constructor() {
    super(InlineVariableOccurrenceMatch);
  }

  createPattern() {
    const captures = {
      initializer: capture.node<ts.Expression>(),
    };

    return {
      match: ast.identifier({
        bindingReference: ast.bindingReference({
          isDeclaration: false,
          isRead: true,
          isWrite: false,
          binding: ast.binding({
            // TODO identifier should be different from match node
            // TODO identifier needs to be on left side of variable declaration
            declaringNodes: p.array(
              ast.identifier({
                parent: ast.variableDeclaration({
                  initializer: p.isDefined(captures.initializer.record()),
                }),
              })
            ),
            // TODO extract & remove code duplication (see "move const to outer scope")
            writeReferences: (writeReferences) => writeReferences.length === 1,
          }),
        }),
      }),
      captures,
    };
  }
}
