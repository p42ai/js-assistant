import { NodeIndex } from "../../matcher/engine/NodeIndex";
import { parse } from "../parse";

async function executeGetSourceModuleKind(
  fileName: string,
  sourceCode: string
) {
  const parseResult = (await parse(fileName, undefined, sourceCode))[0];
  return parseResult.getSourceModuleKind(new NodeIndex(parseResult.sourceFile));
}

describe("FileTypes.getEmbeddedScripts", () => {
  it("should set module kind to typescript for typescript source", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.ts",
      `let a: string = "123";`
    );

    expect(sourceModuleKind.id).toEqual("TYPESCRIPT");
  });

  it("should set module kind to common js for .cjs files", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.cjs",
      `let a = "123";`
    );

    expect(sourceModuleKind.id).toEqual("COMMON_JS");
  });

  it("should set module kind to common js when there is a top-level require", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `const test = require("a");`
    );

    expect(sourceModuleKind.id).toEqual("COMMON_JS");
  });

  it("should set module kind to common js when there is a top-level module.exports", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `module.exports = "abc";`
    );

    expect(sourceModuleKind.id).toEqual("COMMON_JS");
  });

  it("should set module kind to ecmascript for .mjs files", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.mjs",
      `let a = "123";`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is an import keyword", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `import { a } from "./a";`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is a default export", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `export default "123;`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is a function export", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `export function f() {};`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is a variable export", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `export const a = "123";`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is a class export", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `export class A {};`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript when there is a export declaration", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `const a = "123"; export { a };`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to ecmascript for Vue SFC script tags", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.vue",
      `<template>
</template>
<script>
var notAGlobalInsideMJS = "123";
</script>
<style>
</style>`
    );

    expect(sourceModuleKind.id).toEqual("ECMASCRIPT");
  });

  it("should set module kind to script for .js files without any special indications", async () => {
    const sourceModuleKind = await executeGetSourceModuleKind(
      "example.js",
      `let a = "123";`
    );

    expect(sourceModuleKind.id).toEqual("SCRIPT");
  });
});
