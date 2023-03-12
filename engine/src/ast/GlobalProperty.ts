/**
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects
 */
export class GlobalProperty {
  static NaN = "NaN";
  static Infinity = "Infinity";
  static undefined = "undefined";
  static globalThis = "globalThis";
}

export const GlobalProperties = [
  GlobalProperty.Infinity,
  GlobalProperty.undefined,
  GlobalProperty.NaN,
  GlobalProperty.globalThis,
];
