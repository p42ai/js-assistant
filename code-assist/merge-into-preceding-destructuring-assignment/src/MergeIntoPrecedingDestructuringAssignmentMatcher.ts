
import {
  capture,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
  VariableDeclarationKind,
} from "@p42/engine";
import ts from "typescript";
import { MergeIntoPrecedingDestructuringAssignmentCandidate } from "./MergeIntoPrecedingDestructuringAssignmentCandidate";

const { ast, path } = m;

export class MergeIntoPrecedingDestructuringAssignmentMatcher extends PatternMatcher<MergeIntoPrecedingDestructuringAssignmentCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableStatement],
  };

  createPattern() {
    const captures = {
      source: capture.node<ts.Expression>(),

      previousVariableDeclarationList:
        capture.node<ts.VariableDeclarationList>(),
      variableDeclarationList: capture.node<ts.VariableDeclarationList>(),

      previousPattern: capture.node<ts.ObjectBindingPattern>(),
      pattern: capture.node<ts.ObjectBindingPattern>(),

      previousDeclaration: capture.node<ts.VariableDeclaration>(),
      declaration: capture.node<ts.VariableDeclaration>(),
    };

    const destructuringAssignmentVariableDeclarationList = (
      declarationListCapture: capture.ValueCapture<
        ts.VariableDeclarationList,
        Context
      >,
      patternCapture: capture.ValueCapture<ts.ObjectBindingPattern, Context>,
      declarationCapture: capture.ValueCapture<ts.VariableDeclaration, Context>
    ) =>
      declarationListCapture.record({
        match: ast.variableDeclarationList({
          declarations: p.array(
            declarationCapture.record({
              match: ast.variableDeclaration({
                name: patternCapture.record({
                  match: ast.objectBindingPattern({
                    elements: p.every(
                      ast.bindingElement({
                        isRest: false,
                      })
                    ),
                  }),
                }),
                initializer: p.isDefined(captures.source.record()),
              }),
            })
          ),
        }),
      });

    return {
      match: ast.variableStatement({
        declarationList: destructuringAssignmentVariableDeclarationList(
          captures.variableDeclarationList,
          captures.pattern,
          captures.declaration
        ),
        constraints: [
          path.previousStatement(
            ast.variableStatement({
              declarationList: destructuringAssignmentVariableDeclarationList(
                captures.previousVariableDeclarationList,
                captures.previousPattern,
                captures.previousDeclaration
              ),
            })
          ),
        ],
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: MergeIntoPrecedingDestructuringAssignmentCandidate["node"],
    captures: MergeIntoPrecedingDestructuringAssignmentCandidate["captures"],
    context: Context
  ): MergeIntoPrecedingDestructuringAssignmentCandidate["data"] {
    const previousDeclarationKind =
      VariableDeclarationKind.getVariableDeclarationKind(
        captures.previousVariableDeclarationList
      );
    const declarationKind = VariableDeclarationKind.getVariableDeclarationKind(
      captures.variableDeclarationList
    );

    return {
      declarationKind,
      previousDeclarationKind,
      targetDeclarationKind: previousDeclarationKind.combine(declarationKind),
    };
  }
}
