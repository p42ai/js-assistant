import ts from "typescript";
import { CodeAssistType } from "../../code-assist/CodeAssistType";
import { AnyMatch } from "../../matcher/engine/Match";
import { getFileExtension } from "../../util/fs/getFileExtension";
import { FileType } from "./FileType";
import { FixedFileType } from "./FixedFileType";
import { ScriptRange } from "./ScriptRange";
import {
  COMMON_JS_MODULE_KIND,
  ECMASCRIPT_MODULE_KIND,
  getJavaScriptSourceModuleKind,
  TYPESCRIPT_MODULE_KIND,
} from "./SourceModuleKind";
import { VueSfcFileType } from "./VueSfcFileType";

const fileTypes: Record<SupportedExtension, FileType> = Object.freeze({
  js: new FixedFileType(
    ts.ScriptKind.JSX,
    "JAVASCRIPT",
    getJavaScriptSourceModuleKind
  ),
  jsx: new FixedFileType(
    ts.ScriptKind.JSX,
    "JAVASCRIPT",
    getJavaScriptSourceModuleKind
  ),
  cjs: new FixedFileType(
    ts.ScriptKind.JSX,
    "JAVASCRIPT",
    () => COMMON_JS_MODULE_KIND
  ),
  mjs: new FixedFileType(
    ts.ScriptKind.JSX,
    "JAVASCRIPT",
    () => ECMASCRIPT_MODULE_KIND
  ),
  ts: new FixedFileType(
    ts.ScriptKind.TS,
    "TYPESCRIPT",
    () => TYPESCRIPT_MODULE_KIND
  ),
  tsx: new FixedFileType(
    ts.ScriptKind.TSX,
    "TYPESCRIPT",
    () => TYPESCRIPT_MODULE_KIND
  ),
  cts: new FixedFileType(
    ts.ScriptKind.TS,
    "TYPESCRIPT",
    () => TYPESCRIPT_MODULE_KIND
  ),
  mts: new FixedFileType(
    ts.ScriptKind.TS,
    "TYPESCRIPT",
    () => TYPESCRIPT_MODULE_KIND
  ),
  vue: new VueSfcFileType(),
});

export type SupportedExtension =
  | "js"
  | "jsx"
  | "cjs"
  | "mjs"
  | "ts"
  | "tsx"
  | "cts"
  | "mts"
  | "vue";

export const isSupportedExtension = (
  extension: string
): extension is SupportedExtension =>
  Object.prototype.hasOwnProperty.call(fileTypes, extension);

export function getEmbeddedScripts(
  path: string,
  extension: string | undefined = getFileExtension(path),
  content: string
): Array<
  ScriptRange & {
    extension: SupportedExtension;
  }
> {
  if (extension == null) {
    throw new Error(`'${path}' does not have an extension.`);
  }

  if (!isSupportedExtension(extension)) {
    throw new Error(`Unsupported extension '${extension}'.`);
  }

  return fileTypes[extension]
    .getEmbeddedScripts(content)
    .map((embeddedScript) => ({
      extension,
      range: embeddedScript.range,
      scriptKind: embeddedScript.scriptKind,
      areTopLevelVariablesLocal: embeddedScript.areTopLevelVariablesLocal,
      language: embeddedScript.language,
      getSourceModuleKind: embeddedScript.getSourceModuleKind,
    }));
}

export function getAllSupportedFileExtensions(): Array<string> {
  return Object.keys(fileTypes);
}

export function getSupportedFileExtensions(
  refactoring: CodeAssistType<AnyMatch>
): Array<string> {
  const supportedFileExtensions = [];
  for (const [fileExtension, extensionConfiguration] of Object.entries(
    fileTypes
  )) {
    if (
      extensionConfiguration.possibleLanguages.some((language) =>
        refactoring.isLanguageSupported(language)
      )
    ) {
      supportedFileExtensions.push(fileExtension);
    }
  }
  return supportedFileExtensions;
}
