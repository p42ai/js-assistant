import ts from "typescript";
import * as ast from "../matcher/ast";
import { Context } from "../matcher/engine/Context";

/**
 * Finds all local (inside the class) references to a class property or method that
 * have the form `this.propertyName`.
 *
 * @param propertyName - The name of the method or property that is searched.
 * @param classNode - The class that is the context for the local search.
 * @param context - The context in which to search.
 * @param isEcmaScriptPrivate - Whether the property is an ECMAScript private property.
 *
 * @returns An array of references to the identifier.
 */
export function findLocalPropertyReferences({
  propertyName,
  classNode,
  context,
  isEcmaScriptPrivate = false,
}: {
  propertyName: string;
  classNode: ts.ClassLikeDeclaration;
  context: Context;
  isEcmaScriptPrivate?: boolean;
}) {
  const predicate = ast.propertyAccessExpression({
    expression: ast.thisExpression(),
    name: isEcmaScriptPrivate
      ? ast.privateIdentifier({
          text: propertyName,
        })
      : ast.identifier({
          text: propertyName,
        }),
  });

  const references: Array<ts.PropertyAccessExpression> = [];
  const visitor = (node: ts.Node): void => {
    if (predicate(node, context)) {
      references.push(node as ts.PropertyAccessExpression);
    }

    if (!ts.isClassDeclaration(node) && !ts.isClassExpression(node)) {
      ts.forEachChild(node, visitor);
    }
  };

  classNode.forEachChild(visitor);

  return references;
}
