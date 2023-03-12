import { Definition, getFactoryMethodName } from "./Definition";
import { Emitter } from "./Emitter";
import {
  getParameterName,
  getPropertyType,
  isFactoryUpdateRecastNecessary,
  isOptional,
  Property,
} from "./Property";

const generateUpdateParameterList = (properties: Array<Property>): string =>
  properties
    .map((property) => {
      if (property.modifiable === false) {
        return null;
      }

      let text = "      ";
      text += `${getParameterName(property)} = original.${property.name}`;

      if (property.kind === "node-array") {
        if (property.optional === true) {
          text += "?";
        }
        text += ".slice()"; // convert readonly node array to array
      }
      text += ",";

      return text;
    })
    .filter((value) => value != null)
    .join("\n");

const parameterValueList = (properties: Array<Property>): string =>
  properties
    .map((property) => {
      let text = "      ";
      text += getParameterName(property);
      text += ",";

      return text;
    })
    .join("\n");

const generateParameterTypeList = (
  properties: Array<Property>,
  isUpdate: boolean
): string => {
  let text = "";

  properties.forEach((property) => {
    if (isUpdate && property.modifiable === false) {
      return;
    }

    text += "      ";
    text += getParameterName(property);
    if (isUpdate || property.optional) {
      text += "?";
    }
    text += `: ${getPropertyType(property, isUpdate)};\n`;
  });

  return text;
};

const marked = (property: Property, isUpdate: boolean) => {
  const propertyName = getParameterName(property);
  switch (property.kind) {
    case "node-array": {
      let text = isOptional(property, isUpdate)
        ? `this.markOriginalOptionalNodeArray(${propertyName})`
        : `this.markOriginalNodeArray(${propertyName})`;

      if (isFactoryUpdateRecastNecessary(property)) {
        text += ` as unknown as ${getPropertyType(
          property,
          isUpdate,
          "ts.NodeArray",
          "undefined"
        )}`;
      }

      return text;
    }
    case "node":
      return isOptional(property, isUpdate)
        ? `this.markOriginalOptionalNode(${propertyName})`
        : `this.markOriginalNode(${propertyName})`;
    case "token":
    case "value":
      return isOptional(property, isUpdate)
        ? `${propertyName} ?? undefined`
        : `${propertyName}`;
  }
};

const generateArgumentList = (
  properties: Array<Property>,
  isUpdate: boolean
): string =>
  properties
    .map((property) =>
      isUpdate && property.modifiable === false
        ? null
        : `        ${marked(property, isUpdate)}`
    )
    .filter((value) => value != null)
    .join(",\n");

function generateCreateParamList(properties: Property[]) {
  return properties.length === 0
    ? ""
    : `{
${parameterValueList(properties)}
    }: {
${generateParameterTypeList(properties, false)}
    }`;
}

function createUpdateParamList(properties: Property[]) {
  return properties.length === 0
    ? ""
    : `{
${generateUpdateParameterList(properties)}
    }: {
${generateParameterTypeList(properties, true)}
    }`;
}

const generateUpdateCall = (definition: Definition) => {
  if (definition.generate?.factory === "syntheticUpdate") {
    const callParams =
      definition.properties.length === 0
        ? ""
        : `{
  ${parameterValueList(definition.properties)}
    }`;
    return `this.create${definition.name}(${callParams})`;
  }

  return `ts.factory.update${getFactoryMethodName(definition)}(
        original,
${generateArgumentList(definition.properties, true)}
      )`;
};

export function generateTransformedNodeTree(definitions: Array<Definition>) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  let text = `import ts from "typescript";
import { AbstractTransformedNodeTree } from "./AbstractTransformedNodeTree";

export class TransformedNodeTree extends AbstractTransformedNodeTree {
  constructor(originalSource: ts.SourceFile) {
    super(originalSource);
  }

`;

  for (const definition of definitions) {
    if (
      definition.generate?.factory === "generated" ||
      definition.generate?.factory === "syntheticUpdate" ||
      definition.generate?.factory === undefined
    ) {
      text += `  create${definition.name}(
    ${generateCreateParamList(definition.properties)}
  ) {
    return this.markNewNode(
      ts.factory.create${getFactoryMethodName(definition)}(
${generateArgumentList(definition.properties, false)}
      )
    );
  }

`;

      text += `  update${definition.name}(
    original: ts.${definition.name},
    ${createUpdateParamList(definition.properties)}
  ) {
    return this.markModifiedNode(
      ${generateUpdateCall(definition)}, 
      original
    );
  }

`;
    }
  }

  text += `}
`;

  emitter.emit(text);
  emitter.writeToFile(`src/transformation/TransformedNodeTree.generated.ts`);
}
