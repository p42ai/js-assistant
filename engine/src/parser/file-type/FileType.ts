import { Language } from "./Language";
import { ScriptRange } from "./ScriptRange";

export interface FileType {
  readonly possibleLanguages: Array<Language>;

  /**
   * Calculates detailed source settings for a file. This is required for embedded script sections,
   * e.g. inside Vue SFCs. Returns an empty array when the file has no parsable script section.
   */
  getEmbeddedScripts(content: string): Array<ScriptRange>;
}
