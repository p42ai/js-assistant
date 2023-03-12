import { getId } from "../ast/getId";
import { Context } from "../matcher/engine/Context";
import { AnyMatch } from "../matcher/engine/Match";
import { PatternMatcherEngine } from "../matcher/engine/PatternMatcherEngine";
import { EditorOperation } from "../transformation/editor-operation/index";
import { Edit } from "../transformation/reprinter/Edit";
import { Transformation } from "../transformation/Transformation";
import { TransformedNodeTree } from "../transformation/TransformedNodeTree.generated";
import { InteractiveInput } from "../transformation/InteractiveInput";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { NullCancellationToken } from "../util/concurrency/NullCancellationToken";
import {
  NullPerformanceRecorder,
  PerformanceRecorder,
} from "../util/performance/PerformanceRecorder";
import { Range } from "../util/text/Range";
import { Content } from "./Content";
import { CodeAssistType } from "./CodeAssistType";
import { CodeAssistErrorType } from "./CodeAssistErrorType";
import { asStructuredError } from "./StructuredError";

export class CodeAssistEngine {
  constructor(
    readonly content: Content,
    readonly originalText: string,
    readonly range: Range,
    readonly matcherEngine: PatternMatcherEngine,
    private readonly performanceRecorder: PerformanceRecorder = NullPerformanceRecorder
  ) {}

  get sourceFile() {
    return this.matcherEngine.nodeIndex.sourceFile;
  }

  // TODO introduce typescript refactoring to ? when default is undefined
  createContext(selectedRange: Range | undefined = undefined): Context {
    return this.matcherEngine.createContext(selectedRange);
  }

  async matchCodeAssists(
    codeAssists: Array<CodeAssistType<AnyMatch>>,
    processMatches: (
      matches: Array<AnyMatch>,
      codeAssist: CodeAssistType<AnyMatch>
    ) => Promise<void>,
    onError: (error: unknown, refactoring: CodeAssistType<AnyMatch>) => void,
    cancellationToken: CancellationToken = NullCancellationToken
  ) {
    return this.performanceRecorder.runAsync(
      `match - total`,
      "overview",
      async () => {
        for (const codeAssist of codeAssists) {
          await cancellationToken.deferAndThrowIfCancellationRequested();
          try {
            await this.matchCodeAssist(codeAssist, processMatches);
          } catch (error: any) {
            onError(
              asStructuredError(error, CodeAssistErrorType.MATCH_ERROR),
              codeAssist
            );
          }
        }
      }
    );
  }

  // note: this method is async, because the processMatches parameter is async
  async matchCodeAssist(
    codeAssist: CodeAssistType<AnyMatch>,
    processMatches: (
      matches: Array<AnyMatch>,
      codeAssist: CodeAssistType<AnyMatch>
    ) => Promise<void>
  ): Promise<void> {
    if (!this.isCodeAssistSupported(codeAssist)) {
      return;
    }

    return this.performanceRecorder.runAsync(
      `match ${codeAssist.id}`,
      "detail",
      async () =>
        processMatches(
          this.matcherEngine.findMatches(codeAssist.matcher),
          codeAssist
        )
    );
  }

  async createEdit(
    codeAssist: CodeAssistType<AnyMatch>,
    matches: Array<AnyMatch>,
    interactiveInput: InteractiveInput | undefined = undefined
  ): Promise<Edit | undefined> {
    try {
      const tree = new TransformedNodeTree(this.sourceFile);
      for (const match of matches) {
        const transformations = codeAssist.getTransformations(match);
        if (transformations.length > 0) {
          await transformations[0].apply(match, tree, interactiveInput);
        }
      }

      return tree.toEdit();
    } catch (error) {
      throw asStructuredError(error, CodeAssistErrorType.TRANSFORM_ERROR);
    }
  }

  /**
   * Text offset that needs to be applied to ranges etc. Needed for inline
   * scripts, e.g. in Vue.js SFCs.
   */
  get offset(): number {
    return this.range.start;
  }

  get lineOffset(): number {
    const leadingText = this.originalText.substring(0, this.range.start);
    return leadingText.match(/\n/g)?.length ?? 0; // use regexp for performance
  }

  async createSingleInteractiveEdit({
    transformation,
    match,
    interactiveInput,
  }: {
    transformation: Transformation<AnyMatch>;
    match: AnyMatch;
    interactiveInput: InteractiveInput | undefined;
  }): Promise<{
    edit: Edit | undefined;
    postEditOperations: Array<EditorOperation> | undefined;
  }> {
    // outer try catch to convert into structured error:
    try {
      const tree = new TransformedNodeTree(this.sourceFile);

      let operations: Array<EditorOperation> | void;
      let edit: Edit | undefined;

      // include node id and transformation in error message:
      try {
        operations = await transformation.apply(match, tree, interactiveInput);
        edit = tree.toEdit();
      } catch (error: any) {
        throw new Error(
          `createSingleInteractiveEdit for node ${getId(match.node)} failed: ${
            error.message ?? error
          }`
        );
      }

      return {
        edit,
        postEditOperations: operations ?? undefined,
      };
    } catch (error) {
      throw asStructuredError(error, CodeAssistErrorType.TRANSFORM_ERROR);
    }
  }

  applyEdit(edit: Edit | undefined): string | undefined {
    if (edit == null) {
      return;
    }

    try {
      return edit.applyTo(this.originalText, this.offset);
    } catch (error) {
      throw asStructuredError(error, CodeAssistErrorType.PRINT_ERROR);
    }
  }

  isCodeAssistSupported(codeAssist: CodeAssistType<AnyMatch>) {
    return codeAssist.isLanguageSupported(
      this.matcherEngine.createContext().scriptMetadata.language
    );
  }
}
