import * as _ from "lodash";
import ts from "typescript";
import { convertFirstCharacterToLowerCase } from "../../util/text/convertFirstCharacterToLowerCase";
import { convertToSingular } from "../../util/text/convertToSingular";

type extractName = (node: ts.Node) => string | undefined;

const extractFromIdentifier: extractName = (node: ts.Node) => {
  if (ts.isIdentifier(node)) {
    return node.text;
  }

  if (ts.isPrivateIdentifier(node)) {
    return node.text.substring(1); // remove #
  }
};

const extractFromPropertyAccessExpression: extractName = (node: ts.Node) => {
  if (ts.isPropertyAccessExpression(node)) {
    return extractFromIdentifier(node.name);
  }
};

const extractFromFunctionCall =
  (prefixName: string): extractName =>
  (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text.startsWith(prefixName)
    ) {
      return convertFirstCharacterToLowerCase(
        node.expression.text.substring(prefixName.length)
      );
    }
  };

const extractFromMethodCall =
  (prefixName: string): extractName =>
  (node: ts.Node) => {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      ts.isIdentifier(node.expression.name) &&
      node.expression.name.text.startsWith(prefixName)
    ) {
      return convertFirstCharacterToLowerCase(
        node.expression.name.text.substring(prefixName.length)
      );
    }
  };

const extractFromNewExpression: extractName = (node: ts.Node) => {
  if (ts.isNewExpression(node) && ts.isIdentifier(node.expression)) {
    return convertFirstCharacterToLowerCase(node.expression.text);
  }
};

const extractFromInnerExpression =
  (delegate: extractName): extractName =>
  (node: ts.Node) => {
    if (
      ts.isAsExpression(node) ||
      ts.isAwaitExpression(node) ||
      ts.isNonNullExpression(node) ||
      ts.isParenthesizedExpression(node)
    ) {
      return delegate(node.expression);
    }
  };

const extractFromArrayElementAccess =
  (delegate: extractName): extractName =>
  (node: ts.Node) => {
    if (ts.isElementAccessExpression(node)) {
      const collectionName = delegate(node.expression);
      if (collectionName != null) {
        const collectionElementName = convertToSingular({
          pluralWord: collectionName,
          noSpaces: true,
        });

        if (collectionElementName != null) {
          return collectionElementName;
        }
      }
    }
  };

const extractFromExtractors: extractName = (node: ts.Node) => {
  for (const extractName of extractors) {
    const name = extractName(node);
    if (name != null) {
      return name;
    }
  }
};

const extractors: Array<extractName> = [
  extractFromIdentifier,
  extractFromPropertyAccessExpression,
  extractFromFunctionCall("get"),
  extractFromFunctionCall("create"),
  extractFromMethodCall("get"),
  extractFromMethodCall("create"),
  extractFromNewExpression,
  extractFromInnerExpression(extractFromExtractors),
  extractFromArrayElementAccess(extractFromExtractors),
];

export const extractVariableName = (node: ts.Node): string | undefined => {
  let name;

  for (const extractName of extractors) {
    name = extractName(node);
    if (name != null) {
      break;
    }
  }

  return name == null || name.length === 0 ? undefined : name;
};
