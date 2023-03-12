import ts from "typescript";
import { Range } from "../../util/text/Range";
import { FileType } from "./FileType";
import { Language } from "./Language";
import { ScriptRange } from "./ScriptRange";
import { ECMASCRIPT_MODULE_KIND } from "./SourceModuleKind";

// TODO this is hacky and can break in edge cases, because it does not fully parse the file as xml and the script section can contain </script>
const START_TAG =
  /(?<separator>(^|\n|\r\n))<(script|script setup|script lang="ts"|script setup lang="ts")>\k<separator>/g;

export class VueSfcFileType implements FileType {
  readonly possibleLanguages: Array<Language> = ["JAVASCRIPT", "TYPESCRIPT"];

  getEmbeddedScripts(content: string) {
    const scriptRanges: Array<ScriptRange> = [];

    const startTagMatches = content.matchAll(START_TAG);
    for (const startTagMatch of startTagMatches) {
      const startTagStart = startTagMatch.index!;
      const startTagText = startTagMatch[0]!;
      const separator = startTagMatch[1]!;
      const innerText = startTagMatch[3]!;

      const scriptCodeStart =
        startTagStart + startTagText.length - separator.length;
      const remainingContent = content.substring(scriptCodeStart);

      const endTag = `${separator}</script>`;
      const endTagStart = remainingContent.indexOf(endTag);

      if (endTagStart === -1) {
        break;
      }

      const scriptCodeEnd = scriptCodeStart + endTagStart + separator.length;
      const language =
        innerText === 'script lang="ts"' ||
        innerText === 'script setup lang="ts"'
          ? "TYPESCRIPT"
          : "JAVASCRIPT";

      const isScriptSetup = innerText.indexOf("setup") !== -1;

      scriptRanges.push({
        language,
        scriptKind:
          language === "JAVASCRIPT" ? ts.ScriptKind.JS : ts.ScriptKind.TS,
        range: new Range(scriptCodeStart, scriptCodeEnd),
        areTopLevelVariablesLocal: !isScriptSetup,
        getSourceModuleKind: () => ECMASCRIPT_MODULE_KIND,
      });
    }

    return scriptRanges;
  }
}
