import * as p42 from "@p42/engine";

const VSCODE_LANGUAGE_ID_TO_EXTENSION: Map<string, string> = new Map();
VSCODE_LANGUAGE_ID_TO_EXTENSION.set("javascript", "js");
VSCODE_LANGUAGE_ID_TO_EXTENSION.set("javascriptreact", "jsx");
VSCODE_LANGUAGE_ID_TO_EXTENSION.set("typescript", "ts");
VSCODE_LANGUAGE_ID_TO_EXTENSION.set("typescriptreact", "tsx");
VSCODE_LANGUAGE_ID_TO_EXTENSION.set("vue", "vue");

/**
 * Return the extension that should be used for a given path and language id.
 *
 * When the extension cannot be resolved from the path, it is resolved from
 * the language ID. The path extension is often more precise (e.g. 'mjs' vs 'cjs'),
 * but there can be cases where it is not available (e.g. in a temporary editor).
 */
export function getExtension(
  path: string,
  languageId: string
): string | undefined {
  const extension = p42.getFileExtension(path);

  if (extension != null && p42.FileTypes.isSupportedExtension(extension)) {
    return extension;
  }

  return VSCODE_LANGUAGE_ID_TO_EXTENSION.get(languageId);
}

export function getSupportedLanguageIds(): Array<string> {
  return Array.from(VSCODE_LANGUAGE_ID_TO_EXTENSION.keys());
}
