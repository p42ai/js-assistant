import _ from "lodash";
import { createParseAndAugmentFunction } from "../createParseAndAugmentFunction";
import { BindingReferenceAugmentation } from "./reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "./ScopeAugmentation";

const parseAndAugment = createParseAndAugmentFunction([
  ScopeAugmentation,
  BindingReferenceAugmentation,
]);

describe("Scope", () => {
  describe("isBindingAvailable()", () => {
    it("should return true when identifier is declared in the current scope", async () => {
      const { sourceFile, context } = await parseAndAugment(`function f(a) {}`);
      const fScope = context.getScope(sourceFile.statements[0]);

      expect(fScope.hasBinding("a")).toEqual(true);
    });

    it("should return true when identifier is declared in a parent scope", async () => {
      const { sourceFile, context } = await parseAndAugment(`
  let a = 1;
  function f() {}
  `);

      const fScope = context.getScope(sourceFile.statements[1]);

      expect(fScope.hasBinding("a")).toEqual(true);
    });

    describe("with hoisting", () => {
      it("should have hoisted var binding available on function scope", async () => {
        const { sourceFile, context } = await parseAndAugment(`
function f() {
  {
    var a = "1";
  }
}
`);
        const functionDeclaration = sourceFile.statements[0];
        const functionScope = context.getScope(functionDeclaration);

        expect(functionScope.hasBinding("a")).toStrictEqual(true);
      });

      it("should have hoisted function binding available on function scope", async () => {
        const { sourceFile, context } = await parseAndAugment(`
function f() {
  {
    function g() {      
    }
  }
}
`);
        const functionDeclaration = sourceFile.statements[0];
        const functionScope = context.getScope(functionDeclaration);

        expect(functionScope.hasBinding("g")).toStrictEqual(true);
      });
    });

    describe("with reference node (temporal dead zone support)", () => {
      it("should not have binding to subsequent parameter available", async () => {
        const { sourceFile, context } = await parseAndAugment(`
  function f(a, b) {}
  `);

        const f = sourceFile.statements[0];
        const fScope = context.getScope(f);

        expect(fScope.hasBinding("b", f.parameters[0].name)).toEqual(false);
        expect(fScope.hasBinding("a", f.parameters[1].name)).toEqual(true);
      });
    });
  });
});
