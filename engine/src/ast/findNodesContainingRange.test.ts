import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { findNodesContainingRange } from "./findNodesContainingRange";
import { getId } from "./getId";

const parseAst = createParseAndAugmentFunction();

describe("findNodesContainingRange", () => {
  it("should return JSX element after JSX text", async () => {
    const { sourceFile } = await parseAst(
      `const a = <div>text<div>inner</div></div>;`
    );

    const actual = findNodesContainingRange(19, 35, sourceFile);

    expect(actual.map(getId)).toEqual([
      "0-42-SourceFile",
      "0-42-VariableStatement",
      "0-41-VariableDeclarationList",
      "5-41-VariableDeclaration",
      "9-41-JsxElement",
      "19-35-JsxElement",
    ]);
  });
});
