import {
  Binding,
  Context,
  EditorOperation,
  Match,
  NodeRange,
  nameOracle,
  predicates as p,
  matchers as m,
  Range,
  TransformedNodeTree,
  BindingReference,
} from "@p42/engine";
import ts from "typescript";

const { ast } = m;

export type ArrayLoopMatchType = "for-element" | "for-of" | "for-each";

export type ArrayMatchNode =
  | ts.ForStatement
  | ts.ForOfStatement
  | ts.ExpressionStatement;

export type ArrayMatchCaptures = {
  /**
   * Expression that contains the array.
   */
  arrayExpression: ts.Expression;

  /**
   * Binding of the element variable, if it exists. `undefined` otherwise.
   */
  elementBinding: Binding | undefined;

  /**
   * Binding of the index variable, if it exists. `undefined` otherwise.
   */
  indexBinding: Binding | undefined;

  /**
   * Loop body. Can be a single statement or a block.
   */
  body: ts.Statement;

  /**
   * Binding of the size (length) variable. `undefined` when there is no special variable for the
   * array length.
   */
  sizeBinding: Binding | undefined;
};

export type ArrayMatchData = {
  type: ArrayLoopMatchType;
  typeLabel: string;
};

export class ArrayLoopMatch
  implements Match<ArrayMatchNode, ArrayMatchCaptures, ArrayMatchData>
{
  constructor(
    readonly node: ArrayMatchNode,
    readonly captures: ArrayMatchCaptures,
    readonly data: ArrayMatchData,
    readonly context: Context
  ) {}

  getBindingReferencesInBody(binding: Binding) {
    const isLoopBody = p.same<ts.Node, Context>(this.captures.body);
    return binding.references.filter((reference) =>
      this.context
        .getAncestors(reference.identifier)
        .contains(isLoopBody, this.context)
    );
  }

  getIndexReferencesInBody() {
    return this.captures.indexBinding != null
      ? this.getBindingReferencesInBody(this.captures.indexBinding)
      : undefined;
  }

  getElementDeclaration() {
    return this.captures.elementBinding?.declaringNodes[0]?.parent as
      | ts.VariableDeclaration // for-of, for-element
      | ts.ParameterDeclaration // for-each
      | undefined;
  }

  getIndexDeclaration() {
    return this.captures.indexBinding?.declaringNodes[0]?.parent as
      | ts.VariableDeclaration // for-of, for-element
      | ts.ParameterDeclaration // for-each
      | undefined;
  }

  /**
   * Creates parameters that can be used in .map or .forEach.
   */
  createLoopFunctionParameters(tree: TransformedNodeTree): {
    parameters: Array<ts.ParameterDeclaration>;
    renameOperation: () => EditorOperation.EditorOperation | undefined;
  } {
    const { arrayExpression, body, indexBinding, elementBinding } =
      this.captures;

    const elementDeclaration = this.getElementDeclaration();
    const elementParameter =
      elementDeclaration != null && ts.isParameter(elementDeclaration)
        ? elementDeclaration
        : tree.createParameterDeclaration({
            name:
              elementDeclaration?.name ??
              tree.createIdentifier({
                text: nameOracle.generateVariableName(
                  nameOracle.elementVariableName(
                    nameOracle.extractVariableName(arrayExpression)
                  ),
                  this.context.getScope(body)
                ),
              }),
            type: elementDeclaration?.type,
          });

    const indexDeclaration = this.getIndexDeclaration();
    const parameters = [elementParameter];

    // TODO what if indexDeclaration is a parameter already?
    if (
      indexBinding != null &&
      (indexBinding.references.length > 4 || // 4 = declare, compare, increment, read
        (elementBinding == null && indexBinding.references.length > 3))
    ) {
      parameters.push(
        tree.createParameterDeclaration({
          name: indexDeclaration!.name,
          type: indexDeclaration!.type,
        })
      );
    }

    const hasGeneratedElementParameterName = elementDeclaration?.name == null;

    return {
      parameters,
      // rename operation has to be invoked at the end to get the correct path:
      renameOperation: () =>
        hasGeneratedElementParameterName
          ? EditorOperation.rename(tree.getNodePath(elementParameter.name))
          : undefined,
    };
  }

  /** Remove the variable that contains the array length, if possible:
   * 2 references: declare + use
   */
  removeSizeBindingIfOnlyUsedInLoopIteration(tree: TransformedNodeTree) {
    const { sizeBinding } = this.captures;
    if (sizeBinding?.references.length === 2) {
      tree.remove(sizeBinding.declaringNodes[0]); // TODO retain comments & whitespace
    }
  }

  getLoopHeadRange(): Range {
    switch (this.data.type) {
      case "for-of":
      case "for-element":
        return NodeRange.loopHead(
          this.node as ts.ForStatement | ts.ForOfStatement
        );
      case "for-each": {
        // TODO extract somehow into augmentation
        const callExpression = (this.node as ts.ExpressionStatement)
          .expression as ts.CallExpression;
        const propertyAccess =
          callExpression.expression as ts.PropertyAccessExpression;

        // TODO activation on function head
        return NodeRange.node(propertyAccess.name);
      }
    }
  }

  getElementVariable(tree: TransformedNodeTree): {
    name: string;
    identifier: ts.Identifier;
    type?: ts.TypeNode | undefined;
    declarationFlags?: ts.NodeFlags | undefined;
    isSynthesized: boolean;
  } {
    const elementDeclaration = this.getElementDeclaration();

    if (elementDeclaration != null) {
      // element variable exists already:
      return {
        name: elementDeclaration.name.getText(),
        identifier: elementDeclaration.name as ts.Identifier, // TODO what if this is not an identifier?
        type: elementDeclaration.type,
        declarationFlags: elementDeclaration.parent.flags,
        isSynthesized: false,
      };
    }

    // TODO what if index references is null
    const indexReferences = this.getIndexReferencesInBody()!;

    const elementVariableName: string = nameOracle.generateVariableName(
      nameOracle.elementVariableName(
        nameOracle.extractVariableName(this.captures.arrayExpression)
      ),
      ...indexReferences.map((reference) =>
        this.context.getScope(reference.identifier)
      )
    );

    return {
      name: elementVariableName,
      identifier: tree.createIdentifier({
        text: elementVariableName,
      }),
      declarationFlags: undefined,
      isSynthesized: true,
    };
  }

  hasDirectIndexVariableAccess(): boolean {
    const indexReferences = this.getIndexReferencesInBody();

    if (indexReferences == null) {
      return false;
    }

    for (const indexReference of indexReferences) {
      if (this.isElementVariableDeclaration(indexReference)) {
        continue;
      }

      if (this.isIndependentIndexVariableUsage(indexReference)) {
        return true;
      }
    }

    return false;
  }

  replaceElementVariablesInBody(
    elementVariableName: string,
    tree: TransformedNodeTree
  ): { elementVariableReplacements: Array<ts.Identifier> } {
    const { elementBinding } = this.captures;
    const indexReferences = this.getIndexReferencesInBody();

    if (indexReferences == null) {
      return {
        elementVariableReplacements: [],
      };
    }

    // replace direct array[index] access with element variable:
    // because of prior matching, parent of index match can be replaced with element reference
    const elementVariableReplacements: Array<ts.Identifier> = [];
    for (const indexReference of indexReferences) {
      if (this.isElementVariableDeclaration(indexReference)) {
        continue;
      }

      if (this.isIndependentIndexVariableUsage(indexReference)) {
        continue;
      }

      const elementVariableReplacement = tree.createIdentifier({
        text: elementVariableName,
      });

      tree.replace(
        indexReference.identifier.parent,
        elementVariableReplacement
      );

      elementVariableReplacements.push(elementVariableReplacement);
    }

    if (elementBinding != null) {
      // remove the element declaration from the body
      tree.remove(elementBinding.declaringNodes[0]!.parent);
    }

    return {
      elementVariableReplacements,
    };
  }

  private isIndependentIndexVariableUsage(indexReference: BindingReference) {
    return !ast.elementAccessExpression({
      expression: m.equalsNodeStructure(this.captures.arrayExpression),
      argumentExpression: p.same<ts.Expression | undefined, Context>(
        indexReference.identifier
      ),
    })(indexReference.identifier.parent, this.context);
  }

  private isElementVariableDeclaration(indexReference: BindingReference) {
    const elementBindingDeclarator = this.getElementDeclaration();
    return (
      elementBindingDeclarator != null &&
      this.context
        .getAncestors(indexReference.identifier.parent)
        .contains(
          p.same<ts.Node, Context>(elementBindingDeclarator),
          this.context
        )
    );
  }
}
