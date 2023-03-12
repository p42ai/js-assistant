import ts from "typescript";
import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { BindingReferenceAugmentation } from "../augmentation/scope/reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "../augmentation/scope/ScopeAugmentation";
import {
  isNodeStructureEqual,
  IsNodeStructureEqualOptions,
} from "./isNodeStructureEqual.generated";

const parseAst = createParseAndAugmentFunction([
  ScopeAugmentation,
  BindingReferenceAugmentation,
]);

function testNodeStructureEqual(
  label: string,
  code: string,
  expectedResult: boolean,
  options?: IsNodeStructureEqualOptions | undefined,
  resolveNodeA: (sourceFile: any) => ts.Node = (sourceFile) =>
    sourceFile.statements[0].expression,
  resolveNodeB: (sourceFile: any) => ts.Node = (sourceFile) =>
    sourceFile.statements[1].expression
) {
  it(`${label} should ${
    expectedResult ? "" : "not "
  }be structurally equal`, async () => {
    const { sourceFile, context } = await parseAst(code);

    expect(
      isNodeStructureEqual(
        resolveNodeA(sourceFile),
        resolveNodeB(sourceFile),
        context,
        options
      )
    ).toStrictEqual(expectedResult);
  });
}

describe("isNodeStructureEquals", () => {
  describe("ignoreChaining", () => {
    describe("property access", () => {
      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is true",
        `a?.b; a.b;`,
        true,
        { ignoreOptionalChaining: true, ignoreBindings: false }
      );

      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is false",
        `a?.b; a.b;`,
        false,
        { ignoreOptionalChaining: false, ignoreBindings: false }
      );
    });

    describe("element access", () => {
      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is true",
        `a?.[0]; a[0];`,
        true,
        { ignoreOptionalChaining: true, ignoreBindings: false }
      );

      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is false",
        `a?.[0]; a[0];`,
        false,
        { ignoreOptionalChaining: false, ignoreBindings: false }
      );
    });

    describe("call expression", () => {
      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is true",
        `a?.(); a();`,
        true,
        { ignoreOptionalChaining: true, ignoreBindings: false }
      );

      testNodeStructureEqual(
        "optional and regular chaining when ignoreChaining is false",
        `a?.(); a();`,
        false,
        { ignoreOptionalChaining: false, ignoreBindings: false }
      );
    });
  });

  describe("local bindings", () => {
    testNodeStructureEqual(
      "binding differences are ignored for local bindings",
      `
doSomething(function(localVariable) { 
  log(localVariable);
});
doSomething(function(localVariable) { 
  log(localVariable);
});
`,
      true,
      {
        ignoreBindings: false,
        ignoreOptionalChaining: false,
      },
      (sourceFile) => sourceFile.statements[0],
      (sourceFile) => sourceFile.statements[1]
    );
  });

  describe("this reference", () => {
    testNodeStructureEqual(
      "this reference from same this scope should be matched",
      `
function aFunction() {
  this.aProperty;
  this.aProperty;
}`,
      true,
      undefined,
      (sourceFile) => sourceFile.statements[0].body.statements[0],
      (sourceFile) => sourceFile.statements[0].body.statements[1]
    );

    testNodeStructureEqual(
      "this reference different this scopes should not be matched",
      `
function aFunction() {
  this.aProperty;

  function innerFunction() {
    f2(this.aProperty); // potentially different this
  }
}`,
      false,
      undefined,
      (sourceFile) => sourceFile.statements[0].body.statements[0].expression,
      (sourceFile) =>
        sourceFile.statements[0].body.statements[1].body.statements[0]
          .expression.arguments[0]
    );
  });

  describe("complex", () => {
    testNodeStructureEqual(
      "a + b < 123 * c",
      `a + b < 123 * c; a + b < 123 * c;`,
      true
    );
  });

  describe("undefined", () => {
    testNodeStructureEqual(
      "undefined and undefined",
      `undefined; undefined;`,
      true
    );
    testNodeStructureEqual("undefined and identifier", `undefined; a;`, false);
    testNodeStructureEqual("Identifier and undefined", `a; undefined;`, false);
  });

  describe("Identifier", () => {
    testNodeStructureEqual("same text and binding (global)", `a; a;`, true);
    testNodeStructureEqual("different text", `a; b;`, false);

    testNodeStructureEqual(
      "bindings do not match (shadowing)",
      `
a.length;
{
  const a = "123";
  a.length;
}`,
      false,
      undefined,
      undefined,
      (sourceFile) => sourceFile.statements[1].statements[1].expression
    );

    testNodeStructureEqual(
      "bindings do not match but are ignored",
      `
a.length;
{
  const a = "123";
  a.length;
}`,
      true,
      { ignoreBindings: true, ignoreOptionalChaining: false },
      undefined,
      (sourceFile) => sourceFile.statements[1].statements[1].expression
    );
  });

  describe("Operator Token", () => {
    testNodeStructureEqual("&& and &&", `a && a; a && a;`, true);
    testNodeStructureEqual("|| and &&", `a || a; a && a;`, false);
  });

  describe("Primitives", () => {
    testNodeStructureEqual("same boolean", `true; true;`, true);
    testNodeStructureEqual("same different", `true; false;`, false);
    testNodeStructureEqual("boolean and number", `true; 123;`, false);
  });

  describe("Different Kinds", () => {
    testNodeStructureEqual("boolean and Identifier", `true; a;`, false);
  });
});
