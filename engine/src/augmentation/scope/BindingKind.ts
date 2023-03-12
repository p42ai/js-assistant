/**
 * @see https://exploringjs.com/es6/ch_variables.html for more about scope in JavaScript
 */
export class BindingKind {
  readonly label: string;
  readonly isHoisted: boolean;
  readonly isReassignable: boolean;
  readonly isFunction: boolean;

  static GLOBAL = new BindingKind("global", false, true, false);
  static VAR = new BindingKind("var", true, true, false);
  static CONST = new BindingKind("const", false, false, false);
  static LET = new BindingKind("let", false, true, false);

  static PARAMETER = new BindingKind("parameter", false, true, false);
  static CATCH_PARAMETER = new BindingKind(
    "catchParameter",
    false,
    true,
    false
  );

  static CLASS = new BindingKind("class", false, false, false);

  /**
   * A named function that is not part of a variable declaration. It is hoisted
   * to the surrounding function scope.
   */
  static NAMED_FUNCTION = new BindingKind("namedFunction", true, false, true);

  /**
   * A named function with local scope, for example: `let a = function f() { console.log(f); }`.
   * In the example, the identifier f is bound to the function within itself, but not in the context
   * in which it is defined.
   */
  static LOCAL_NAMED_FUNCTION = new BindingKind(
    "localNamedFunction",
    false,
    false,
    true
  );

  /**
   * An imported module, e.g. 'Module' in `import Module from "@scope/module";`. Covers different kinds
   * of imports (namespace, named, etc.).
   */
  static IMPORT = new BindingKind("import", true, false, false);

  /**
   * An ES Module declaration or a TypeScript namespace.
   */
  static MODULE = new BindingKind("module", false, false, false);

  /**
   * A TypeScript type alias, e.g. `type Alias = 'a' | 'b';`
   */
  static TYPE_ALIAS = new BindingKind("typeAlias", false, false, false);

  /**
   * A TypeScript type parameter (for generics), e.g. `function f<PARAM>() { ... }`
   */
  static TYPE_PARAMETER = new BindingKind("typeParameter", false, false, false);

  /**
   * A TypeScript interface.
   */
  static INTERFACE = new BindingKind("interface", false, false, false);

  /**
   * A TypeScript enum.
   */
  static ENUM = new BindingKind("enum", false, false, false);

  /**
   * A CommonJS 'module' identifier (usually as part of "module.exports").
   */
  static COMMONJS_MODULE_IDENTIFIER = new BindingKind(
    "commonJsModuleIdentifier",
    false,
    false,
    false
  );

  constructor(
    label: string,
    isHoisted: boolean,
    isReassignable: boolean,
    isFunction: boolean
  ) {
    this.label = label;
    this.isHoisted = isHoisted;
    this.isReassignable = isReassignable;
    this.isFunction = isFunction;
  }
}
