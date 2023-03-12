import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { findIdentifierPatternContainer } from "./findIdentifierPatternContainer";
import { getId } from "./getId";

const parseAst = createParseAndAugmentFunction();

async function assertPatternContainerIs({
  source,
  getIdentifier,
  getContainer = (ast) =>
    ast.statements[0].declarationList.declarations[0].name,
}: {
  source: string;
  getIdentifier: (container: any) => any;
  getContainer?: (program: any) => any;
}) {
  const { sourceFile } = await parseAst(source);

  const container = getContainer(sourceFile);
  const identifier = getIdentifier(container);

  expect(getId(findIdentifierPatternContainer(identifier))).toBe(
    getId(container)
  );
}

describe("findIdentifierPatternContainer", () => {
  it("should return an identifier itself if it is not part of a pattern", async () => {
    await assertPatternContainerIs({
      source: `const a = "value";`,
      getIdentifier: (container) => container,
    });
  });

  it("should return an object binding pattern for a nested identifier in an object binding pattern", async () => {
    await assertPatternContainerIs({
      source: `let { destructuringB } = whatever();`,
      getIdentifier: (container) => container.elements[0].name,
    });
  });

  it("should return an array binding pattern for a nested identifier in an array binding pattern", async () => {
    await assertPatternContainerIs({
      source: `let [a, ...rest] = [10, 20, 30];`,
      getIdentifier: (container) => container.elements[0].name,
    });
  });

  it("should return an array binding pattern for a rest element in an array pattern", async () => {
    await assertPatternContainerIs({
      source: `let [a, ...rest] = [10, 20, 30];`,
      getIdentifier: (container) => container.elements[1].name,
    });
  });

  it("should return an object literal expression for a nested shorthand identifier in an object literal expression ", async () => {
    await assertPatternContainerIs({
      source: `({ destructuringB } = whatever());`,
      getContainer: (ast) => ast.statements[0].expression.expression.left,
      getIdentifier: (container) => container.properties[0].name,
    });
  });

  it("should return an array literal expression for a nested identifier in an array literal expression ", async () => {
    await assertPatternContainerIs({
      source: `([ destructuringB ] = whatever());`,
      getContainer: (ast) => ast.statements[0].expression.expression.left,
      getIdentifier: (container) => container.elements[0],
    });
  });

  it("should return an array literal expression for a rest element in an array literal expression ", async () => {
    await assertPatternContainerIs({
      source: `([ destructuringB, ...rest ] = whatever());`,
      getContainer: (ast) => ast.statements[0].expression.expression.left,
      getIdentifier: (container) => container.elements[1].expression,
    });
  });
});
