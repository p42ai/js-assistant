import ts from "typescript";
import { AnyMatch } from "../matcher/engine/Match";
import { ActionZone } from "../transformation/ActionZone";
import { InteractiveInput } from "../transformation/InteractiveInput";
import { Edit } from "../transformation/reprinter/Edit";
import { Suggestion } from "../transformation/Suggestion";
import { Grouping } from "../util/collection/Grouping";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { NullCancellationToken } from "../util/concurrency/NullCancellationToken";
import { createDiff } from "../util/diff/createDiff";
import { Range } from "../util/text/Range";
import { CodeAssist, SuggestedCodeAssist } from "./CodeAssist";
import { CodeAssistAction } from "./CodeAssistAction";
import { CodeAssistApplicationResult } from "./CodeAssistApplicationResult";
import { getEmbeddedSourceIndex } from "./CodeAssistId";
import * as CodeAssistLevel from "./CodeAssistLevel";
import { CodeAssistType } from "./CodeAssistType";
import { EmbeddedSource } from "./EmbeddedSource";
import { FunctionElement } from "./FunctionElement";

/**
 * Interface between matching and transformation on a document and the frontend / user interface.
 *
 * Responsibilities:
 * - document abstraction (multiple parse ranges are hidden)
 * - considering the correct activation ranges
 * - match deduplication
 * - hiding matches, transformations, etc.
 *
 * It needs to also support:
 * - dealing with cancellation
 * - performance logging
 */
export class SourceDocument {
  private codeAssistTypeById = new Map<string, CodeAssistType<AnyMatch>>();

  constructor(
    /**
     * Full source text.
     */
    readonly text: string,
    readonly codeAssistTypes: Array<CodeAssistType<AnyMatch>>,
    private readonly embeddedSources: Array<EmbeddedSource>
  ) {
    for (const type of codeAssistTypes) {
      this.codeAssistTypeById.set(type.id, type);
    }
  }

  private getEmbeddedSource(codeAssistId: string): EmbeddedSource {
    const index = getEmbeddedSourceIndex(codeAssistId);
    const embeddedSource = this.embeddedSources[index];
    if (embeddedSource == null) {
      throw new Error(`no embedded source at index '${index}' found`);
    }
    return embeddedSource;
  }

  private resolveCodeAssistTypes(codeAssistTypeIds: Array<string>): {
    codeAssistTypes: Array<CodeAssistType<AnyMatch>>;
    errors: Array<unknown>;
  } {
    const errors: Array<unknown> = [];
    const types: Array<CodeAssistType<AnyMatch>> = [];

    codeAssistTypeIds.forEach((typeId) => {
      const type = this.codeAssistTypeById.get(typeId);
      if (type == null) {
        errors.push(`Code assist '${typeId}' was not found.`);
      } else {
        types.push(type);
      }
    });

    return { codeAssistTypes: types, errors };
  }

  applyEdit(edit: Edit | undefined) {
    return edit == null ? this.text : edit.applyTo(this.text);
  }

  async applyCodeAssists({
    codeAssists,
    interactiveInput,
  }: {
    codeAssists: Array<CodeAssist>;
    interactiveInput?: InteractiveInput | undefined;
  }) {
    return this.applyCodeAssistsById({
      codeAssistIds: codeAssists.map((codeAssist) => codeAssist.id),
      interactiveInput,
    });
  }

  // TODO use from apply all safe & from mass refactoring
  async applyCodeAssistsById({
    codeAssistIds,
    interactiveInput,
  }: {
    codeAssistIds: Array<string>;
    interactiveInput?: InteractiveInput | undefined;
  }): Promise<{
    edit: Edit | undefined;
    applicationResults: Array<CodeAssistApplicationResult>;
  }> {
    // group code assists by embedded source
    const codeAssistIdsByEmbed = new Grouping<EmbeddedSource, string>();
    for (const codeAssistId of codeAssistIds) {
      codeAssistIdsByEmbed.addValue(
        this.getEmbeddedSource(codeAssistId),
        codeAssistId
      );
    }

    // calculate edits for embedded sources
    const allApplicationResults: Array<CodeAssistApplicationResult> = [];
    const edits: Array<Edit> = [];
    for (const [
      embeddedSource,
      codeAssistIds,
    ] of codeAssistIdsByEmbed.entries()) {
      const { edit, applicationResults } =
        await embeddedSource.applyCodeAssists({
          codeAssistIds,
          interactiveInput,
        });
      allApplicationResults.push(...applicationResults);
      if (edit != null) {
        edits.push(edit);
      }
    }

    // merge edits from embedded sources into final edit
    edits.sort((editA, editB) => editA.range.start - editB.range.start);
    let edit = edits[0];
    for (let i = 1; i < edits.length; i++) {
      const nextEdit = edits[i];
      const intermediateText = this.text.substring(
        edit.range.end,
        nextEdit.range.start
      );

      edit = new Edit(
        new Range(edit.range.start, nextEdit.range.end),
        edit.replacement + intermediateText + nextEdit.replacement
      );
    }

    return {
      edit,
      applicationResults: allApplicationResults,
    };
  }

  /**
   * Calculates the code assist action with the actual edit (replacement range and text).
   * This is done on demand, separately from the match calculation, because it is an
   * expensive operation.
   */
  async getCodeAssistAction({
    codeAssistId,
    interactiveInput,
  }: {
    codeAssistId: string;
    interactiveInput: InteractiveInput | undefined;
  }): Promise<CodeAssistAction> {
    return this.getEmbeddedSource(codeAssistId).getCodeAssistAction({
      codeAssistId,
      interactiveInput,
    });
  }

  async getDiff({
    codeAssistId,
    interactiveInput,
    contextLines,
  }: {
    codeAssistId: string;
    interactiveInput: InteractiveInput | undefined;
    contextLines?: number | undefined;
  }): Promise<string | undefined> {
    const { edit } = await this.getCodeAssistAction({
      codeAssistId,
      interactiveInput,
    });

    if (edit == null) {
      return undefined;
    }

    return createDiff("", this.text, edit.applyTo(this.text), contextLines);
  }

  getSuggestionCodeAssist(
    codeAssistId: string
  ): SuggestedCodeAssist | undefined {
    return this.getEmbeddedSource(codeAssistId).getScanCodeAssist(codeAssistId);
  }

  // exposed for the test framework
  getSourceFile(codeAssistId: string): ts.SourceFile {
    return this.getEmbeddedSource(codeAssistId).sourceFile;
  }

  // exposed for the test framework
  getActionZones(codeAssistId: string): Array<ActionZone> | undefined {
    return this.getEmbeddedSource(codeAssistId).getActionZones(codeAssistId);
  }

  // exposed for the test framework
  getSuggestion(codeAssistId: string): Suggestion | undefined {
    return this.getEmbeddedSource(codeAssistId).getSuggestion(codeAssistId);
  }

  // exposed for the test framework
  getBlockedZones(codeAssistId: string):
    | Array<{
        range: Range;
        kind: string;
      }>
    | undefined {
    return this.getEmbeddedSource(codeAssistId).getBlockedZones(codeAssistId);
  }

  // exposed for the test framework
  async getBasicCodeAssists(codeAssistTypeIds: Array<string>): Promise<{
    codeAssists: Array<CodeAssist>;
    errors: Array<unknown>;
  }> {
    const { errors, codeAssistTypes } =
      this.resolveCodeAssistTypes(codeAssistTypeIds);

    const codeAssists: Array<CodeAssist> = [];

    for (const embeddedSource of this.embeddedSources) {
      const result = await embeddedSource.getBasicCodeAssists(codeAssistTypes);

      errors.push(...result.errors);
      codeAssists.push(...result.codeAssists);
    }

    return { codeAssists, errors };
  }

  async getSuggestedCodeAssists({
    codeAssistTypeIds,
    cancellationToken = NullCancellationToken,
  }: {
    codeAssistTypeIds: Array<string>;
    cancellationToken?: CancellationToken;
  }): Promise<{
    codeAssists: Array<SuggestedCodeAssist>;
    errors: Array<unknown>;
  }> {
    const { errors, codeAssistTypes } =
      this.resolveCodeAssistTypes(codeAssistTypeIds);

    const codeAssists: Array<SuggestedCodeAssist> = [];

    for (const embeddedSource of this.embeddedSources) {
      const result = await embeddedSource.getSuggestedCodeAssists(
        codeAssistTypes,
        cancellationToken
      );

      errors.push(...result.errors);
      codeAssists.push(...result.codeAssists);
    }

    return { codeAssists, errors };
  }

  async getFunctionElements({
    cancellationToken = NullCancellationToken,
  }: {
    cancellationToken?: CancellationToken;
  }): Promise<{
    functionElements: Array<FunctionElement>;
    errors: Array<unknown>;
  }> {
    const errors = [];

    const functionElements: Array<FunctionElement> = [];

    for (const embeddedSource of this.embeddedSources) {
      const result = await embeddedSource.getFunctionElements(
        cancellationToken
      );

      errors.push(...result.errors);
      functionElements.push(...result.functionElements);
    }

    return { functionElements, errors };
  }

  /**
   * Calculates the code assists for a given range (which can be a position or a selection).
   *
   * @param onlyFirstMatch
   *        Return only the code assist for the first match. Default: false.
   *
   * @returns List of code assists, sorted from most specific (deepest tree node matched)
   *          to least specific.
   */
  async getSelectionCodeAssists({
    range,
    codeAssistTypeIds,
    minimumLevel,
    codeActionKindPrefix,
    onlyFirstMatch,
  }: {
    range: Range;
    codeAssistTypeIds: Array<string>;
    minimumLevel?: CodeAssistLevel.CodeAssistLevel;
    codeActionKindPrefix?: string;
    onlyFirstMatch?: boolean;
  }): Promise<{
    codeAssists: Array<CodeAssist>;
    errors: Array<unknown>;
  }> {
    const { errors, codeAssistTypes } =
      this.resolveCodeAssistTypes(codeAssistTypeIds);

    const embeddedSource = this.embeddedSources.find((embeddedSource) =>
      embeddedSource.containsAbsoluteRange(range)
    );

    return {
      codeAssists:
        embeddedSource == null
          ? []
          : await embeddedSource.getSelectionCodeAssists({
              codeAssistTypes,
              minimumLevel,
              codeActionKindPrefix,
              absoluteRange: range,
              onlyFirstMatch,
            }),
      errors,
    };
  }

  getLineCount(): number {
    return 1 + (this.text.match(/\n/g)?.length ?? 0);
  }
}
