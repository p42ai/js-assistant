import ts from "typescript";
import { Range } from "../../util/text/Range";
import { FileType } from "./FileType";
import { Language } from "./Language";
import { getSourceModuleKind } from "./SourceModuleKind";

export class FixedFileType implements FileType {
  get possibleLanguages() {
    return [this.language];
  }

  constructor(
    private readonly scriptKind: ts.ScriptKind,
    private readonly language: Language,
    private readonly getSourceModuleKind: getSourceModuleKind
  ) {}

  getEmbeddedScripts(content: string) {
    return [
      {
        scriptKind: this.scriptKind,
        range: new Range(0, content.length),
        areTopLevelVariablesLocal: true, // assume ES modules
        language: this.language,
        getSourceModuleKind: this.getSourceModuleKind,
      },
    ];
  }
}
