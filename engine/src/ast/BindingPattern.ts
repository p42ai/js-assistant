import ts from "typescript";
import { ast } from "../matcher";
import { lastArrayElements } from "../matcher/predicate";
import { matchFromParent } from "./matchFromParent";

export const isLastArrayBindingElement = matchFromParent((child) =>
  ast.arrayBindingPattern({
    elements: lastArrayElements(child),
  })
);

export const collectBindings = (
  node: ts.BindingPattern
): Array<ts.BindingElement> => {
  const bindings: Array<ts.BindingElement> = [];

  const doCollectBindings = (node: ts.BindingPattern) => {
    for (const element of node.elements) {
      if (ts.isOmittedExpression(element)) {
        continue;
      }

      const elementName = element.name;

      if (ts.isIdentifier(elementName)) {
        bindings.push(element);
      } else if (
        ts.isArrayBindingPattern(elementName) ||
        ts.isObjectBindingPattern(elementName)
      ) {
        doCollectBindings(elementName);
      }
    }
  };

  doCollectBindings(node);

  return bindings;
};
