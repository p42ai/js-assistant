import ts from "typescript";

export const isRest = (bindingElement: ts.BindingElement) =>
  bindingElement.dotDotDotToken != null;

export const isObjectRest = (bindingElement: ts.BindingElement) =>
  ts.isObjectBindingPattern(bindingElement.parent) && isRest(bindingElement);

export const isShorthand = (bindingElement: ts.BindingElement) =>
  bindingElement.propertyName == null &&
  ts.isObjectBindingPattern(bindingElement.parent) &&
  !isRest(bindingElement);

export const getPropertyIdentifier = (
  bindingElement: ts.BindingElement
): ts.Identifier | undefined => {
  const name = bindingElement.propertyName ?? bindingElement.name;
  return ts.isIdentifier(name) ? name : undefined;
};

/**
 * Checks whether this binding element or any of its parents has a default value
 * that might be applied at runtime.
 */
export const hasDefault = (bindingElement: ts.BindingElement): boolean => {
  let node: ts.Node = bindingElement;

  while (ts.isBindingElement(node)) {
    if (node.initializer != null) {
      return true;
    }
    node = node.parent.parent;
  }

  return false;
};
