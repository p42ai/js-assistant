import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import * as NodeRange from "./NodeRange";

const parseAndAugment = createParseAndAugmentFunction();
const parse = async (source: string) =>
  (await parseAndAugment(source)).sourceFile;

describe("NodeRange", () => {
  describe("variableDeclarationList", () => {
    it("should provide correct highlight range for const variable declaration", async () => {
      const ast = await parse("const a = 123; var b = 123;");

      expect(NodeRange.variableDeclarationList(ast.statements[0])).toEqual({
        start: 0,
        end: 5,
      });
      expect(NodeRange.variableDeclarationList(ast.statements[1])).toEqual({
        start: 15,
        end: 18,
      });
    });
  });

  describe("functionLabel", () => {
    it("should highlight function label", async () => {
      const ast = await parse("function f() { }");

      expect(NodeRange.functionLabel(ast.statements[0])).toEqual({
        start: 0,
        end: 8,
      });
    });

    it("should highlight function label when there is an async modifier", async () => {
      const ast = await parse(
        "async function f() { return Promise.resolve(); }"
      );

      expect(NodeRange.functionLabel(ast.statements[0])).toEqual({
        start: 6,
        end: 14,
      });
    });
  });
});
