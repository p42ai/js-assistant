import ts from "typescript";

/**
 * Returns the initializers that are used for the (potentially many) variables that
 * are declared in a parameter or variable declaration.
 */
export const getInitializerExpressions = (
  declaration: ts.ParameterDeclaration | ts.VariableDeclaration
): Array<ts.Expression> => {
  const initializerExpression: Array<ts.Expression> = [];

  const visitBindingName = (node: ts.BindingName) => {
    if (ts.isArrayBindingPattern(node) || ts.isObjectBindingPattern(node)) {
      for (const element of node.elements) {
        if (ts.isOmittedExpression(element)) {
          continue;
        }

        if (element.initializer != null) {
          initializerExpression.push(element.initializer);
        }
        visitBindingName(element.name);
      }
    }
  };

  if (declaration.initializer != null) {
    initializerExpression.push(declaration.initializer);
  }

  visitBindingName(declaration.name);

  return initializerExpression;
};
