import ts from "typescript";
import { isExported } from "../../ast/Node";
import { NodeIndex } from "../../matcher/engine/NodeIndex";

export type SourceModuleKind = {
  id: "TYPESCRIPT" | "COMMON_JS" | "ECMASCRIPT" | "SCRIPT";
  isVarGlobal: boolean;
};

export type getSourceModuleKind = (nodes: NodeIndex) => SourceModuleKind;

/**
 * Typescript module kind. In Typescript code, 'var' statements are not global, because
 * they get properly encapsulated (or are using non-global formats like commonjs for node)
 * during the transpilation process.
 *
 * @see https://www.typescriptlang.org/docs/handbook/modules.html#code-generation-for-modules
 */
export const TYPESCRIPT_MODULE_KIND: SourceModuleKind = {
  id: "TYPESCRIPT",
  isVarGlobal: false,
};

/**
 * CommonJS module. It is assumed that this module is execute in a Node.js environment and
 * therefore is properly encapsulated.
 *
 * @see https://nodejs.org/api/modules.html#the-module-wrapper
 */
export const COMMON_JS_MODULE_KIND: SourceModuleKind = {
  id: "COMMON_JS",
  isVarGlobal: false,
};

/**
 * Regular script without any indication that it is run in a specific environment. It could be
 * run in the browser using a script tag and var declarations could be global.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script
 */
export const SCRIPT_MODULE_KIND: SourceModuleKind = {
  id: "SCRIPT",
  isVarGlobal: true,
};

/**
 * ECMAScript Module.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
 */
export const ECMASCRIPT_MODULE_KIND: SourceModuleKind = {
  id: "ECMASCRIPT",
  isVarGlobal: false,
};

export const getJavaScriptSourceModuleKind = (
  nodes: NodeIndex
): SourceModuleKind => {
  if (hasImport(nodes) || hasExport(nodes)) {
    return ECMASCRIPT_MODULE_KIND;
  }

  if (
    hasTopLevelRequire(nodes.sourceFile) ||
    hasTopLevelModuleExports(nodes.sourceFile)
  ) {
    return COMMON_JS_MODULE_KIND;
  }

  return SCRIPT_MODULE_KIND;
};

const hasImport = (nodes: NodeIndex) =>
  nodes.hasKind(ts.SyntaxKind.ImportDeclaration);

const hasExport = (nodes: NodeIndex) => {
  return (
    nodes.hasKind(ts.SyntaxKind.ExportAssignment) ||
    nodes.hasKind(ts.SyntaxKind.ExportDeclaration) ||
    nodes
      .getByKind(ts.SyntaxKind.FunctionDeclaration)
      ?.some((node) => isExported(node as ts.FunctionDeclaration)) ||
    nodes
      .getByKind(ts.SyntaxKind.VariableStatement)
      ?.some((node) => isExported(node as ts.VariableStatement)) ||
    nodes
      .getByKind(ts.SyntaxKind.ClassDeclaration)
      ?.some((node) => isExported(node as ts.ClassDeclaration))
  );
};

const hasTopLevelRequire = (sourceFile: ts.SourceFile) =>
  sourceFile.statements.some(
    (statement) =>
      ts.isVariableStatement(statement) &&
      statement.declarationList.declarations.some(
        (declaration) =>
          declaration.initializer != null &&
          ts.isCallExpression(declaration.initializer) &&
          ts.isIdentifier(declaration.initializer.expression) &&
          declaration.initializer.expression.text === "require" &&
          declaration.initializer.arguments.length === 1
      )
  );

// TODO not fully accurate, e.g. 'module' could be variable
const hasTopLevelModuleExports = (sourceFile: ts.SourceFile) =>
  sourceFile.statements.some(
    (statement) =>
      ts.isExpressionStatement(statement) &&
      ts.isBinaryExpression(statement.expression) &&
      statement.expression.operatorToken.kind === ts.SyntaxKind.EqualsToken &&
      ts.isPropertyAccessExpression(statement.expression.left) &&
      ts.isIdentifier(statement.expression.left.expression) &&
      statement.expression.left.expression.text === "module" &&
      ts.isIdentifier(statement.expression.left.name) &&
      statement.expression.left.name.text === "exports"
  );
