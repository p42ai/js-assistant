import { Definition, getSyntaxKind } from "./Definition";
import { Emitter } from "./Emitter";
import { getParameterName, getPropertyType, Property } from "./Property";

const recursiveCallParameters = (properties: Array<Property>): string =>
  properties
    .map((property) => {
      if (property.modifiable === false) {
        return null;
      }

      const propertyName = getParameterName(property);
      switch (property.kind) {
        case "node-array":
          return `        ${propertyName}: updateNodeArrayAttribute(castedNode.${
            property.name
          }) as ${getPropertyType(property, true)}`;
        case "node":
          return `        ${propertyName}: updateNodeAttribute(castedNode.${
            property.name
          }) as ${getPropertyType(property, true)}`;
        case "token":
        case "value":
          return `        ${propertyName}: castedNode.${property.name}`;
      }
    })
    .filter((value) => value != null)
    .join(",\n");

export function generateUpdateNode(definitions: Array<Definition>) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  emitter.emit(`
import ts from "typescript";
import { getSyntaxKindLabel } from "../../ast/getSyntaxKindLabel";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
`);

  emitter.emit(`
export function updateNode({
  node,
  nodePaths,
  replacements,
  tree
}: {
  node: ts.Node;
  nodePaths: Array<Array<ts.Node>>; // TODO replace with class
  replacements: Map<ts.Node, ts.Node | null>;
  tree: TransformedNodeTree
}): ts.Node {
  const firstPathNodes = nodePaths.map((path) => path[0]);

  function updateNodeAttribute(original: ts.Node | undefined): ts.Node | undefined {
    if (original == null) {
      return original;
    }

    if (replacements.has(original)) {
      const replacementOriginal = replacements.get(original)!;

      return replacementOriginal === null ? undefined : replacementOriginal;
    }

    if (firstPathNodes.includes(original)) {
      const limitedPaths = nodePaths.filter((path) => path[0] === original);
      limitedPaths.forEach((path) => path.splice(0, 1));

      return updateNode({
        node: original,
        nodePaths: limitedPaths,
        replacements,
        tree,
      });
    }

    // TypeScript automatically inserts ParenthesizedExpression nodes when needed. These
    // new parenthesized expressions have no position.
    return original.pos === -1 
      ? tree.markNewNode(original) 
      : tree.markOriginalNode(original);
  }

  function updateNodeArrayAttribute(originalArray: ts.NodeArray<ts.Node> | undefined) {
    if (originalArray == null) {
      return originalArray;
    }

    const nodes: ts.Node[] = [];
    for (const originalStatement of originalArray) {
      const updatedNode = updateNodeAttribute(originalStatement);

      if (updatedNode != null) {
        nodes.push(updatedNode);
      }
    }

    return nodes;
  }

  switch (node.kind) {
`);

  for (const definition of definitions) {
    if (definition.generate?.factory === "none") {
      continue;
    }

    const callParameters =
      definition.properties.length === 0
        ? null
        : recursiveCallParameters(definition.properties);

    const callArgument =
      callParameters == null
        ? ""
        : `, {
${callParameters}
      }`;

    emitter.emit(`    case ${getSyntaxKind(definition)}: {
      const castedNode = node as ts.${definition.name};
      return tree.update${definition.name}(castedNode${callArgument});`);

    emitter.emit(`
    }
`);
  }

  emitter.emit(`
    case ts.SyntaxKind.ElementAccessExpression: {
      if (ts.isElementAccessChain(node)) {
        return tree.markModifiedNode(
          ts.factory.updateElementAccessChain(
            node,
            updateNodeAttribute(node.expression) as ts.Expression,
            node.questionDotToken,
            updateNodeAttribute(node.argumentExpression) as ts.Expression,
          ),
          node
        );
      }

      const castedNode = node as ts.ElementAccessExpression;
      return tree.markModifiedNode(
        ts.factory.updateElementAccessExpression(
          castedNode,
          updateNodeAttribute(castedNode.expression) as ts.Expression,
          updateNodeAttribute(castedNode.argumentExpression) as ts.Expression,
        ),
        castedNode
      );
    }
    case ts.SyntaxKind.PropertyAccessExpression: {
      if (ts.isPropertyAccessChain(node)) {
        return tree.markModifiedNode(
          ts.factory.updatePropertyAccessChain(
            node,
            updateNodeAttribute(node.expression) as ts.Expression,
            node.questionDotToken,
            updateNodeAttribute(node.name) as ts.MemberName
          ),
          node
        );
      }

      const castedNode = node as ts.PropertyAccessExpression;
      return tree.markModifiedNode(
        ts.factory.updatePropertyAccessExpression(
          castedNode,
          updateNodeAttribute(castedNode.expression) as ts.Expression,
          updateNodeAttribute(castedNode.name) as ts.MemberName
        ),
        castedNode
      );
    }
    case ts.SyntaxKind.CallExpression: {
      if (ts.isCallChain(node)) {
        return tree.markModifiedNode(
          ts.factory.updateCallChain(
            node,
            updateNodeAttribute(node.expression) as ts.Expression,
            node.questionDotToken,
            updateNodeArrayAttribute(node.typeArguments) as Array<ts.TypeNode> | undefined,
            updateNodeArrayAttribute(node.arguments) as Array<ts.Expression>,
          ),
          node
        );
      }

      const castedNode = node as ts.CallExpression;
      return tree.markModifiedNode(
        ts.factory.updateCallExpression(
          castedNode,
          updateNodeAttribute(castedNode.expression) as ts.Expression,
          updateNodeArrayAttribute(castedNode.typeArguments) as Array<ts.TypeNode> | undefined,
          updateNodeArrayAttribute(castedNode.arguments) as Array<ts.Expression>,
        ),
        castedNode
      );
    }
    case ts.SyntaxKind.SourceFile: {
      const sourceFile = node as ts.SourceFile;

      return tree.markModifiedNode(
        ts.factory.updateSourceFile(
          sourceFile,
          updateNodeArrayAttribute(
            sourceFile.statements,
          ) as Array<ts.Statement>,
          sourceFile.isDeclarationFile,
          sourceFile.referencedFiles,
          sourceFile.typeReferenceDirectives,
          sourceFile.hasNoDefaultLib,
          sourceFile.libReferenceDirectives
        ),
        sourceFile
      );
    }
    default:
      throw \`updateNode: unsupported node kind \${getSyntaxKindLabel(
        node.kind
      )}\`;
  }
}`);

  emitter.writeToFile(`src/transformation/factory/updateNode.generated.ts`);
}
