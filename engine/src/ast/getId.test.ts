import ts from "typescript";
import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { getId } from "./getId";

const parseAndAugment = createParseAndAugmentFunction();

function expectId(node: ts.Node) {
  return expect(getId(node));
}

it("should augment f(a)", async () => {
  const { sourceFile } = await parseAndAugment("f(a);");

  expectId(sourceFile).toEqual(`0-5-SourceFile`);
  expectId(sourceFile.statements[0]).toEqual(`0-5-ExpressionStatement`);
  expectId(sourceFile.statements[0].expression).toEqual(`0-4-CallExpression`);
  expectId(sourceFile.statements[0].expression.expression).toEqual(
    `0-1-Identifier`
  );
  expectId(sourceFile.statements[0].expression.arguments[0]).toEqual(
    `2-3-Identifier`
  );
});
