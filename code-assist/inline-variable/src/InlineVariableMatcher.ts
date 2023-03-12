
import {
  Binding,
  BindingKind,
  capture,
  Context,
  JsxElement,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { InlineVariableMatch } from "./InlineVariableMatch";

const { ast, path } = m;

export class InlineVariableMatcher extends PatternMatcher<InlineVariableMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration, ts.SyntaxKind.BindingElement],
  };

  constructor() {
    super(InlineVariableMatch);
  }

  createPattern() {
    const captures = {
      binding: capture.value<Binding>(),
      variableStatement: capture.node<ts.VariableStatement>(),
    };

    const matchVariableDeclaration = (
      name?: p.Predicate<ts.BindingName, Context>
    ) =>
      ast.variableDeclaration({
        name,
        initializer: p.isDefined(),
        constraints: [
          path.parent(
            path.parent(
              captures.variableStatement.record({
                match: ast.variableStatement(),
              })
            )
          ),
        ],
      });

    const bindingReference = ast.bindingReference({
      binding: captures.binding.record({
        match: ast.binding({
          kind: [BindingKind.CONST, BindingKind.LET, BindingKind.VAR],
          constraints: [
            (binding) =>
              binding.references.length > 1 && // 1 reference is declaration
              binding.isConstant,
          ],
        }),
      }),
    });

    return {
      match: p.or(
        matchVariableDeclaration(
          ast.identifier({
            bindingReference,
          })
        ),
        ast.bindingElement({
          name: ast.identifier({
            bindingReference,
          }),
          constraints: [path.declarationRoot(matchVariableDeclaration())],
        })
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: InlineVariableMatch["node"],
    captures: InlineVariableMatch["captures"]
  ): InlineVariableMatch["data"] {
    return {
      // 1 reference is from the declaration, therefore -1
      readReferenceCount: captures.binding.references.length - 1,
    };
  }

  verifyMatch(match: InlineVariableMatch): boolean {
    const { binding } = match.captures;
    const initializer = match.variableDeclaration.initializer!;

    return binding.readReferences.every((reference) => {
      const { identifier } = reference;

      // TODO extract into engine?
      const referenceIsOutsideOfVariableInitializer = !match.context
        .getAncestors(identifier)
        .containsValue(initializer, match.context);

      return (
        referenceIsOutsideOfVariableInitializer &&
        !JsxElement.isTagName(identifier)
      );
    });
  }
}
