import ts from "typescript";
import { getId } from "../ast/getId";
import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { getRemovalNode } from "./getRemovalNode";

const parse = createParseAndAugmentFunction();

function testNodeRemoval(
  node: ts.Node,
  expectedReplacedNode: ts.Node,
  expectedReplacement: null | "omittedExpression"
) {
  const { replacedNode, replacement } = getRemovalNode(node);

  expect(getId(replacedNode)).toEqual(getId(expectedReplacedNode));
  if (expectedReplacement == null) {
    expect(replacement).toBeNull();
  } else {
    expect(replacement).toEqual(expectedReplacement);
  }
}

describe("getRemovalNode", () => {
  it("should remove variable statement when only variable is removed", async () => {
    const { sourceFile } = await parse("const a = 123;");

    testNodeRemoval(
      sourceFile.statements[0].declarationList.declarations[0].name,
      sourceFile.statements[0],
      null
    );
  });

  it("should insert an omitted expression when removing an non-trailing array destructuring node", async () => {
    const { sourceFile } = await parse("const [ a, b, c] = anArray;");

    testNodeRemoval(
      sourceFile.statements[0].declarationList.declarations[0].name.elements[1],
      sourceFile.statements[0].declarationList.declarations[0].name.elements[1],
      "omittedExpression"
    );
  });

  it("should remove empty array destructuring parent", async () => {
    const { sourceFile } = await parse("const [ a ] = anArray;");

    testNodeRemoval(
      sourceFile.statements[0].declarationList.declarations[0].name.elements[0],
      sourceFile.statements[0],
      null
    );
  });

  it("should remove empty object destructuring parent", async () => {
    const { sourceFile } = await parse("const { a } = anObject;");

    testNodeRemoval(
      sourceFile.statements[0].declarationList.declarations[0].name.elements[0],
      sourceFile.statements[0],
      null
    );
  });

  it("should remove empty object destructuring parent recursively", async () => {
    const { sourceFile } = await parse(
      "const { aProperty: { innerProperty } } = anObject;"
    );

    testNodeRemoval(
      sourceFile.statements[0].declarationList.declarations[0].name.elements[0]
        .name.elements[0],
      sourceFile.statements[0],
      null
    );
  });
});
