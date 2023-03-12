import { parse } from "../parser/parse";
import { calculateTokenComplexity } from "./calculateTokenComplexity";

function testHasGreaterTokenComplexity({
  labelA,
  sourceA,
  labelB,
  sourceB,
}: {
  labelA: string;
  sourceA: string;
  labelB: string;
  sourceB: string;
}) {
  it(`${labelA} has greater token complexity than ${labelB}`, async () => {
    const sourceFileA = (await parse("code.js", undefined, sourceA))[0]
      .sourceFile;
    const complexityA = calculateTokenComplexity(sourceFileA);

    const sourceFileB = (await parse("code.js", undefined, sourceB))[0]
      .sourceFile;
    const complexityB = calculateTokenComplexity(sourceFileB);

    expect(complexityA).toBeGreaterThan(complexityB);
  });
}

describe("calculateTokenComplexity", () => {
  testHasGreaterTokenComplexity({
    labelA: "template literal",
    sourceA: "const a = `123`",
    labelB: "string",
    sourceB: "const a = '123'",
  });

  testHasGreaterTokenComplexity({
    labelA: "switch",
    sourceA: `switch (a) { case "": return 1; }`,
    labelB: "if",
    sourceB: `if (a === "") { return 1; }`,
  });
});
