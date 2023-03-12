import ts from "typescript";
import { Range } from "../../util/text/Range";
import { SupportedExtension } from "../../parser/file-type/FileTypes";
import { Language } from "../../parser/file-type/Language";
import { SourceModuleKind } from "../../parser/file-type/SourceModuleKind";

export class ScriptMetadata {
  /**
   * Extension of the larger file that this script is part of.
   */
  readonly extension: SupportedExtension;

  /**
   * Range inside the full original source text.
   */
  readonly range: Range;

  readonly language: Language;

  readonly scriptKind: ts.ScriptKind;

  /**
   * Will top level variable be available outside the script?
   * (e.g. for vue.js script setup). If so, certain refactorings
   * (e.g. remove unused variable) might not be available.
   */
  readonly areTopLevelVariablesLocal: boolean;

  readonly sourceModuleKind: SourceModuleKind["id"];

  readonly isVarGlobal: boolean;

  constructor({
    extension,
    range,
    language,
    scriptKind,
    sourceModuleKind,
    areTopLevelVariablesLocal,
    isVarGlobal,
  }: {
    extension: SupportedExtension;
    range: Range;
    language: Language;
    scriptKind: ts.ScriptKind;
    sourceModuleKind: SourceModuleKind["id"];
    areTopLevelVariablesLocal: boolean;
    isVarGlobal: boolean;
  }) {
    this.extension = extension;
    this.range = range;

    this.language = language;
    this.scriptKind = scriptKind;
    this.sourceModuleKind = sourceModuleKind;

    this.areTopLevelVariablesLocal = areTopLevelVariablesLocal;
    this.isVarGlobal = isVarGlobal;
  }

  isTypeScript(): boolean {
    return this.language === "TYPESCRIPT";
  }
}
