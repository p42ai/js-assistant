import ts from "typescript";
import { TypeSystem } from "../ast/TypeSystem";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { NullCancellationToken } from "../util/concurrency/NullCancellationToken";
import { getFileExtension } from "../util/fs/getFileExtension";
import { EmbeddedSourcesCompilerHost } from "./compiler-host/EmbeddedSourcesCompilerHost";
import { DefaultLibCompilerHost } from "./compiler-host/ts-lib/DefaultLibCompilerHost";
import { isSupportedExtension } from "./file-type/FileTypes";
import { ParseResult } from "./ParseResult";

// separate libs into parent compiler host to cache parse results
const libCompilerHost = new DefaultLibCompilerHost();

/**
 * Parses the contents of a file into a SourceFile and creates a TypeChecker.
 */
export const parse = async (
  path: string,
  extension: string | undefined = getFileExtension(path),
  content: string,
  /**
   * Cancellation token for aborting the parsing. It is checked between major steps
   * (e.g. before type checking).
   */
  cancellationToken: CancellationToken = NullCancellationToken
): Promise<Array<ParseResult>> => {
  if (extension == null) {
    throw new Error(`'${path}' does not have an extension.`);
  }

  if (!isSupportedExtension(extension)) {
    throw new Error(`Unsupported extension '${extension}'.`);
  }

  // note: the typescript checker relies on the file extension for type inference etc.
  const compilerHost = new EmbeddedSourcesCompilerHost(
    [{ path, content, extension }],
    libCompilerHost
  );

  const parseResults = compilerHost.getEmbeddedParseResults(path);

  const result = [];

  for (const parseResult of parseResults) {
    if (hasFileIgnoreComment(parseResult.sourceFile)) {
      continue;
    }

    await cancellationToken.deferAndThrowIfCancellationRequested();

    const program = ts.createProgram(
      [parseResult.path ?? path], // use an alias that ends with .js/.ts (required for ts type-checking)
      {
        allowJs: true, // needed when .js file names are used
        strict: true, // needed for correct type-checking
      },
      compilerHost
    );

    await cancellationToken.deferAndThrowIfCancellationRequested();

    result.push({
      sourceFile: parseResult.sourceFile,
      typeSystem: new TypeSystem(program.getTypeChecker()),
      range: parseResult.range,
      language: parseResult.language,
      scriptKind: parseResult.scriptKind,
      getSourceModuleKind: parseResult.getSourceModuleKind,
      areTopLevelVariablesLocal: parseResult.areTopLevelVariablesLocal,
      extension: parseResult.extension,
    });
  }

  return result;
};

/**
 * Checks if there is a `// p42:ignore-file` comment on the top of the source file.
 */
// TODO move into separate file
const hasFileIgnoreComment = (sourceFile: ts.SourceFile): boolean => {
  const fullText = sourceFile.getFullText();
  const leadingCommentRanges = ts.getLeadingCommentRanges(fullText, 0) ?? [];

  return leadingCommentRanges.some(
    (commentRange) =>
      fullText.substring(commentRange.pos, commentRange.end).trim() ===
      "// p42:ignore-file"
  );
};
