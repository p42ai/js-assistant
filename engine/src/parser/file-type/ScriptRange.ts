import ts from "typescript";
import { Range } from "../../util/text/Range";
import { SupportedExtension } from "./FileTypes";
import { Language } from "./Language";
import { getSourceModuleKind } from "./SourceModuleKind";

export type ScriptRange = {
  range: Range;
  scriptKind: ts.ScriptKind;
  areTopLevelVariablesLocal: boolean;
  language: Language;
  getSourceModuleKind: getSourceModuleKind;
};

export type ScriptRangeWithExtension = ScriptRange & {
  extension: SupportedExtension;
};
