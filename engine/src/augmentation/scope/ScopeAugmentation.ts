import ts from "typescript";
import { getDeclarationRoot } from "../../ast/getDeclarationRoot";
import { isFunctionScopeNode, isScopeNode } from "../../ast/ScopeNode";
import * as VariableDeclarationKind from "../../ast/VariableDeclarationKind";
import { getVariableDeclarationKind } from "../../ast/VariableDeclarationKind";
import { Context } from "../../matcher/engine/Context";
import { AugmentationErrorHandler } from "../AugmentationErrorHandler";
import { SourceFileNodeAugmentation } from "../SourceFileNodeAugmentation";
import { BindingDeclaration } from "./Binding";
import { BindingKind } from "./BindingKind";
import { DefaultImportInformation } from "./import/DefaultImportInformation";
import { Scope } from "./Scope";

const variableDeclarationKindToBindingKind = new Map<
  VariableDeclarationKind.VariableDeclarationKind,
  BindingKind
>();
variableDeclarationKindToBindingKind.set(
  VariableDeclarationKind.Const,
  BindingKind.CONST
);
variableDeclarationKindToBindingKind.set(
  VariableDeclarationKind.Let,
  BindingKind.LET
);
variableDeclarationKindToBindingKind.set(
  VariableDeclarationKind.Var,
  BindingKind.VAR
);

const getVariableDeclarationBindingKind = (
  variableDeclaration: ts.VariableDeclaration
): BindingKind => {
  const declarationParent = variableDeclaration.parent;
  return ts.isCatchClause(declarationParent)
    ? BindingKind.CATCH_PARAMETER
    : variableDeclarationKindToBindingKind.get(
        getVariableDeclarationKind(declarationParent)
      )!;
};

/**
 * @returns 'undefined' when the binding would have no name (e.g. unnamed function) and
 *          cannot be referenced.
 */
function getBindingDeclaration(
  symbol: ts.Symbol
): BindingDeclaration | undefined {
  const valueDeclaration = symbol.declarations?.[0];

  if (valueDeclaration == null) {
    throw `symbol has no value declaration`;
  }

  if (ts.isVariableDeclaration(valueDeclaration)) {
    const bindingName = valueDeclaration.name;

    // TODO expressions
    if (ts.isIdentifier(bindingName)) {
      return {
        symbol,
        name: symbol.name,
        kind: getVariableDeclarationBindingKind(valueDeclaration),
      };
    }
  }

  if (
    ts.isFunctionDeclaration(valueDeclaration) &&
    valueDeclaration.name != null
  ) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.NAMED_FUNCTION,
    };
  }

  if (ts.isFunctionExpression(valueDeclaration)) {
    // when the name is undefined, the function expression cannot be referenced, so returning
    // undefined is expected in this case
    return valueDeclaration.name != null
      ? {
          symbol,
          name: symbol.name,
          kind: BindingKind.LOCAL_NAMED_FUNCTION,
        }
      : undefined;
  }

  if (ts.isParameter(valueDeclaration)) {
    const bindingName = valueDeclaration.name;

    // TODO expressions
    if (ts.isIdentifier(bindingName)) {
      return {
        symbol,
        name: symbol.name,
        kind: BindingKind.PARAMETER,
      };
    }
  }

  // deconstructed expression, can be parameter or variable declaration
  if (ts.isBindingElement(valueDeclaration)) {
    const declaration = getDeclarationRoot(valueDeclaration);

    if (declaration != null) {
      return {
        symbol,
        name: symbol.name,
        kind: ts.isVariableDeclaration(declaration)
          ? getVariableDeclarationBindingKind(declaration)
          : BindingKind.PARAMETER,
      };
    }
  }

  if (
    ts.isClassDeclaration(valueDeclaration) &&
    valueDeclaration.name != null
  ) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.CLASS,
    };
  }

  // default import: import MyModule from "abc"
  if (ts.isImportClause(valueDeclaration) && valueDeclaration.name != null) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.IMPORT,
      importInformation: new DefaultImportInformation(valueDeclaration.parent),
    };
  }

  if (
    (ts.isImportSpecifier(valueDeclaration) ||
      ts.isNamespaceImport(valueDeclaration)) &&
    valueDeclaration.name != null
  ) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.IMPORT,
    };
  }

  if (ts.isTypeAliasDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.TYPE_ALIAS,
    };
  }

  if (ts.isTypeParameterDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.TYPE_PARAMETER,
    };
  }

  if (ts.isInterfaceDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.INTERFACE,
    };
  }

  if (ts.isModuleDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.MODULE,
    };
  }

  if (ts.isEnumDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.ENUM,
    };
  }

  if (ts.isIdentifier(valueDeclaration) && valueDeclaration.text === "module") {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.COMMONJS_MODULE_IDENTIFIER,
    };
  }

  if (ts.isImportEqualsDeclaration(valueDeclaration)) {
    return {
      symbol,
      name: symbol.name,
      kind: BindingKind.IMPORT,
    };
  }

  // ignore JSDoc bindings
  if (
    ts.isJSDocCallbackTag(valueDeclaration) ||
    ts.isJSDocTypedefTag(valueDeclaration)
  ) {
    return undefined;
  }

  // do not throw an error, because this.x = "123"; tries to cause a binding on "x"
  // through a binary expression
}

function findFunctionScope(scope: Scope): Scope | undefined {
  let currentScope: Scope | undefined = scope;
  while (
    currentScope?.node != null &&
    !isFunctionScopeNode(currentScope.node)
  ) {
    currentScope = currentScope.parent;
  }
  return currentScope;
}

function getDeclaringScope(kind: BindingKind, currentScope: Scope): Scope {
  switch (kind) {
    case BindingKind.NAMED_FUNCTION:
      return findFunctionScope(currentScope)!;
    default:
      return currentScope;
  }
}

function declareBinding(symbol: ts.Symbol, scope: Scope) {
  const binding = getBindingDeclaration(symbol);
  if (binding != null) {
    getDeclaringScope(binding.kind, scope).declareBinding(binding);
  }
}

export const ScopeAugmentation = new SourceFileNodeAugmentation<Scope>(
  "scope",
  (
    sourceFile: ts.SourceFile,
    context: Context,
    handleAugmentationError: AugmentationErrorHandler
  ) => {
    const scopesByNode = new Map<ts.Node, Scope>();

    let currentScope: Scope = new Scope(undefined, undefined);

    const visitor = (node: ts.Node): void => {
      try {
        if (!isScopeNode(node)) {
          ts.forEachChild(node, visitor);
          return;
        }

        const scope = new Scope(node, currentScope, ts.isWithStatement(node));

        scopesByNode.set(node, scope);

        // local symbols are undefined when there are no variable declarations in blocks
        const localSymbols = (node as any).locals as
          | Map<string, ts.Symbol>
          | undefined;

        if (localSymbols != null) {
          for (const symbol of localSymbols.values()) {
            try {
              declareBinding(symbol, scope);
            } catch (error) {
              handleAugmentationError(ScopeAugmentation, node, error);
            }
          }
        }

        // local binding for named function expressions:
        if (ts.isFunctionExpression(node) && (node as any).symbol != null) {
          try {
            declareBinding((node as any).symbol, scope);
          } catch (error) {
            handleAugmentationError(ScopeAugmentation, node, error);
          }
        }

        currentScope = scope;
        ts.forEachChild(node, visitor);
        currentScope = currentScope.parent!;
      } catch (error) {
        handleAugmentationError(ScopeAugmentation, node, error);
      }
    };

    visitor(sourceFile);

    return scopesByNode;
  }
);
