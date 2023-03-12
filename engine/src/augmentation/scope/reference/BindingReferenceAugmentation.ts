import ts from "typescript";
import { findIdentifierPatternContainer } from "../../../ast/findIdentifierPatternContainer";
import { getId } from "../../../ast/getId";
import { BinaryOperator } from "../../../ast/BinaryOperator";
import { getFunctionScopeNode, isScopeNode } from "../../../ast/ScopeNode";
import { Context } from "../../../matcher/engine/Context";
import { AugmentationErrorHandler } from "../../AugmentationErrorHandler";
import { SourceFileNodeAugmentation } from "../../SourceFileNodeAugmentation";
import { BindingKind } from "../BindingKind";
import { Scope } from "../Scope";
import { ScopeAugmentation } from "../ScopeAugmentation";
import { BindingReference } from "./BindingReference";
import { isVarDeclarationList } from "../../../ast/VariableDeclarationKind";

export const BindingReferenceAugmentation = new SourceFileNodeAugmentation<
  BindingReference | undefined
>(
  "bindingReference",
  (
    sourceFile: ts.SourceFile,
    context: Context,
    handleAugmentationError: AugmentationErrorHandler
  ) => {
    const bindingReferencesByNode = new Map<ts.Node, BindingReference>();

    // Performance: direct access to scope map
    const scopeMap = context.getNodeAugmentationValues(ScopeAugmentation);

    const globalScope = ScopeAugmentation.getValue(sourceFile, context)!
      .parent!;

    const augmentIdentifier = (identifier: ts.Identifier, scope: Scope) => {
      const { parent } = identifier;

      // exclude identifiers that are part of type definitions
      if (ts.isPropertySignature(parent)) {
        return;
      }

      // exclude property access expression properties e.g., b.x:
      if (ts.isPropertyAccessExpression(parent) && parent.name === identifier) {
        return;
      }

      // exclude object property keys, e.g. { myVar: 123 }:
      if (ts.isPropertyAssignment(parent) && parent.name === identifier) {
        return;
      }

      // exclude object property names in destructuring expressions:
      if (ts.isBindingElement(parent) && parent.propertyName === identifier) {
        return;
      }

      // exclude JSX property names:
      if (ts.isJsxAttribute(parent) && parent.name === identifier) {
        return;
      }

      // TODO local function name that matches outer variable

      let referenceBinding = scope.getBinding(identifier.text);

      // if there is no binding, the variable is a global property at this
      // point (every other condition should have been ruled out above)
      if (referenceBinding == null) {
        referenceBinding = globalScope.declareBinding({
          kind: BindingKind.GLOBAL,
          name: identifier.text,
        });
      }

      const container = findIdentifierPatternContainer(identifier);
      const containerParent = container?.parent;

      // performance: use inline boolean expressions:
      const isDeclaration =
        // variable declaration:
        (ts.isVariableDeclaration(containerParent) &&
          containerParent.name === container) ||
        // parameter declaration:
        (ts.isParameter(containerParent) &&
          containerParent.name === container) ||
        // named function:
        (ts.isFunctionDeclaration(containerParent) &&
          containerParent.name === container) ||
        // class declaration
        (ts.isClassDeclaration(containerParent) &&
          containerParent.name === container);

      // performance: use inline boolean expressions:
      const isPureWrite =
        // initialized declaration:
        (ts.isVariableDeclaration(containerParent) &&
          containerParent.name === container &&
          containerParent.initializer != null) ||
        // pure assignment:
        (ts.isBinaryExpression(containerParent) &&
          containerParent.left === container &&
          containerParent.operatorToken.kind === ts.SyntaxKind.EqualsToken) ||
        // for-of initializer:
        (ts.isForOfStatement(containerParent) &&
          containerParent.initializer === container) ||
        // for-in initializer:
        (ts.isForInStatement(containerParent) &&
          containerParent.initializer === container);

      // performance: use inline boolean expressions:
      const isWrite =
        isPureWrite ||
        // assignments like += are both read and write
        (ts.isBinaryExpression(containerParent) &&
          BinaryOperator.isAssignment(containerParent.operatorToken.kind) &&
          containerParent.left === container) ||
        // postfix/prefix expressions are both read and write:
        ((ts.isPrefixUnaryExpression(containerParent) ||
          ts.isPostfixUnaryExpression(containerParent)) &&
          (containerParent.operator === ts.SyntaxKind.PlusPlusToken ||
            containerParent.operator === ts.SyntaxKind.MinusMinusToken) &&
          containerParent.operand === container);

      // a binding reference is affected by a with block if is defined outside of the with block
      let isAffectedByWith = false;
      let currentScope: Scope | undefined = scope;
      while (currentScope != null && currentScope !== referenceBinding.scope) {
        if (currentScope.isWithScope) {
          isAffectedByWith = true;
          break;
        }
        currentScope = currentScope.parent;
      }

      const reference = new BindingReference(
        identifier,
        referenceBinding,
        isWrite,
        !isDeclaration && !isPureWrite,
        isAffectedByWith
      );

      bindingReferencesByNode.set(identifier, reference);
      referenceBinding.references.push(reference);

      if (isDeclaration) {
        // For hoisted variables, the declaration binding can be different
        // from the reference binding, because var statements can be hoisted,
        // and e.g. a catch clause can shadow the hoisted declaration.

        if (
          (ts.isVariableDeclaration(containerParent) &&
            ts.isVariableDeclarationList(containerParent.parent) &&
            isVarDeclarationList(containerParent.parent)) ||
          ts.isFunctionDeclaration(containerParent)
        ) {
          const functionScope = scopeMap.get(
            // hoisted function declaration - need to break out of function itself:
            getFunctionScopeNode(
              ts.isFunctionDeclaration(containerParent)
                ? containerParent.parent
                : containerParent
            )
          );
          const hoistedBinding = functionScope?.getBinding(identifier.text);

          if (hoistedBinding == null) {
            throw new Error(
              `no hoisted binding found for ${getId(identifier)}`
            );
          }

          hoistedBinding.declaringNodes.push(identifier);
        } else {
          referenceBinding.declaringNodes.push(identifier);
        }
      }
    };

    // Performance notes:
    // a) implemented as single pass algorithm over all identifiers in the AST to address
    //    performance caused by tree visit duplication when going scope-by-scope.
    // b) tracking scope in single pass to avoid scope lookup per identifier
    const visit = (node: ts.Node, scope: Scope) => {
      if (ts.isIdentifier(node)) {
        try {
          augmentIdentifier(node, scope);
        } catch (error) {
          handleAugmentationError(BindingReferenceAugmentation, node, error);
        }
        return;
      }

      if (isScopeNode(node)) {
        scope = scopeMap.get(node)!;
      }

      ts.forEachChild(node, (child) => {
        visit(child, scope);
      });
    };

    visit(sourceFile, globalScope);

    return bindingReferencesByNode;
  }
);
