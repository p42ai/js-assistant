import { generateElementVariableName } from "./generateElementVariableName";

function testGenerateElementVariableName(
  collectionName: string,
  expectedProposals: string[]
) {
  it(`"${collectionName}" => ${JSON.stringify(
    expectedProposals
  )}`, async () => {
    const generator = generateElementVariableName(collectionName);
    const proposedNames = expectedProposals.map(() => generator.next().value);

    expect(proposedNames).toStrictEqual(expectedProposals);
  });
}

describe("generateElementVariableName", () => {
  testGenerateElementVariableName("elements", [
    "element",
    "element2",
    "element3",
  ]);
  testGenerateElementVariableName("s", ["element", "element2", "element3"]);
  testGenerateElementVariableName("items", [
    "item",
    "itemElement",
    "item2",
    "item3",
  ]);
  testGenerateElementVariableName("testArray", [
    "testElement",
    "testElement2",
    "testElement3",
  ]);
  testGenerateElementVariableName("testList", [
    "testItem",
    "testItem2",
    "testItem3",
  ]);
  testGenerateElementVariableName("testSet", [
    "testItem",
    "testItem2",
    "testItem3",
  ]);
  testGenerateElementVariableName("testCollection", [
    "testItem",
    "testItem2",
    "testItem3",
  ]);
  testGenerateElementVariableName("children", [
    "child",
    "childElement",
    "child2",
  ]);
  testGenerateElementVariableName("testChildren", [
    "testChild",
    "testChild2",
    "testChild3",
  ]);
  testGenerateElementVariableName("testNodes", [
    "testNode",
    "testNodeElement",
    "testNode2",
  ]);
  testGenerateElementVariableName("entries", [
    "entry",
    "entryElement",
    "entry2",
  ]);
});
