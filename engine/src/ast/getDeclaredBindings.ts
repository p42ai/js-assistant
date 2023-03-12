import ts from "typescript";
import { Binding } from "../augmentation/scope/Binding";
import { Context } from "../matcher/engine/Context";
import { visitSelfAndEachDescendant } from "./visitSelfAndEachDescendant";

export const getDeclaredBindings = Object.freeze({
  /**
   * Returns all bindings that are **declared** inside an identifier, object binding pattern, array binding
   * pattern. This does not include bindings that are used in initializers, renames etc.
   */
  forBindingName(
    bindingName: ts.BindingName,
    context: Context
  ): Array<Binding> {
    const bindings: Array<Binding> = [];

    // TODO ignore local bindings inside inner functions
    visitSelfAndEachDescendant(bindingName, (descendant) => {
      if (!ts.isIdentifier(descendant)) {
        return;
      }

      const reference = context.getBindingReference(descendant);

      if (reference?.isDeclaration) {
        bindings.push(reference.binding);
      }
    });

    return bindings;
  },

  forVariableDeclarationList(
    declarationList: ts.VariableDeclarationList,
    context: Context
  ): Array<Binding> {
    return declarationList.declarations.flatMap((declaration) =>
      this.forBindingName(declaration.name, context)
    );
  },

  forVariableStatement(
    variableStatement: ts.VariableStatement,
    context: Context
  ): Array<Binding> {
    return this.forVariableDeclarationList(
      variableStatement.declarationList,
      context
    );
  },

  /**
   * Returns the declared bindings from all VariableStatements in the statement list
   */
  forStatements(statements: Array<ts.Statement>, context: Context) {
    const variableStatements = statements.filter((statement) =>
      ts.isVariableStatement(statement)
    ) as Array<ts.VariableStatement>;

    return variableStatements.flatMap((variableStatement) =>
      this.forVariableStatement(variableStatement, context)
    );
  },
});
