import { Definition, getSyntaxKind } from "./Definition";
import { Emitter } from "./Emitter";
import { getParameterName, Property } from "./Property";

const recursiveCallParameters = (properties: Array<Property>): string =>
  properties.length === 0
    ? ""
    : "{\n" +
      properties
        .map((property) => {
          if (property.copyable === false) {
            return null;
          }

          const propertyName = getParameterName(property);
          switch (property.kind) {
            case "node-array":
              return property.optional
                ? `          ${propertyName}: castedNode.${property.name}?.slice()`
                : `          ${propertyName}: castedNode.${property.name}.slice()`;
            case "node":
            case "token":
            case "value":
              return `          ${propertyName}: castedNode.${property.name}`;
          }
        })
        .filter((value) => value != null)
        .join(",\n") +
      "\n        }";

export function generateCopyShallow(definitions: Array<Definition>) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  emitter.emit(`
import ts from "typescript";
import { getRawText } from "../../ast/getRawText";
import { getSyntaxKindLabel } from "../../ast/getSyntaxKindLabel";
import { isSingleQuote } from "../../ast/isSingleQuote";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
`);

  emitter.emit(`
export function copyShallow<T extends ts.Node>(node: T, tree: TransformedNodeTree): T {
  switch (node.kind) {
    // keyword tokens (marking as new to be similar to other kinds where this happens inside tree):
    case ts.SyntaxKind.FalseKeyword: {
      const castedNode = node as unknown as ts.FalseLiteral;
      return tree.markCopiedNode(ts.factory.createFalse(), castedNode) as unknown as T;
    }
    case ts.SyntaxKind.TrueKeyword: {
      const castedNode = node as unknown as ts.TrueLiteral;
      return tree.markCopiedNode(ts.factory.createTrue(), castedNode) as unknown as T;
    }
    case ts.SyntaxKind.NullKeyword: {
      const castedNode = node as unknown as ts.NullLiteral;
      return tree.markCopiedNode(ts.factory.createNull(), castedNode) as unknown as T;
    }
    // optional chaining elements:
    case ts.SyntaxKind.CallExpression: {
      const castedNode = node as unknown as ts.CallExpression;
      const definition = {
        expression: castedNode.expression,
        typeArguments: castedNode.typeArguments?.slice(),
        argumentsArray: castedNode.arguments?.slice(),
      };
      return tree.markCopiedNode(
        (ts.isCallChain(node)
          ? tree.createCallChain(definition)
          : tree.createCallExpression(definition)),
        castedNode
      ) as unknown as T;
    }
    case ts.SyntaxKind.ElementAccessExpression: {
      const castedNode = node as unknown as ts.ElementAccessExpression;
      const definition = {
        expression: castedNode.expression,
        argumentExpression: castedNode.argumentExpression,
      };
      return tree.markCopiedNode(
        (ts.isElementAccessChain(node)
          ? tree.createElementAccessChain(definition)
          : tree.createElementAccessExpression(definition)),
        castedNode
      ) as unknown as T;
    }
    case ts.SyntaxKind.PropertyAccessExpression: {
      const castedNode = node as unknown as ts.PropertyAccessExpression;
      const definition = {
        expression: castedNode.expression,
        name: castedNode.name,
      };
      return tree.markCopiedNode(
        (ts.isPropertyAccessChain(node)
          ? tree.createPropertyAccessChain(definition)
          : tree.createPropertyAccessExpression(definition)),
        castedNode
      ) as unknown as T;
    }
    // manually defined copy mechanisms with special cases:
    case ts.SyntaxKind.SourceFile: {
      const castedNode = node as unknown as ts.SourceFile;
      return tree.updateSourceFile(castedNode, {
        statements: castedNode.statements.slice()
      }) as unknown as T;
    }
    case ts.SyntaxKind.StringLiteral: {
      const castedNode = node as unknown as ts.StringLiteral;
      return tree.markCopiedNode(
        tree.createStringLiteral({
          // need to recover original string literal text from source code text
          // to preserve escaped / unescaped versions of the original string literal
          // for reprinting:
          text: getRawText(castedNode, tree),
          isSingleQuote: isSingleQuote(castedNode, tree),
        }),
        castedNode
      ) as unknown as T;
    }
    case ts.SyntaxKind.NoSubstitutionTemplateLiteral: {
      const castedNode = node as unknown as ts.NoSubstitutionTemplateLiteral;
      return tree.markCopiedNode(
        tree.createNoSubstitutionTemplateLiteral({
          text: getRawText(castedNode),
        }),
        castedNode
      ) as unknown as T;
    }
    // fully generated copy mechanisms:
`);

  for (const definition of definitions) {
    const name = definition.name;
    if (
      [
        "SourceFile",
        "StringLiteral",
        "NoSubstitutionTemplateLiteral",
        "CallExpression",
        "ElementAccessExpression",
        "PropertyAccessExpression",
      ].includes(name)
    ) {
      continue;
    }

    emitter.emit(`    case ${getSyntaxKind(definition)}: {
      const castedNode = node as unknown as ts.${name};
      return tree.markCopiedNode(
        tree.create${name}(${recursiveCallParameters(definition.properties)}), 
        castedNode
      ) as unknown as T;`);

    emitter.emit(`
    }
`);
  }

  emitter.emit(`
    default:
      throw \`copyShallow: unsupported node kind \${getSyntaxKindLabel(
        node.kind
      )}\`;
  }
}`);

  emitter.writeToFile(`src/transformation/factory/copyShallow.generated.ts`);
}
