
import {
  Binding,
  BindingElement,
  capture,
  Context,
  getDeclaredBindings,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import {
  PushIntoInitialValueDeclarationMatch,
  PushIntoInitialValueDeclarationMatchType,
} from "./PushIntoInitialValueDeclarationMatch";

const { ast } = m;

export class PushIntoInitialValueDeclarationMatcher extends PatternMatcher<PushIntoInitialValueDeclarationMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclaration],
  };

  createMatch(
    node: PushIntoInitialValueDeclarationMatchType["node"],
    captures: PushIntoInitialValueDeclarationMatchType["captures"],
    data: PushIntoInitialValueDeclarationMatchType["data"],
    context: Context
  ): PushIntoInitialValueDeclarationMatch {
    return new PushIntoInitialValueDeclarationMatch(
      node,
      captures,
      data,
      context
    );
  }

  createPattern() {
    const captures = {
      target: capture.node<ts.Identifier>(),
      originBinding: capture.value<Binding>(),
    };

    return {
      match: ast.variableDeclaration({
        parent: ast.variableDeclarationList(),
        initializer: ast.identifier({
          binding: captures.originBinding.record({
            match: ast.binding({
              declaringNodes: p.array(
                captures.target.record({
                  match: ast.identifier(),
                })
              ),
              readReferences: m.array.hasLength(1),
              writeReferences: p.every(
                ast.bindingReference({
                  isDeclaration: true,
                })
              ),
            }),
          }),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: PushIntoInitialValueDeclarationMatch["node"],
    captures: PushIntoInitialValueDeclarationMatch["captures"],
    context: Context
  ): PushIntoInitialValueDeclarationMatch["data"] {
    return undefined;
  }

  verifyMatch(match: PushIntoInitialValueDeclarationMatch): boolean {
    const { node, targetParent, context } = match;

    if (
      !ts.isIdentifier(match.node.name) &&
      ts.isBindingElement(targetParent) &&
      BindingElement.isObjectRest(targetParent)
    ) {
      return false;
    }

    const targetScope = context.getScope(match.captures.target);

    // TODO extract some variant of binding/shadowing check:
    const identifierScope = context.getScope(node);
    if (targetScope === identifierScope) {
      return true;
    }
    // the pushed up variable names must not be used in any intermediate scope:
    return getDeclaredBindings
      .forBindingName(node.name, context)
      .every((binding) => !identifierScope.parent!.hasBinding(binding.name));
  }
}
