import { Definition, getSyntaxKind } from "./Definition";
import { Emitter } from "./Emitter";

export function generateForEachChildWithAttribute(
  definitions: Array<Definition>
) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  emitter.emit(`
import ts from "typescript";
import { getSyntaxKindLabel } from "./getSyntaxKindLabel";

type ForEachChildWithAttributeCallback = (
  child: ts.Node,
  attribute: string,
  index?: number | undefined
) => void;

type ForEachChildArrayWithAttributeCallback = (
  children: ts.NodeArray<ts.Node>,
  attribute: string
) => void;

function visitChildNode(
  node: ts.Node,
  nodeCallback: ForEachChildWithAttributeCallback,
  attribute: string
): void {
  const attributeNode = (node as any)[attribute] as ts.Node | undefined;
  if (attributeNode != null) {
    nodeCallback(attributeNode, attribute);
  }
}

function visitChildNodes(
  node: ts.Node,
  nodeCallback: ForEachChildWithAttributeCallback,
  nodeArrayCallback: ForEachChildArrayWithAttributeCallback | undefined,
  attribute: string
): void {
  const attributeNodes = (node as any)[attribute] as
    | ts.NodeArray<ts.Node>
    | undefined;

  if (attributeNodes != null) {
    if (nodeArrayCallback != null) {
      nodeArrayCallback(attributeNodes, attribute);
    } else {
      for (let i = 0; i < attributeNodes.length; i++) {
        nodeCallback(attributeNodes[i], attribute, i);
      }
    }
  }
}

export function forEachChildWithAttribute<T>(
  node: ts.Node,
  nodeCallback: ForEachChildWithAttributeCallback,
  nodeArrayCallback?: ForEachChildArrayWithAttributeCallback | undefined
): T | undefined {
  if (node == null || node.kind <= ts.SyntaxKind.LastToken) {
    return;
  }
  switch (node.kind) {
`);

  for (const definition of definitions) {
    emitter.emit(`    case ${getSyntaxKind(definition)}: {`);

    for (let i = 0; i < definition.properties.length; i++) {
      const property = definition.properties[i];

      switch (property.kind) {
        case "token":
        case "node":
          emitter.emit(`
      visitChildNode(node, nodeCallback, "${property.name}")`);
          break;
        case "node-array":
          emitter.emit(`
      visitChildNodes(node, nodeCallback, nodeArrayCallback, "${property.name}")`);
          break;
        case "value":
          break;
        default:
          throw `unsupported property kind ${property.kind}`;
      }
    }

    emitter.emit(`
      return;
    }
`);
  }

  emitter.emit(`    // explicitly fail to prevent silently incorrect behavior when new versions of the
    // typescript AST become available:
    default:
      throw \`forEachChildWithAttribute: unsupported syntax type \${getSyntaxKindLabel(
        node.kind
      )}\`;
  }
}
`);

  emitter.writeToFile(`src/ast/forEachChildWithAttribute.generated.ts`);
}
