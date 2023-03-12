export interface ImportInformation {
  /**
   * True if this import is importing the default export of the source.
   */
  isDefault: boolean;

  /**
   * True if this import is a namespace import.
   */
  isNamespace: boolean;

  /**
   * True if the import is dynamic, i.e. the import source is resolved at runtime.
   */
  isDynamic: boolean;

  /**
   * True if the import is static, i.e. the import source is a string literal.
   */
  isStatic: boolean;

  /**
   * True if the import is an EcmaScript module import statement.
   */
  isESMImport: boolean;

  /**
   * True if the import is a CommonJS require statement.
   */
  isCommonJSRequire: boolean;

  /**
   * Source of the import, i.e., the module (file or library) that is imported.
   * Only available for static imports (when the module specifier is a string literal).
   * Undefined for dynamic imports.
   */
  staticSource: string | undefined;
}
