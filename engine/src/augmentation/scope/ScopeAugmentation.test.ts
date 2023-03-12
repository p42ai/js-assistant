import assert from "assert";
import ts from "typescript";
import { createParseAndAugmentFunction } from "../createParseAndAugmentFunction";
import { BindingKind } from "./BindingKind";
import { assertBindingDeclarations } from "./import/assertBindingDeclarations";
import { BindingReferenceAugmentation } from "./reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "./ScopeAugmentation";

async function parseAndAugment(source: string) {
  const { sourceFile: ast, context } = await createParseAndAugmentFunction([
    ScopeAugmentation,
    BindingReferenceAugmentation,
  ])(source);

  return { ast, mainScope: context.getScope(ast), context };
}

describe("ScopeAugmentation", () => {
  describe("with", () => {
    it("should introduce special scope for with statement", async () => {
      const { ast, context } = await parseAndAugment(`with (obj) {}`);

      const withNode = ast.statements[0] as ts.WithStatement;
      const withScope = ScopeAugmentation.getValue(withNode, context)!;

      expect(withScope.bindings.size).toStrictEqual(0);
      expect(withScope.isWithScope).toStrictEqual(true);

      const block = withNode.statement as ts.Block;
      const blockScope = ScopeAugmentation.getValue(block, context)!;

      expect(blockScope.parent).toStrictEqual(withScope);
      expect(blockScope.isWithScope).toStrictEqual(false);
    });
  });

  describe("binding kind", () => {
    it("should identify const binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`const a = 1;`);
      expect(mainScope.bindings.get("a")?.kind).toStrictEqual(
        BindingKind.CONST
      );
    });

    it("should identify let binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`let a = 1;`);
      expect(mainScope.bindings.get("a")?.kind).toStrictEqual(BindingKind.LET);
    });

    it("should identify var binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`var a = 1;`);
      expect(mainScope.bindings.get("a")?.kind).toStrictEqual(BindingKind.VAR);
    });

    it("should identify param binding", async () => {
      const { ast, context } = await parseAndAugment(`function f(a) {}`);
      expect(
        context.getScope(ast.statements[0]).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify param bindings in deconstructed array parameters", async () => {
      const { ast, context } = await parseAndAugment(`function f([a]) {}`);
      expect(
        context.getScope(ast.statements[0]).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify named function binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `function f() {}`
      );
      expect(mainScope.bindings.get("f")?.kind).toStrictEqual(
        BindingKind.NAMED_FUNCTION
      );
    });

    it("should identify class binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`class C {}`);
      expect(mainScope.bindings.get("C")?.kind).toStrictEqual(
        BindingKind.CLASS
      );
    });

    it("should identify local named function binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `const x = function f() {};`
      );
      // note: the binding is on the function itself, not the program scope
      const f = ast.statements[0].declarationList.declarations[0].initializer;
      expect(context.getScope(f).bindings.get("f")?.kind).toStrictEqual(
        BindingKind.LOCAL_NAMED_FUNCTION
      );
    });

    it("should identify import binding from regular imports", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `import Module from "@scope/module";`
      );
      expect(mainScope.bindings.get("Module")?.kind).toStrictEqual(
        BindingKind.IMPORT
      );
    });

    it("should identify import binding from namespace imports", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `import * as Module from "@scope/module";`
      );
      expect(mainScope.bindings.get("Module")?.kind).toStrictEqual(
        BindingKind.IMPORT
      );
    });

    it("should identify import binding from named imports", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `import { Module } from "@scope/module";`
      );
      expect(mainScope.bindings.get("Module")?.kind).toStrictEqual(
        BindingKind.IMPORT
      );
    });

    it("should identify type alias binding from type declarations", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `type Ty = 'a' | 'b';`
      );
      expect(mainScope.bindings.get("Ty")?.kind).toStrictEqual(
        BindingKind.TYPE_ALIAS
      );
    });

    it("should identify type parameter binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `function f<T>(p: T): void;`
      );
      const functionScope = context.getScope(ast.statements[0]);
      expect(functionScope.bindings.get("T")?.kind).toStrictEqual(
        BindingKind.TYPE_PARAMETER
      );
    });

    it("should identify interface binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `interface I { a: number; }`
      );
      expect(mainScope.bindings.get("I")?.kind).toStrictEqual(
        BindingKind.INTERFACE
      );
    });

    it("should identify namespace binding with Identifier", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `namespace x { export function f(): void; }`
      );
      expect(mainScope.bindings.get("x")?.kind).toStrictEqual(
        BindingKind.MODULE
      );
    });

    it("should identify module binding with Identifier", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `declare module M { export interface I {} }`
      );
      expect(mainScope.bindings.get("M")?.kind).toStrictEqual(
        BindingKind.MODULE
      );
    });

    it("should identify module binding with String Literal", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `declare module 'M' { export interface I {} }`
      );

      expect(mainScope.bindings.get('"M"')?.kind).toStrictEqual(
        BindingKind.MODULE
      );
    });

    it("should identify enum binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `enum E { a, b }`
      );
      expect(mainScope.bindings.get("E")?.kind).toStrictEqual(BindingKind.ENUM);
    });

    it("should identify CommonJS module identifier binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
module.exports = {
  a: "test"
};
`);
      expect(mainScope.bindings.get("module")?.kind).toStrictEqual(
        BindingKind.COMMONJS_MODULE_IDENTIFIER
      );
    });

    it("should identify import equals binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
import fs = require("a");
`);
      expect(mainScope.bindings.get("fs")?.kind).toStrictEqual(
        BindingKind.IMPORT
      );
    });

    it("should identify relative file import binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
import MyLibrary from "./lib.js";
MyLibrary.a.prototype = {}; // must not throw error
`);

      expect(mainScope.bindings.get("MyLibrary")?.kind).toStrictEqual(
        BindingKind.IMPORT
      );
    });

    it("should not throw error with JSDocCallbackTag binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
/**
 * @callback a
 */
function f(a = (c, d) => { return c === d; }) {
}
`);
    });

    it("should not throw error with JSDocTypedefTag binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
/**
 * @typedef A
 */
`);
    });

    it("should parameter binding inside constructor", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
class C {
  constructor(a) {
  }
}
`);

      const constructorNode = ast.statements[0].members[0];

      expect(
        context.getScope(constructorNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside typescript method signature", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
interface I {
  m(x: string): void;
}
`);

      const methodSignatureNode = ast.statements[0].members[0];

      expect(
        context.getScope(methodSignatureNode).bindings.get("x")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside typescript index signature", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `const a: { [key: string]: string } = {};`
      );

      const indexSignature =
        ast.statements[0].declarationList.declarations[0].type.members[0];

      expect(
        context.getScope(indexSignature).bindings.get("key")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside typescript construct signature", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
interface I {
  new (a: any): T;
}
`);

      const constructorSignatureNode = ast.statements[0].members[0];

      expect(
        context.getScope(constructorSignatureNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside typescript constructor type definition", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
interface I {
  f(x: new (...args: any[]) => void): void
}
`);

      const constructorTypeNode =
        ast.statements[0].members[0].parameters[0].type;

      expect(
        context.getScope(constructorTypeNode).bindings.get("args")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside typescript call signature", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
interface I {
  (a: T1): void;
}
`);

      const callSignatureNode = ast.statements[0].members[0];

      expect(
        context.getScope(callSignatureNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify variable binding inside case block", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
let a = 1;
switch (a) {
  case 1:
    const b = "1";
}
`);

      const { caseBlock } = ast.statements[1];

      expect(context.getScope(caseBlock).bindings.get("b")?.kind).toStrictEqual(
        BindingKind.CONST
      );
    });

    it("should identify variable binding inside namespace", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
namespace ns {
  var a;
}
`);

      const namespaceNode = ast.statements[0];

      expect(
        context.getScope(namespaceNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.VAR);
    });

    it("should identify parameter binding inside setter", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
class C {
  set a(x) {
    this.aValue = x;
  }
}
`);

      const setterNode = ast.statements[0].members[0];

      expect(
        context.getScope(setterNode).bindings.get("x")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should identify parameter binding inside getter", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
class C {
  get a() {
    const a = 3;
  }
}
`);

      const getterNode = ast.statements[0].members[0];

      expect(
        context.getScope(getterNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.CONST);
    });

    it("should identify parameter binding inside function parameter type binding", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
function f(a: (x: any) => any) {
}
`);

      const functionTypeNode = ast.statements[0].parameters[0].type;

      expect(
        context.getScope(functionTypeNode).bindings.get("x")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });

    it("should not throw error when processing this.x = expression", async () => {
      const { ast, mainScope, context } = await parseAndAugment(`
this.x = function f(a) {};
`);

      const functionNode = ast.statements[0].expression.right;

      expect(
        context.getScope(functionNode).bindings.get("a")?.kind
      ).toStrictEqual(BindingKind.PARAMETER);
    });
  });

  it("should assign top-level let, const, var declaration identifiers to the program scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
let a = 1;
const b = 2;
var c = 3;
`);

    const letIdentifier =
      ast.statements[0].declarationList.declarations[0].name;
    const constIdentifier =
      ast.statements[1].declarationList.declarations[0].name;
    const varIdentifier =
      ast.statements[2].declarationList.declarations[0].name;

    assert.strictEqual(mainScope.node, ast);
    assert.strictEqual(mainScope.parent?.isGlobalScope(), true);

    assert.strictEqual(mainScope.bindings.size, 3);
    expect(mainScope.bindings.get("a")?.declaringNodes).toEqual([
      letIdentifier,
    ]);
    expect(mainScope.bindings.get("b")?.declaringNodes).toEqual([
      constIdentifier,
    ]);
    expect(mainScope.bindings.get("c")?.declaringNodes).toEqual([
      varIdentifier,
    ]);
  });

  it("should assign top-level function declaration identifiers to the program scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
function a() {}
`);

    const functionA = ast.statements[0];

    assert.strictEqual(mainScope.node, ast);
    assert.strictEqual(mainScope.parent?.isGlobalScope(), true);
    assert.strictEqual(mainScope.bindings.size, 1);
    expect(mainScope.bindings.get("a")?.declaringNodes).toEqual([
      functionA.name,
    ]);

    const functionAScope = context.getScope(functionA);
    assert.strictEqual(functionAScope.node, functionA);
    assert.strictEqual(functionAScope.parent, mainScope);
    assert.strictEqual(functionAScope.bindings.size, 0);
  });

  it("should ignore non-declaring references", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
let a = 1;
a = 4;
`);

    const letIdentifier =
      ast.statements[0].declarationList.declarations[0].name;

    assert.strictEqual(mainScope.node, ast);
    assert.strictEqual(mainScope.parent?.isGlobalScope(), true);
    assert.strictEqual(mainScope.bindings.size, 1);
    expect(mainScope.bindings.get("a")?.declaringNodes).toEqual([
      letIdentifier,
    ]);
  });

  it("should assign var declarations inside function declarations to the function scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
function f() {
  var a = "value";
}
`);

    const functionA = ast.statements[0];
    const varIdentifier =
      functionA.body.statements[0].declarationList.declarations[0].name;

    const functionAScope = context.getScope(functionA);
    assert.strictEqual(functionAScope.node, functionA);
    assert.strictEqual(functionAScope.parent, mainScope);
    assert.strictEqual(functionAScope.bindings.size, 1);
    expect(functionAScope.bindings.get("a")?.declaringNodes).toEqual([
      varIdentifier,
    ]);
  });

  it("should assign var declarations inside nested block of function declarations to the function scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
function f() {
  {
    var a = "value";
  }
}
`);

    const functionA = ast.statements[0];
    const varIdentifier =
      functionA.body.statements[0].statements[0].declarationList.declarations[0]
        .name;

    const functionAScope = context.getScope(functionA);
    assert.strictEqual(functionAScope.node, functionA);
    assert.strictEqual(functionAScope.parent, mainScope);
    assert.strictEqual(functionAScope.bindings.size, 1);
    expect(functionAScope.bindings.get("a")?.declaringNodes).toEqual([
      varIdentifier,
    ]);
  });

  it("should assign let declarations inside block statements to the block statement scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
{
  let a = "value";
}
`);

    const blockStatement = ast.statements[0];
    const letIdentifier =
      blockStatement.statements[0].declarationList.declarations[0].name;

    assert.strictEqual(mainScope.bindings.size, 0);

    const scope = context.getScope(blockStatement);
    assert.strictEqual(scope.bindings.size, 1);
    expect(scope.bindings.get("a")?.declaringNodes).toEqual([letIdentifier]);
  });

  it("should assign var declarations inside top-level block statements to the program scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
{
  var a = "value";
}
`);

    const blockStatement = ast.statements[0];
    const varIdentifier =
      blockStatement.statements[0].declarationList.declarations[0].name;

    assert.strictEqual(mainScope.bindings.size, 1);
    expect(mainScope.bindings.get("a")?.declaringNodes).toEqual([
      varIdentifier,
    ]);
    assert.strictEqual(context.getScope(blockStatement).bindings.size, 0);
  });

  it("should assign var declarations inside nested function declarations to the nested function scope", async () => {
    const { ast, context } = await parseAndAugment(`
function fa() {
  function fb() {
    var a = "value";
  }
}
`);

    const functionA = ast.statements[0];
    const functionB = functionA.body.statements[0];
    const varIdentifier =
      functionB.body.statements[0].declarationList.declarations[0].name;

    const functionBScope = context.getScope(functionB);
    assert.strictEqual(functionBScope.node, functionB);
    assert.strictEqual(functionBScope.parent, context.getScope(functionA.body));
    assert.strictEqual(functionBScope.bindings.size, 1);
    expect(functionBScope.bindings.get("a")?.declaringNodes).toEqual([
      varIdentifier,
    ]);
  });

  it("should assign var declarations with the same name to the correct functions", async () => {
    const { ast, context } = await parseAndAugment(`
function f1() {
  var elements = [];
}
function f2() {
  var elements = [];
}`);

    const function1 = ast.statements[0];
    const function2 = ast.statements[1];

    const function1Scope = context.getScope(function1);
    const function2Scope = context.getScope(function2);

    const elements1 =
      function1.body.statements[0].declarationList.declarations[0].name;
    const elements2 =
      function2.body.statements[0].declarationList.declarations[0].name;

    assert.notStrictEqual(function1Scope, function2Scope);
    assert.strictEqual(context.getScope(elements1), function1Scope);
    assert.strictEqual(context.getScope(elements2), function2Scope);
  });

  it("should assign function declarations inside blocks to the outer function scope", async () => {
    const { ast, context } = await parseAndAugment(`
function a() {
  {
    function b() {}
  }
}
`);

    const functionA = ast.statements[0];
    const block = functionA.body.statements[0];
    const functionB = block.statements[0];

    const functionAScope = context.getScope(functionA);

    assert.strictEqual(functionAScope.bindings.size, 1);
    expect(functionAScope.bindings.get("b")?.declaringNodes).toEqual([
      functionB.name,
    ]);
    assert.strictEqual(context.getScope(block).bindings.size, 0);
  });

  it("should have outer block statement scope as parent scope for function declarations", async () => {
    const { ast, context } = await parseAndAugment(`
  {
    function b() {}
  }
`);

    const block = ast.statements[0];
    const functionB = block.statements[0];

    assert.strictEqual(
      context.getScope(functionB).parent,
      context.getScope(block)
    );
  });

  it("should declare function declaration parameters in the function scope", async () => {
    const { ast, context } = await parseAndAugment(`
function fa(a, b) {}
`);

    const functionA = ast.statements[0];
    const block = functionA.body;
    const paramA = functionA.parameters[0].name;
    const paramB = functionA.parameters[1].name;

    const functionAScope = context.getScope(functionA);

    assert.strictEqual(functionAScope.bindings.size, 2);
    expect(context.getScope(block)).toEqual(functionAScope);
    expect(functionAScope.bindings.get("a")?.declaringNodes).toEqual([paramA]);
    expect(functionAScope.bindings.get("b")?.declaringNodes).toEqual([paramB]);
  });

  it("should declare arrow function parameters in the function scope", async () => {
    const { ast, context } = await parseAndAugment(`
const f = (a, b) => {};
`);

    const functionA =
      ast.statements[0].declarationList.declarations[0].initializer;
    const block = functionA.body;
    const paramA = functionA.parameters[0].name;
    const paramB = functionA.parameters[1].name;

    const functionAScope = context.getScope(functionA);

    assert.strictEqual(functionAScope.bindings.size, 2);
    expect(context.getScope(block)).toEqual(functionAScope);
    expect(functionAScope.bindings.get("a")?.declaringNodes).toEqual([paramA]);
    expect(functionAScope.bindings.get("b")?.declaringNodes).toEqual([paramB]);
  });

  it("should declare arrow function variable inside block on arrow function", async () => {
    const { ast, context } = await parseAndAugment(`
const f = (p) => { const a; var b; };
`);

    const functionA =
      ast.statements[0].declarationList.declarations[0].initializer;
    const paramA = functionA.parameters[0].name;
    const block = functionA.body;
    const variableA = block.statements[0].declarationList.declarations[0].name;
    const variableB = block.statements[1].declarationList.declarations[0].name;

    const functionAScope = context.getScope(functionA);

    // binding is on function level (scope), not block level
    expect(functionAScope.bindings.size).toEqual(3);
    expect(context.getScope(block)).toEqual(functionAScope);
    expect(functionAScope.bindings.get("p")?.declaringNodes).toEqual([paramA]);
    expect(functionAScope.bindings.get("a")?.declaringNodes).toEqual([
      variableA,
    ]);
    expect(functionAScope.bindings.get("b")?.declaringNodes).toEqual([
      variableB,
    ]);
  });

  it("should assign shadowing variables to correct scopes", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
let a = 3;
{
  let a = 4;
}
`);

    const let1 = ast.statements[0].declarationList.declarations[0].name;
    const blockStatement = ast.statements[1];
    const let2 =
      blockStatement.statements[0].declarationList.declarations[0].name;
    const blockStatementScope = context.getScope(blockStatement);

    assert.strictEqual(mainScope.bindings.size, 1);
    expect(mainScope.bindings.get("a")?.declaringNodes).toEqual([let1]);
    assert.strictEqual(blockStatementScope.bindings.size, 1);
    expect(blockStatementScope.bindings.get("a")?.declaringNodes).toEqual([
      let2,
    ]);
  });

  it("should assign var in for loop to outer function scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(`
for (var i = 0; i < 12; i++) {}
`);

    const forLoop = ast.statements[0];
    const var1 = forLoop.initializer.declarations[0].name;

    assert.strictEqual(mainScope.bindings.size, 1);
    expect(mainScope.bindings.get("i")?.declaringNodes).toEqual([var1]);
    assert.strictEqual(context.getScope(forLoop).bindings.size, 0);
  });

  it("should assign let in for loop to loop scope", async () => {
    const { ast, mainScope, context } = await parseAndAugment(
      `for (let i = 0; i < 12; i++) {}`
    );

    const forLoop = ast.statements[0];
    const let1 = forLoop.initializer.declarations[0].name;
    const forLoopScope = context.getScope(forLoop);

    assert.strictEqual(mainScope.bindings.size, 0);
    assert.strictEqual(forLoopScope.bindings.size, 1);
    expect(forLoopScope.bindings.get("i")?.declaringNodes).toEqual([let1]);
  });

  it("should assign const in for..of loop to loop scope ", async () => {
    const { ast, mainScope, context } = await parseAndAugment(
      `for (const a of [1]) {}`
    );

    const forOfLoop = ast.statements[0];
    const const1 = forOfLoop.initializer.declarations[0].name;

    assert.strictEqual(mainScope.bindings.size, 0);

    const scope = context.getScope(forOfLoop);
    assert.strictEqual(scope.bindings.size, 1);
    expect(scope.bindings.get("a")?.declaringNodes).toEqual([const1]);
  });

  it("should assign const in for..in loop to loop scope ", async () => {
    const { ast, mainScope, context } = await parseAndAugment(
      `for (const a in [1]) {}`
    );

    const forInLoop = ast.statements[0];
    const const1 = forInLoop.initializer.declarations[0].name;

    assert.strictEqual(mainScope.bindings.size, 0);

    const scope = context.getScope(forInLoop);
    assert.strictEqual(scope.bindings.size, 1);
    assertBindingDeclarations(scope.bindings.get("a"), const1);
  });

  it("should assign class definition to surrounding block scope", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
{
  class C {}
}
`);

    const block = ast.statements[0];
    const classIdentifier = block.statements[0].name;

    assert.strictEqual(mainScope.bindings.size, 0);

    const scope = context.getScope(block);
    assert.strictEqual(scope.bindings.size, 1);
    assertBindingDeclarations(scope.bindings.get("C"), classIdentifier);
  });

  it("should assign var declaration to surrounding class method", async () => {
    const { ast, context } = await parseAndAugment(`
class C {
    m() {
        var a = 3;
    }
}
`);

    const classMethod = ast.statements[0].members[0];
    const var1 =
      classMethod.body.statements[0].declarationList.declarations[0].name;

    const scope = context.getScope(classMethod);
    assert.strictEqual(scope.bindings.size, 1);
    assertBindingDeclarations(scope.bindings.get("a"), var1);
  });

  it("should assign parameter declaration to surrounding class method", async () => {
    const { ast, context } = await parseAndAugment(`
class C {
    m(a) {
    }
}
`);

    const classMethod = ast.statements[0].members[0];
    const param = classMethod.parameters[0].name;

    const scope = context.getScope(classMethod);
    assert.strictEqual(scope.bindings.size, 1);
    assertBindingDeclarations(scope.bindings.get("a"), param);
  });

  it("should assign the short name inside object destructuring", async () => {
    const { ast, mainScope } = await parseAndAugment(`const { a } = anObject;`);

    const variableIdentifier =
      ast.statements[0].declarationList.declarations[0].name.elements[0].name;

    assert.strictEqual(mainScope.bindings.size, 1);
    assertBindingDeclarations(mainScope.bindings.get("a"), variableIdentifier);
    expect(mainScope.getBinding("a")?.kind).toEqual(BindingKind.CONST);
  });

  it("should assign the full name inside object destructuring", async () => {
    const { ast, mainScope } = await parseAndAugment(
      `let { a: b } = anObject;`
    );

    const variableIdentifier =
      ast.statements[0].declarationList.declarations[0].name.elements[0].name;

    assert.strictEqual(mainScope.bindings.size, 1);
    assertBindingDeclarations(mainScope.bindings.get("b"), variableIdentifier);
    expect(mainScope.getBinding("b")?.kind).toEqual(BindingKind.LET);
  });

  describe("catch parameter", () => {
    it("should assign the catch clause error to the catch clause", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `try { } catch (error) {}`
      );

      const { catchClause } = ast.statements[0];
      const catchClauseScope = context.getScope(catchClause);
      const variableIdentifier = catchClause.variableDeclaration.name;
      const errorBinding = catchClauseScope.bindings.get("error");

      assert.strictEqual(mainScope.bindings.size, 0);
      assert.strictEqual(catchClauseScope.bindings.size, 1);
      assertBindingDeclarations(errorBinding, variableIdentifier);
      expect(errorBinding?.kind).toEqual(BindingKind.CATCH_PARAMETER);
    });

    it("should assign the catch clause error to the catch clause when destructuring", async () => {
      const { ast, mainScope, context } = await parseAndAugment(
        `try { } catch ({ message }) {}`
      );

      const { catchClause } = ast.statements[0];
      const catchClauseScope = context.getScope(catchClause);
      const variableIdentifier =
        catchClause.variableDeclaration.name.elements[0].name;
      const binding = catchClauseScope.bindings.get("message");

      assert.strictEqual(mainScope.bindings.size, 0);
      assert.strictEqual(catchClauseScope.bindings.size, 1);
      assertBindingDeclarations(binding, variableIdentifier);
      expect(binding?.kind).toEqual(BindingKind.CATCH_PARAMETER);
    });

    // TODO regular
    // TODO destructuring
  });

  // TODO array destructuring assignments
  // TODO class expressions
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/class
});
