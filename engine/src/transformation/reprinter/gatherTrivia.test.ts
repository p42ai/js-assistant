import _ from "lodash";
import { createParseAndAugmentFunction } from "../../augmentation/createParseAndAugmentFunction";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { inferPrintSettings } from "./format_inference/inferPrintSettings";
import { gatherTrivia } from "./gatherTrivia";
import { ReprintBlueprints } from "./ReprintBlueprints";

const parse = createParseAndAugmentFunction();

async function extractTrivia(
  fullText: string,
  updateTree: (tree: TransformedNodeTree, source: any) => void = _.noop
) {
  const source = (await parse(fullText)).sourceFile;
  const printSettings = inferPrintSettings(source);

  const tree = new TransformedNodeTree(source);
  updateTree(tree, source as any);

  return [
    source,
    gatherTrivia({
      tree,
      printSettings,
      templates: ReprintBlueprints.createReprintTemplates(printSettings),
    }),
    fullText,
  ];
}

describe("gatherTrivia", () => {
  it("should gather trivia in block", async () => {
    const [source, trivia] = await extractTrivia(`{
  f(); // comment
}`);

    const block = source.statements[0];

    expect(trivia.get(block.statements[0])).toEqual({
      indentationLevel: 1,
      prefix: "  ",
      suffix: " // comment",
      originalSuffix: " // comment",
      hasTrailingSeparator: true,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });

    expect(trivia.get(block)).toEqual({
      indentationLevel: 0,
      prefix: "",
      suffix: "",
      originalSuffix: "",
      hasTrailingSeparator: false,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should ignore leading block prefix for outermost block when there is no leading whitespace", async () => {
    const [source, trivia] = await extractTrivia(`// comment
{
}`);

    const block = source.statements[0];

    expect(trivia.get(block)).toEqual({
      indentationLevel: 0,
      prefix: "", // note: first comment (potential copyright header) excluded
      suffix: "",
      originalSuffix: "",
      hasTrailingSeparator: false,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should gather trivia in indented arguments list", async () => {
    const [source, trivia] = await extractTrivia(`f(
  // comment 1
  a,
  // comment 2
  1
);`);

    const args = source.statements[0].expression.arguments;

    expect(trivia.get(args[0])).toEqual({
      hasTrailingSeparator: true,
      indentationLevel: 0,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "\n  // comment 1\n  ",
      suffix: "",
      originalSuffix: "",
    });

    expect(trivia.get(args[1])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 0,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "\n  // comment 2\n  ",
      suffix: "\n",
      originalSuffix: "\n",
    });
  });

  it("should gather leading block prefix for inner block", async () => {
    const [source, trivia] = await extractTrivia(`{
  // comment
  {
  }
}`);

    const block = source.statements[0].statements[0];

    expect(trivia.get(block)).toEqual({
      indentationLevel: 1,
      prefix: "  // comment\n  ",
      suffix: "",
      originalSuffix: "",
      hasTrailingSeparator: true,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should gather leading multi-line comment with comma on parameter object", async () => {
    const [source, trivia] = await extractTrivia(`f(A, {
  /**
   * A,
   * B
   */
  m() {
  }
});`);

    const method = source.statements[0].expression.arguments[1].properties[0];

    expect(trivia.get(method)).toEqual({
      indentationLevel: 1,
      prefix: "\n  /**\n   * A,\n   * B\n   */\n  ",
      suffix: "\n",
      originalSuffix: "\n",
      hasTrailingSeparator: false,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should gather trailing multi-line comment on parameter object", async () => {
    const [source, trivia] = await extractTrivia(`f(A, {
  m1() {
  } // trailing
  /**
   * A
   */,

  m2() {}
});`);

    const method1 = source.statements[0].expression.arguments[1].properties[0];
    const body1 = method1.body;
    const method2 = source.statements[0].expression.arguments[1].properties[1];

    expect(trivia.get(method1)).toEqual({
      indentationLevel: 1,
      prefix: "\n  ",
      suffix: "\n  /**\n   * A\n   */",
      originalSuffix: "\n  /**\n   * A\n   */",
      hasTrailingSeparator: true,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });

    expect(trivia.get(body1)).toEqual({
      indentationLevel: 1,
      prefix: " ",
      suffix: " // trailing",
      originalSuffix: " // trailing",
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });

    expect(trivia.get(method2)).toEqual({
      indentationLevel: 1,
      prefix: "\n\n  ",
      suffix: "\n",
      originalSuffix: "\n",
      hasTrailingSeparator: false,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should gather trivia inside function", async () => {
    const [source, trivia] = await extractTrivia(`f(t => {
  var a = g('a'),
      b = g('b');

  g();
  g();
});

var dummy;`);

    const block = source.statements[0].expression.arguments[0].body;
    const variableDeclarations =
      block.statements[0].declarationList.declarations;

    expect(trivia.get(variableDeclarations[0])).toEqual({
      indentationLevel: 1,
      prefix: " ",
      suffix: "",
      originalSuffix: "",
      hasTrailingSeparator: true,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });

    expect(trivia.get(variableDeclarations[1])).toEqual({
      indentationLevel: 1,
      prefix: "\n      ",
      suffix: "",
      originalSuffix: "",
      hasTrailingSeparator: false,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
    });
  });

  it("should gather trivia in tagged template", () => {
    extractTrivia(`tag\`a\${f({ a: a })}b\`;
const dummy = { b: b };`);

    // extractTrivia does not throw exception
  });

  it("should gather suffix of last statement in case block", async () => {
    const [source, trivia] = await extractTrivia(`switch (x) {
  case "a":
    f1(); // comment 1
    f2(); // comment 2
    break; // comment 3
}`);

    const caseClause = source.statements[0].caseBlock.clauses[0];

    expect(trivia.get(caseClause.statements[2])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 2,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "    ",
      suffix: " // comment 3",
      originalSuffix: " // comment 3",
    });
  });

  it("should gather suffix of array literal parts", async () => {
    const [source, trivia] = await extractTrivia(`let a = [
  { x },
];`);

    const objectLiteral =
      source.statements[0].declarationList.declarations[0].initializer
        .elements[0];

    expect(trivia.get(objectLiteral)).toEqual({
      hasTrailingSeparator: true,
      indentationLevel: 1,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "\n  ",
      suffix: "",
      originalSuffix: "",
    });

    expect(trivia.get(objectLiteral.properties[0])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 2, // TODO should be 1 if extracted
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: " ",
      suffix: " ",
      originalSuffix: " ",
    });
  });

  it("should associate prefix trivia with next statement if in same line", async () => {
    const [source, trivia] = await extractTrivia(`a(); b();`);

    expect(trivia.get(source.statements[0])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 0,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "",
      suffix: "",
      originalSuffix: "",
    });

    expect(trivia.get(source.statements[1])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 0,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: " ",
      suffix: "",
      originalSuffix: "",
    });
  });

  it("should gather suffix of last statement in case block", async () => {
    const [source, trivia] = await extractTrivia(`switch (x) {
  case "a":
    f1(); // comment 1
    f2(); // comment 2
    break; // comment 3
}`);

    const caseClause = source.statements[0].caseBlock.clauses[0];

    expect(trivia.get(caseClause.statements[2])).toEqual({
      hasTrailingSeparator: false,
      indentationLevel: 2,
      isNodeRegionStart: false,
      isNodeRegionEnd: false,
      prefix: "    ",
      suffix: " // comment 3",
      originalSuffix: " // comment 3",
    });
  });

  describe("node regions", () => {
    it("should record node region start and end", async () => {
      const [source, trivia] = await extractTrivia(`a();

b();
c();`);

      expect(trivia.get(source.statements[0])).toEqual({
        hasTrailingSeparator: true,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: true,
        prefix: "",
        suffix: "",
        originalSuffix: "",
      });

      expect(trivia.get(source.statements[1])).toEqual({
        hasTrailingSeparator: true,
        indentationLevel: 0,
        isNodeRegionStart: true,
        isNodeRegionEnd: false,
        prefix: "\n",
        suffix: "",
        originalSuffix: "",
      });

      expect(trivia.get(source.statements[2])).toEqual({
        hasTrailingSeparator: false,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: "",
        suffix: "",
        originalSuffix: "",
      });
    });
  });

  describe("standalone node trivia extraction", () => {
    it("should extract trivia for if and else nodes", async () => {
      const [source, trivia] = await extractTrivia(
        `if (a) /*1a*/ f() /*1b*/ else /*2a*/ g() /*2b*/`
      );

      expect(trivia.get(source.statements[0].thenStatement)).toEqual({
        hasTrailingSeparator: undefined,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: " /*1a*/ ",
        suffix: " /*1b*/ ",
        originalSuffix: " /*1b*/ ",
      });

      expect(trivia.get(source.statements[0].elseStatement)).toEqual({
        hasTrailingSeparator: undefined,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: " /*2a*/ ",
        suffix: " /*2b*/",
        originalSuffix: " /*2b*/",
      });
    });

    it("should not extract trivia prefix that is extract by the parent node", async () => {
      const [source, trivia] = await extractTrivia(`const dummy;

// comment
var a = 'abc';`);

      expect(trivia.get(source.statements[1])).toEqual({
        hasTrailingSeparator: false,
        indentationLevel: 0,
        isNodeRegionStart: true,
        isNodeRegionEnd: false,
        prefix: "\n// comment\n",
        suffix: "",
        originalSuffix: "",
      });

      expect(trivia.get(source.statements[1].declarationList)).toEqual({
        hasTrailingSeparator: undefined,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: "", // already covered by parent
        suffix: "",
        originalSuffix: "",
      });
    });

    it("should not extract trivia suffix that is extract by the child node", async () => {
      const [source, trivia] = await extractTrivia(
        `const x = (a /* 1 */, b) => {};`
      );

      const parameter =
        source.statements[0].declarationList.declarations[0].initializer
          .parameters[0];

      expect(trivia.get(parameter)).toEqual({
        hasTrailingSeparator: true,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: "",
        suffix: "", // already covered by child
        originalSuffix: "",
      });

      expect(trivia.get(parameter.name)).toEqual({
        hasTrailingSeparator: undefined,
        indentationLevel: 0,
        isNodeRegionStart: false,
        isNodeRegionEnd: false,
        prefix: "",
        suffix: " /* 1 */",
        originalSuffix: " /* 1 */",
      });
    });
  });
});
