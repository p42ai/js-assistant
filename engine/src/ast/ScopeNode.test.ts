import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { isScopeNode } from "./ScopeNode";

const parseAndAugment = createParseAndAugmentFunction();
const parse = async (source: string) =>
  (await parseAndAugment(source)).sourceFile;

describe("ScopeNode", () => {
  describe("isScopeNode", () => {
    it("should not mark outer block in function expression as scope node", async () => {
      const ast = await parse("const a = function() { };");
      expect(
        isScopeNode(
          ast.statements[0].declarationList.declarations[0].initializer.body
        )
      ).toEqual(false);
    });
  });
});
