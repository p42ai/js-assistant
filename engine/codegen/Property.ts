export type Property = {
  name: string;
  parameterName: string;
  kind: "node-array" | "node" | "token" | "value";
  type: string | Array<string>;
  optional: boolean;
  optionalForUpdate: boolean | undefined; // default: value of optional
  modifiable: boolean | undefined; // default: true
  copyable: boolean | undefined; // default: true
  optionalChaining: boolean | undefined; // default: false

  /**
   * For some factory methods, arrays need to be recasted into node arrays to match
   * the TypeScript API. Internally they don't rely on the specifics of node-array
   * (since they reuse the create methods), so this is fine.
   *
   * Defaults to false.
   *
   * @see isFactoryUpdateRecastNecessary
   */
  factoryUpdateRecast: boolean | undefined;
};

export function isOptional(property: Property, isUpdate: boolean) {
  return isUpdate && property.optionalForUpdate != null
    ? property.optionalForUpdate
    : property.optional;
}

export function getPropertyType(
  property: Property,
  isUpdate: boolean,
  array = "Array",
  optionalValue = "null"
) {
  function expandTypeForPropertyKind(type: string) {
    switch (property.kind) {
      case "node":
      case "node-array":
      case "token":
        return `ts.${type}`;
      case "value":
        return type;
    }
  }

  function expandType(): string {
    return Array.isArray(property.type)
      ? property.type.map((type) => expandTypeForPropertyKind(type)).join(" | ")
      : expandTypeForPropertyKind(property.type);
  }

  let text = "";

  switch (property.kind) {
    case "node-array":
      text += `${array}<${expandType()}>`;
      break;
    default:
      text += expandType();
      break;
  }

  if (isOptional(property, isUpdate)) {
    text += ` | ${optionalValue}`;
  }

  return text;
}

export function getParameterName(property: Property): string {
  return property.parameterName ?? property.name;
}

export function isFactoryUpdateRecastNecessary(property: Property): boolean {
  return property.factoryUpdateRecast ?? false;
}
