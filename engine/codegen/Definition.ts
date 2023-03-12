import { Property } from "./Property";

export type Definition = {
  name: string;

  /**
   * Can override the syntax kind name (ts.SyntaxKind.XXX) to match the TypeScript API.
   * Defaults to the value of 'name'
   */
  syntaxKind: string | undefined;

  /**
   * Can override the factory method names (createXXX, updateXXX) to match the TypeScript API.
   * Defaults to the value of 'name'
   */
  factoryMethodName: string | undefined;

  generate:
    | {
        factory:
          | "generated"
          | "syntheticUpdate"
          | "custom"
          | "none"
          | undefined; // default: generated
        matcher: boolean | undefined; // default: false
      }
    | undefined;
  properties: Array<Property>;
};

export function getSyntaxKind(definition: Definition) {
  return `ts.SyntaxKind.${definition.syntaxKind ?? definition.name}`;
}

export function getFactoryMethodName(definition: Definition) {
  return definition.factoryMethodName ?? definition.name;
}
