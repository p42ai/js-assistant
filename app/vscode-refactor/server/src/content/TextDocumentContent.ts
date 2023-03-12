import * as p42 from "@p42/engine";
import { TextDocument } from "vscode-languageserver-textdocument";

/**
 * Wraps a `vscode.TextDocument` and provides P42-specific methods.
 */
export class TextDocumentContent extends p42.Content {
  readonly text: string;

  get uri() {
    return this.document.uri;
  }

  constructor(
    readonly path: string,
    extension: string | undefined,
    readonly document: TextDocument
  ) {
    super(path, extension);
    this.text = document.getText();
  }

  async load(): Promise<string> {
    return this.text;
  }
}
