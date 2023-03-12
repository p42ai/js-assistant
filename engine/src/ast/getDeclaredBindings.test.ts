import ts from "typescript";
import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { BindingReferenceAugmentation } from "../augmentation/scope/reference/BindingReferenceAugmentation";
import { ScopeAugmentation } from "../augmentation/scope/ScopeAugmentation";
import { Context } from "../matcher/engine/Context";
import { getDeclaredBindings } from "./getDeclaredBindings";

const parseAndAugment = createParseAndAugmentFunction([
  ScopeAugmentation,
  BindingReferenceAugmentation,
]);

function expectDeclaredBindingsForBindingNameToEqual(
  node: ts.BindingName,
  context: Context,
  expectedIdentifiers: string[]
) {
  expect(
    getDeclaredBindings
      .forBindingName(node, context)
      .map((binding) => binding.name)
  ).toEqual(expectedIdentifiers);
}

describe("getDeclaredBindings", () => {
  describe("forBindingName", () => {
    it("should return identifier binding", async () => {
      const { sourceFile, context } = await parseAndAugment(`
const anIdentifier = "123";
`);

      expectDeclaredBindingsForBindingNameToEqual(
        sourceFile.statements[0].declarationList.declarations[0],
        context,
        ["anIdentifier"]
      );
    });

    it("should return the declared variable name for an object binding pattern with renaming", async () => {
      const { sourceFile, context } = await parseAndAugment(`
const { aProperty: aVariable } = obj;
`);

      expectDeclaredBindingsForBindingNameToEqual(
        sourceFile.statements[0].declarationList.declarations[0],
        context,
        ["aVariable"]
      );
    });

    it("should return the declared variable names for an object binding pattern without renaming", async () => {
      const { sourceFile, context } = await parseAndAugment(`
const { aProperty1, aProperty2 } = obj;
`);

      expectDeclaredBindingsForBindingNameToEqual(
        sourceFile.statements[0].declarationList.declarations[0],
        context,
        ["aProperty1", "aProperty2"]
      );
    });
  });
});
