
import {
  getSortedBindings,
  Context,
  matchers as m,
  PatternMatcher,
  predicates as p,
} from "@p42/engine";
import ts from "typescript";
import { ExtractJsxElementCandidate } from "./ExtractJsxElementCandidate";

const { ast } = m;

export class ExtractJsxElementMatcher extends PatternMatcher<ExtractJsxElementCandidate> {
  candidates = {
    nodes: [
      ts.SyntaxKind.JsxElement,
      ts.SyntaxKind.JsxFragment,
      ts.SyntaxKind.JsxSelfClosingElement,
    ],
  };

  createPattern() {
    const captures = {};

    return {
      match: p.and(
        p.or(ast.jsxElement(), ast.jsxSelfClosingElement(), ast.jsxFragment()),
        m.selectionRange()
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ExtractJsxElementCandidate["node"],
    captures: ExtractJsxElementCandidate["captures"],
    context: Context
  ): ExtractJsxElementCandidate["data"] {
    // find external variables that are used inside the JSX element:
    const sourceFile = matchedNode.getSourceFile();
    const sourceFileScope = context.getScope(sourceFile);
    const sortedBindings = getSortedBindings(matchedNode, context)
      // remove all global bindings:
      .filter((binding) => !binding.isGlobal)
      // remove all variables that are available on the top scope:
      .filter((binding) => binding.scope !== sourceFileScope)
      // remove all variables that are only declared and used inside the JSX element:
      .filter(
        (binding) =>
          !binding.references.every((reference) =>
            context
              .getAncestors(reference.identifier)
              .containsValue(matchedNode, context)
          )
      );

    // determine parameter types:
    const { checker } = context.typeSystem;
    const parameterTypes = context.scriptMetadata.isTypeScript()
      ? sortedBindings.map((binding) => {
          const type = checker.getTypeAtLocation(binding.declaringNodes[0]);

          let typeNode = checker.typeToTypeNode(type, undefined, undefined);

          const isUnknown =
            typeNode == null || typeNode?.kind === ts.SyntaxKind.AnyKeyword;

          if (isUnknown) {
            typeNode = ts.factory.createToken(ts.SyntaxKind.UnknownKeyword);
          }

          return {
            name: binding.name,
            isUnknown,
            typeNode: typeNode!,
          };
        })
      : undefined;

    return {
      sortedBindings,
      parameterTypes,
      typeName: ts.isJsxFragment(matchedNode) ? "fragment" : "element",
    };
  }
}
