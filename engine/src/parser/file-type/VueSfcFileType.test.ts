import ts from "typescript";
import { Range } from "../../util/text/Range";
import { VueSfcFileType } from "./VueSfcFileType";

function executeGetEmbeddedScripts(content: string) {
  return new VueSfcFileType().getEmbeddedScripts(content).map((result) => ({
    language: result.language,
    scriptKind: result.scriptKind,
    range: result.range,
    areTopLevelVariablesLocal: result.areTopLevelVariablesLocal,
  }));
}

describe("VueSfcFileType", () => {
  it("should not parse when script tag is missing", () => {
    const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<style>
</style>
`);

    expect(embeddedScripts).toEqual([]);
  });

  describe("with \\n separator", () => {
    it("should parse javascript script tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script>
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(33, 63),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse javascript script tag at the start of the file", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`<script>
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(8, 38),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse javascript script tag at the end of the file", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script>
let a = "3";
console.log(a);
</script>`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(33, 63),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse javascript script tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script>
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(33, 63),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse typescript script tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script lang="ts">
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "TYPESCRIPT",
          scriptKind: ts.ScriptKind.TS,
          range: new Range(43, 73),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse typescript script setup tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script setup lang="ts">
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "TYPESCRIPT",
          scriptKind: ts.ScriptKind.TS,
          range: new Range(49, 79),
          areTopLevelVariablesLocal: false,
        },
      ]);
    });

    it("should parse javascript script and script setup tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`
<template>
</template>

<script>
let b = "4444";
console.log(b);
</script>

<script setup>
let a = "3";
console.log(a);
</script>

<style>
</style>
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(33, 66),
          areTopLevelVariablesLocal: true,
        },
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(91, 121),
          areTopLevelVariablesLocal: false,
        },
      ]);
    });
  });

  describe("with \\r\\n separator", () => {
    it("should parse javascript script tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`\r
<template>\r
</template>\r
\r
<script>\r
let a = "3";\r
console.log(a);\r
</script>\r
\r
<style>\r
</style>\r
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(37, 70),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse javascript script setup tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`\r
<template>\r
</template>\r
\r
<script setup>\r
let a = "3";\r
console.log(a);\r
</script>\r
\r
<style>\r
</style>\r
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "JAVASCRIPT",
          scriptKind: ts.ScriptKind.JS,
          range: new Range(43, 76),
          areTopLevelVariablesLocal: false,
        },
      ]);
    });

    it("should parse typescript script tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`\r
<template>\r
</template>\r
\r
<script lang="ts">\r
let a = "3";\r
console.log(a);\r
</script>\r
\r
<style>\r
</style>\r
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "TYPESCRIPT",
          scriptKind: ts.ScriptKind.TS,
          range: new Range(47, 80),
          areTopLevelVariablesLocal: true,
        },
      ]);
    });

    it("should parse typescript script setup tag", () => {
      const embeddedScripts = executeGetEmbeddedScripts(`\r
<template>\r
</template>\r
\r
<script setup lang="ts">\r
let a = "3";\r
console.log(a);\r
</script>\r
\r
<style>\r
</style>\r
`);

      expect(embeddedScripts).toStrictEqual([
        {
          language: "TYPESCRIPT",
          scriptKind: ts.ScriptKind.TS,
          range: new Range(53, 86),
          areTopLevelVariablesLocal: false,
        },
      ]);
    });
  });
});
