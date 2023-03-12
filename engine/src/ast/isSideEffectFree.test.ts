import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { BindingReferenceAugmentation } from "../augmentation/scope/reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "../augmentation/scope/ScopeAugmentation";
import { TrueParentAugmentation } from "../augmentation/true-parent/TrueParentAugmentation";
import { isSideEffectFree } from "./isSideEffectFree";

const parseAst = createParseAndAugmentFunction([
  TrueParentAugmentation,
  ScopeAugmentation,
  BindingReferenceAugmentation,
]);

async function assertIsSideEffectFree({
  source,
  statementIndex = 0,
  getNode = (sourceFile: any) =>
    sourceFile.statements[statementIndex].expression,
  expectedIsSideEffectFree,
}: {
  source: string;
  statementIndex?: number | undefined;
  getNode?: (container: any) => any;
  expectedIsSideEffectFree: boolean;
}) {
  const { sourceFile, context } = await parseAst(source);
  expect(isSideEffectFree(getNode(sourceFile), context)).toBe(
    expectedIsSideEffectFree
  );
}

describe("isSideEffectFree", () => {
  describe("no side effects", () => {
    it("-1", async () => {
      await assertIsSideEffectFree({
        source: "-1;",
        expectedIsSideEffectFree: true,
      });
    });

    it("boolean literal", async () => {
      await assertIsSideEffectFree({
        source: "true;",
        expectedIsSideEffectFree: true,
      });
    });

    it("null literal", async () => {
      await assertIsSideEffectFree({
        source: "null;",
        expectedIsSideEffectFree: true,
      });
    });

    it("logical operators", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3; !(a && b) || c;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("conditional operator", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3; a ? b : c;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("binary ??", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2; a ?? b;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("basic math operators", async () => {
      await assertIsSideEffectFree({
        source:
          "const a = 1, b = 2, c = 3, d = 4, e = 5, f = 6; (((a + b - 2) / d) % e) ** f;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("bitwise operators", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3, d = 4; ~(((a | b) & c) ^ d);",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("bitwise shift", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3, d = 4; ((a << b) >> c) >>> d;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("comparison operators 1", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3, d = 4; (a < b) == (c <= d);",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("comparison operators 2", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3, d = 4; (a > b) != (c >= d);",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("comparison operators 3", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3; (a !== b) === c;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("complex expression 1", async () => {
      await assertIsSideEffectFree({
        source: "const a = 1, b = 2, c = 3; a + b < 123 * c;",
        statementIndex: 1,
        expectedIsSideEffectFree: true,
      });
    });

    it("global undefined", async () => {
      await assertIsSideEffectFree({
        source: "undefined;",
        expectedIsSideEffectFree: true,
      });
    });

    it("global NaN", async () => {
      await assertIsSideEffectFree({
        source: "NaN;",
        expectedIsSideEffectFree: true,
      });
    });

    it("global Infinity", async () => {
      await assertIsSideEffectFree({
        source: "Infinity;",
        expectedIsSideEffectFree: true,
      });
    });

    it("global globalThis", async () => {
      await assertIsSideEffectFree({
        source: "globalThis;",
        expectedIsSideEffectFree: true,
      });
    });
  });

  describe("can have side effects", () => {
    /**
     * Global variables can have side effects if they are implemented as
     * getters on globalThis.
     */
    it("global variable", async () => {
      await assertIsSideEffectFree({
        source: "myGlobalVariable;",
        expectedIsSideEffectFree: false,
      });
    });

    /**
     * Inside a 'with' statement, variables can be resolved to getters with side-effects.
     */
    it("inside with", async () => {
      await assertIsSideEffectFree({
        source: `
const potentialGetter = 3;
with (o) {
  potentialGetter; // could be property of o
}
`,
        getNode: (sourceFile) =>
          // potentialGetter:
          sourceFile.statements[1].statement.statements[0].expression,
        expectedIsSideEffectFree: false,
      });
    });

    it("call expression", async () => {
      await assertIsSideEffectFree({
        source: "const f = () => {};  f();",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("getter (dot notation)", async () => {
      await assertIsSideEffectFree({
        source: "const a = {}; a.b;",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("getter (bracket notation)", async () => {
      await assertIsSideEffectFree({
        source: "const a = {}; a['b'];",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("assignment", async () => {
      await assertIsSideEffectFree({
        source: "let a = 'x'; a = '123';",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("binary expression with getter", async () => {
      await assertIsSideEffectFree({
        source: "const x = 1, a = {}; x && a.b;",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("unary expression with call", async () => {
      await assertIsSideEffectFree({
        source: "const f = () => {}; !(f());",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("increment", async () => {
      await assertIsSideEffectFree({
        source: "let i = 0; ++i;",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });

    it("conditional operator with call in condition", async () => {
      await assertIsSideEffectFree({
        source: "const a = () => {}, b = 1, c = 2; a() ? b : c;",
        statementIndex: 1,
        expectedIsSideEffectFree: false,
      });
    });
  });
});
