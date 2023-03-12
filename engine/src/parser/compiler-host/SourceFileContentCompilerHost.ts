import ts from "typescript";
import { SourceFileContent } from "./SourceFileContent";

export abstract class SourceFileContentCompilerHost implements ts.CompilerHost {
  protected sources = new Map<string, SourceFileContent>();

  constructor(
    sourceFileContents: Array<SourceFileContent>,
    protected parent: ts.CompilerHost | undefined
  ) {
    for (const sourceFileContent of sourceFileContents) {
      this.sources.set(sourceFileContent.path, sourceFileContent);
    }
  }

  abstract getSourceFile(
    fileName: string,
    languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions,
    onError?: ((message: string) => void) | undefined,
    shouldCreateNewSourceFile?: boolean | undefined
  ): ts.SourceFile | undefined;

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    const fileName = this.parent?.getDefaultLibFileName(options);

    if (fileName == null) {
      throw new Error(`no default lib filename`);
    }

    return fileName;
  }

  fileExists(path: string): boolean {
    return this.hasPath(path) ? true : this.parent?.fileExists(path) ?? false;
  }

  protected hasPath(path: string): boolean {
    return this.sources.has(path);
  }

  writeFile(fileName: string, data: string, writeByteOrderMark: boolean) {
    // noop
  }

  getCurrentDirectory(): string {
    return "";
  }

  getCanonicalFileName(fileName: string): string {
    return fileName;
  }

  useCaseSensitiveFileNames(): boolean {
    return true;
  }

  getNewLine(): string {
    return "\n"; // TODO operating system default?
  }

  readFile(path: string): string | undefined {
    return this.hasPath(path)
      ? this.sources.get(path)!.content
      : this.parent?.readFile(path);
  }
}
