import ts from "typescript";
import { SourceFileContent } from "./SourceFileContent";
import { SourceFileContentCompilerHost } from "./SourceFileContentCompilerHost";

export abstract class SourceFileCompilerHost extends SourceFileContentCompilerHost {
  // cached source files
  private sourceFiles = new Map<string, ts.SourceFile>();

  constructor(
    sourceFileContents: Array<SourceFileContent>,
    parent: ts.CompilerHost | undefined
  ) {
    super(sourceFileContents, parent);
  }

  getSourceFile(
    path: string,
    languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions
  ): ts.SourceFile | undefined {
    // TODO does ts.CreateSourceFileOptions case need to be handled?
    const languageVersion = languageVersionOrOptions as ts.ScriptTarget;

    if (!this.hasPath(path)) {
      return this.parent?.getSourceFile(path, languageVersion);
    }

    if (this.sourceFiles.has(path)) {
      return this.sourceFiles.get(path);
    }

    const sourceContent = this.sources.get(path)!.content;

    const sourceFile = ts.createSourceFile(
      path,
      sourceContent,
      languageVersion,
      false
    );

    this.sourceFiles.set(path, sourceFile);

    return sourceFile;
  }
}
