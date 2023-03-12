import ts from "typescript";
import {
  EmbeddedSourceParseResult,
  parseEmbeddedSources,
} from "./parseEmbeddedSources";
import { SourceFileCompilerHost } from "./SourceFileCompilerHost";
import { SourceFileContent } from "./SourceFileContent";

export class EmbeddedSourcesCompilerHost extends SourceFileCompilerHost {
  /**
   * Original path -> all embedded parse results for that path (= file)
   */
  private embeddedResultsByContainerPath = new Map<
    string,
    Array<EmbeddedSourceParseResult>
  >();

  /**
   * Embedded source path -> embedded source.
   */
  private embeddedResultByPath = new Map<string, EmbeddedSourceParseResult>();

  constructor(
    files: Array<SourceFileContent>,
    parent: ts.CompilerHost | undefined
  ) {
    super(files, parent);
  }

  getEmbeddedParseResults(
    path: string,
    languageVersion?: ts.ScriptTarget | undefined
  ): Array<EmbeddedSourceParseResult> {
    if (this.embeddedResultsByContainerPath.has(path)) {
      return this.embeddedResultsByContainerPath.get(path)!;
    }

    const { extension, content } = this.sources.get(path)!;

    const embeddedSourceResults = parseEmbeddedSources({
      path,
      extension,
      content,
      languageVersion,
    });

    this.embeddedResultsByContainerPath.set(path, embeddedSourceResults);

    for (const result of embeddedSourceResults) {
      this.embeddedResultByPath.set(result.path, result);
    }

    return embeddedSourceResults;
  }

  protected hasPath(path: string): boolean {
    return this.embeddedResultByPath.has(path);
  }

  getSourceFile(
    path: string,
    languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions
  ): ts.SourceFile | undefined {
    // TODO does ts.CreateSourceFileOptions case need to be handled?
    const languageVersion = languageVersionOrOptions as ts.ScriptTarget;
    return this.hasPath(path)
      ? this.embeddedResultByPath.get(path)?.sourceFile
      : this.parent?.getSourceFile(path, languageVersion);
  }

  fileExists(path: string): boolean {
    return this.hasPath(path) ? true : this.parent?.fileExists(path) ?? false;
  }

  readFile(path: string): string | undefined {
    return this.hasPath(path)
      ? this.embeddedResultByPath.get(path)?.content
      : this.parent?.readFile(path);
  }
}
