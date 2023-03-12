import * as ts from "typescript";
import { getEmbeddedScripts } from "../file-type/FileTypes";
import { ScriptRangeWithExtension } from "../file-type/ScriptRange";

// P42 uses the latest ES version with TS39 Stage 4 proposals (currently ES2022).
export const DEFAULT_SCRIPT_TARGET = ts.ScriptTarget.ES2022;

export type EmbeddedSourceParseResult = {
  path: string;
  content: string;
  sourceFile: ts.SourceFile;
} & ScriptRangeWithExtension;

export function parseEmbeddedSources({
  path,
  extension,
  content,
  languageVersion = DEFAULT_SCRIPT_TARGET,
}: {
  path: string;
  extension?: string;
  content: string;
  languageVersion?: ts.ScriptTarget;
}): Array<EmbeddedSourceParseResult> {
  const embeddedScripts = getEmbeddedScripts(path, extension, content);

  return embeddedScripts.map((scriptRange, index) => {
    const embedPath = `${path}.${index}.${getExtension(
      scriptRange.scriptKind
    )}`;

    const embedContent = content.substring(
      scriptRange.range.start,
      scriptRange.range.end
    );

    return {
      path: embedPath,
      content: embedContent,
      sourceFile: ts.createSourceFile(
        embedPath,
        embedContent,
        languageVersion,
        false,
        scriptRange.scriptKind
      ),
      range: scriptRange.range,
      extension: scriptRange.extension,
      language: scriptRange.language,
      scriptKind: scriptRange.scriptKind,
      areTopLevelVariablesLocal: scriptRange.areTopLevelVariablesLocal,
      getSourceModuleKind: scriptRange.getSourceModuleKind,
    };
  });
}

const getExtension = (scriptKind: ts.ScriptKind) => {
  switch (scriptKind) {
    case ts.ScriptKind.JS:
      return "js";
    case ts.ScriptKind.JSX:
      return "js";
    case ts.ScriptKind.TS:
      return "ts";
    case ts.ScriptKind.TSX:
      return "tsx";
    default:
      throw new Error(`unsupported script kind ${scriptKind}`);
  }
};
