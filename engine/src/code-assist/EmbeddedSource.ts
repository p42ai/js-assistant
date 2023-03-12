import ts from "typescript";
import { findNodesContainingRange } from "../ast/findNodesContainingRange";
import { getBlockChildParent } from "../ast/getBlockChildParent";
import { getId } from "../ast/getId";
import { getLevel } from "../ast/Node";
import { visitSelfAndEachDescendant } from "../ast/visitSelfAndEachDescendant";
import { hasAncestor } from "../matcher";
import {
  block,
  classDeclaration,
  functionDeclaration,
  identifier,
  methodDeclaration,
} from "../matcher/ast";
import { node, value } from "../matcher/capture";
import { Context } from "../matcher/engine/Context";
import { AnyMatch, Match } from "../matcher/engine/Match";
import { PatternMatcher } from "../matcher/engine/PatternMatcher";
import { or } from "../matcher/predicate";
import { ActionZone } from "../transformation/ActionZone";
import { InteractiveInput } from "../transformation/InteractiveInput";
import { Edit } from "../transformation/reprinter/Edit";
import { Suggestion } from "../transformation/Suggestion";
import { TransformedNodeTree } from "../transformation/TransformedNodeTree.generated";
import { Grouping } from "../util/collection/Grouping";
import { CancellationToken } from "../util/concurrency/CancellationToken";
import { Range } from "../util/text/Range";
import { trimWhitespaceFromSelection } from "../util/text/trimWhitespaceFromSelection";
import { CodeAssist, SuggestedCodeAssist } from "./CodeAssist";
import { CodeAssistAction } from "./CodeAssistAction";
import { CodeAssistApplicationResult } from "./CodeAssistApplicationResult";
import { CodeAssistEngine } from "./CodeAssistEngine";
import * as CodeAssistLevel from "./CodeAssistLevel";
import { CodeAssistType } from "./CodeAssistType";
import { FunctionElement } from "./FunctionElement";
import { TransformationResult } from "./TransformationResult";

class TransformationCandidate {
  /**
   * Distance of the node from the root of the Sourcefile.
   */
  readonly level: number;

  constructor(
    readonly node: ts.Node,
    readonly transformationResults: Array<TransformationResult>
  ) {
    this.level = getLevel(node);
  }
}

/**
 * Range within a source document that is parsed and analyzed.
 */
export class EmbeddedSource {
  private transformationResultById = new Map<string, TransformationResult>();

  private suggestionCodeAssistsByType = new Map<
    CodeAssistType<AnyMatch>,
    Array<SuggestedCodeAssist>
  >();

  readonly lineOffset: number;

  constructor(
    /**
     * Index of the embedded source in the array of embedded sources.
     */
    readonly index: number,

    /**
     * Full text of the outer source document.
     */
    readonly fullDocumentText: string,

    readonly rangeInDocument: Range,

    readonly codeAssistEngine: CodeAssistEngine,

    readonly path: string,

    readonly languageVersion: ts.ScriptTarget,

    readonly scriptKind: ts.ScriptKind
  ) {
    const leadingText = this.fullDocumentText.substring(
      0,
      this.rangeInDocument.start
    );
    this.lineOffset = leadingText.match(/\n/g)?.length ?? 0; // use regexp for performance
  }

  get sourceFile(): ts.SourceFile {
    return this.codeAssistEngine.sourceFile;
  }

  /**
   * Applies several code assists at once and detects potential conflicts.
   *
   * Conflicts happen when the parent node any node that would be impacted
   * by a transformation has already been impacted by another transformation.
   *
   * The code assists are applied in order:
   * - distance from SourceFile root
   * - start position
   *
   * The combination of conflict detection and ordering makes it possible
   * to guarantee that a transformation is only applied when the parent
   * node will not be modified directly (indirect modifications through
   * the tree are still possible, but don't lead to problems).
   */
  async applyCodeAssists({
    codeAssistIds,
    interactiveInput,
  }: {
    codeAssistIds: Array<string>;
    interactiveInput?: InteractiveInput | undefined;
  }): Promise<{
    edit: Edit | undefined;
    applicationResults: Array<CodeAssistApplicationResult>;
  }> {
    const applicationResults: Array<CodeAssistApplicationResult> = [];

    // resolve code assist ids to transformation results
    // and create mapping from impact node to list of transformation results
    const resultsByImpactNode = new Grouping<ts.Node, TransformationResult>();
    for (const codeAssistId of codeAssistIds) {
      const transformationResult =
        this.transformationResultById.get(codeAssistId);

      if (transformationResult == null) {
        applicationResults.push({
          codeAssistId,
          result: "rejected/no-code-assist",
        });
        continue;
      }

      for (const impactNode of transformationResult.getImpactNodes()) {
        resultsByImpactNode.addValue(impactNode, transformationResult);
      }
    }

    // create candidate objects
    const candidates: Array<TransformationCandidate> = [];
    for (const [
      impactNode,
      transformationResults,
    ] of resultsByImpactNode.entries()) {
      candidates.push(
        new TransformationCandidate(impactNode, transformationResults)
      );
    }

    // sort candidate object by level and by start position
    candidates.sort((candidateA, candidateB) => {
      const levelDifference = candidateA.level - candidateB.level;

      return levelDifference === 0
        ? candidateA.node.pos - candidateB.node.pos
        : levelDifference;
    });

    // process candidates
    const tree = new TransformedNodeTree(this.codeAssistEngine.sourceFile);

    const impactedNodes: Array<ts.Node> = [];
    const hasImpactedAncestor = hasAncestor((ancestor) =>
      impactedNodes.includes(ancestor)
    );

    const processedTransformationResults = new Set<TransformationResult>();
    for (const candidate of candidates) {
      const { transformationResults } = candidate;

      // sort results by code assist id to guarantee stability:
      transformationResults.sort((resultA, resultB) =>
        resultA.codeAssistType.id.localeCompare(resultB.codeAssistType.id)
      );

      for (const transformationResult of transformationResults) {
        if (processedTransformationResults.has(transformationResult)) {
          continue;
        }

        const context = transformationResult.match.context;
        const nodesImpactedByTransformation =
          transformationResult.getImpactNodes();

        if (
          nodesImpactedByTransformation.some(
            (transformationNode) =>
              impactedNodes.includes(transformationNode) ||
              // previously changed node must not be child of impacted node (changes would get overridden):
              impactedNodes.some((alreadyChangedNode) =>
                hasAncestor((ancestor) => ancestor === transformationNode)(
                  alreadyChangedNode,
                  context
                )
              ) ||
              hasImpactedAncestor(transformationNode, context)
          )
        ) {
          applicationResults.push({
            codeAssistId: transformationResult.id,
            result: "rejected/conflict",
          });
          continue;
        }

        await transformationResult.apply({
          tree,
          interactiveInput,
        });

        processedTransformationResults.add(transformationResult);
        impactedNodes.push(...nodesImpactedByTransformation);

        applicationResults.push({
          codeAssistId: transformationResult.id,
          result: "applied",
        });
      }
    }

    return {
      edit: this.convertEditToAbsoluteRange(tree.toEdit()),
      applicationResults,
    };
  }

  /**
   * Converts edit range to location inside source document text.
   */
  convertEditToAbsoluteRange(edit: Edit | undefined) {
    return edit != null
      ? new Edit(this.convertToAbsoluteRange(edit.range), edit.replacement)
      : undefined;
  }

  // TODO add user interactions back (tested)
  async getCodeAssistAction({
    codeAssistId,
    interactiveInput,
  }: {
    codeAssistId: string;
    interactiveInput: InteractiveInput | undefined;
  }): Promise<CodeAssistAction> {
    const transformationResult =
      this.transformationResultById.get(codeAssistId);

    if (transformationResult == null) {
      throw new Error(`no code assist with id ${codeAssistId} found.`);
    }

    return transformationResult.createCodeAssistAction({ interactiveInput });
  }

  get offset(): number {
    return this.rangeInDocument.start;
  }

  get content(): string {
    return this.fullDocumentText.substring(
      this.rangeInDocument.start,
      this.rangeInDocument.end
    );
  }

  containsAbsoluteRange(absoluteRange: Range): boolean {
    return this.rangeInDocument.containsRange(absoluteRange);
  }

  convertToRelativeRange(absoluteRange: Range) {
    return absoluteRange.move(-this.offset);
  }

  convertToAbsoluteRange(relativeRange: Range) {
    return relativeRange.move(this.offset);
  }

  getTransformationResult(
    codeAssistId: string
  ): TransformationResult | undefined {
    return this.transformationResultById.get(codeAssistId);
  }

  getScanCodeAssist(codeAssistId: string): SuggestedCodeAssist | undefined {
    return this.getTransformationResult(codeAssistId)?.getSuggestedCodeAssist();
  }

  // exposed for the test framework
  getActionZones(codeAssistId: string): Array<ActionZone> | undefined {
    return this.getTransformationResult(codeAssistId)?.actionZones;
  }

  // exposed for the test framework
  getSuggestion(codeAssistId: string): Suggestion | undefined {
    return this.getTransformationResult(codeAssistId)?.suggestion ?? undefined;
  }

  // exposed for the test framework
  getBlockedZones(codeAssistId: string):
    | Array<{
        range: Range;
        kind: string;
      }>
    | undefined {
    return (
      this.getTransformationResult(codeAssistId)?.blockedZones ?? undefined
    );
  }

  getLineAndCharacter(relativePosition: number): ts.LineAndCharacter {
    const relativeLineAndCharacter =
      this.codeAssistEngine.sourceFile.getLineAndCharacterOfPosition(
        relativePosition
      );

    return {
      line: relativeLineAndCharacter.line + this.lineOffset,
      character: relativeLineAndCharacter.character,
    };
  }

  private storeTransformationResults(
    transformationResults: Array<TransformationResult>
  ): void {
    // TODO potential bug: ID conflicts when storing with range context
    for (const transformationResult of transformationResults) {
      this.transformationResultById.set(
        transformationResult.id,
        transformationResult
      );
    }
  }

  private async convertMatchesToTransformationResults(
    matches: AnyMatch[],
    codeAssistType: CodeAssistType<AnyMatch>
  ) {
    const transformationResults: Array<TransformationResult> = [];

    for (const match of matches) {
      const node = match.node;

      // if the node has a statement parent, check for ignore tags:
      if (!ts.isSourceFile(node)) {
        const statement = getBlockChildParent(node);
        const sourceFile = statement.getSourceFile();

        if (sourceFile != null) {
          const ignore = statement
            .getFullText(sourceFile)
            .trimStart()
            .startsWith("// p42:ignore-next-statement");

          if (ignore) {
            continue;
          }
        }
      }

      transformationResults.push(
        ...this.createTransformationResults(codeAssistType, match)
      );
    }

    this.storeTransformationResults(transformationResults);

    return transformationResults;
  }

  async getBasicCodeAssists(
    codeAssistTypes: Array<CodeAssistType<AnyMatch>>
  ): Promise<{
    codeAssists: Array<CodeAssist>;
    errors: Array<unknown>;
  }> {
    const codeAssists: Array<CodeAssist> = [];
    const errors: Array<unknown> = [];

    await this.codeAssistEngine.matchCodeAssists(
      codeAssistTypes,
      async (
        matches: Array<AnyMatch>,
        codeAssistType: CodeAssistType<AnyMatch>
      ) => {
        const transformationResults: Array<TransformationResult> =
          await this.convertMatchesToTransformationResults(
            matches,
            codeAssistType
          );

        codeAssists.push(
          ...transformationResults.map((result) => result.getBasicCodeAssist())
        );
      },
      (error) => {
        errors.push(error);
      }
    );

    return {
      codeAssists,
      errors,
    };
  }

  async getSuggestedCodeAssists(
    codeAssistTypes: Array<CodeAssistType<AnyMatch>>,
    cancellationToken: CancellationToken
  ): Promise<{
    codeAssists: Array<SuggestedCodeAssist>;
    errors: Array<unknown>;
  }> {
    // Retrieve cached suggestion code assists.
    // Suggestion code assists are cached (by type) to prevent calculating them multiple
    // time for the same source.
    const allCodeAssists = codeAssistTypes
      .filter((codeAssistType) =>
        this.suggestionCodeAssistsByType.has(codeAssistType)
      )
      .flatMap(
        (codeAssist) => this.suggestionCodeAssistsByType.get(codeAssist)!
      );

    // remaining code assists: search whole document & cache new results
    const errors: Array<unknown> = [];

    await this.codeAssistEngine.matchCodeAssists(
      codeAssistTypes.filter(
        (codeAssistType) =>
          !this.suggestionCodeAssistsByType.has(codeAssistType)
      ),
      async (
        matches: Array<AnyMatch>,
        codeAssistType: CodeAssistType<AnyMatch>
      ) => {
        const transformationResults: Array<TransformationResult> =
          await this.convertMatchesToTransformationResults(
            matches,
            codeAssistType
          );

        const codeAssists = transformationResults
          .map((result) => result.getSuggestedCodeAssist())
          .filter((result) => result != null) as Array<SuggestedCodeAssist>;

        this.suggestionCodeAssistsByType.set(codeAssistType, codeAssists);

        allCodeAssists.push(...codeAssists);
      },
      (error) => {
        errors.push(error);
      },
      cancellationToken
    );

    return {
      codeAssists: allCodeAssists,
      errors,
    };
  }

  async getFunctionElements(cancellationToken: CancellationToken): Promise<{
    functionElements: Array<FunctionElement>;
    errors: Array<unknown>;
  }> {
    const matcherEngine = this.codeAssistEngine.matcherEngine;

    interface FunctionCandidate
      extends Match<
        ts.FunctionDeclaration | ts.MethodDeclaration,
        {
          name: ts.Identifier;
          className: string | undefined;
          body: ts.Block;
        },
        {
          nodeCount: number;
        }
      > {}

    class FunctionMatcher extends PatternMatcher<FunctionCandidate> {
      candidates = {
        nodes: [
          ts.SyntaxKind.FunctionDeclaration,
          ts.SyntaxKind.MethodDeclaration,
        ],
      };

      createPattern() {
        const captures = {
          className: value<string | undefined>(),
          name: value<ts.Identifier>(),
          body: node<ts.Block>(),
        };

        return {
          match: or(
            methodDeclaration({
              name: identifier({
                constraints: [captures.name.record()],
              }),
              body: block({
                constraints: [captures.body.record()],
              }),
              parent: classDeclaration({
                name: identifier({
                  text: captures.className.record(),
                }),
              }),
            }),
            functionDeclaration({
              name: identifier({
                constraints: [captures.name.record()],
              }),
              body: block({
                constraints: [captures.body.record()],
              }),
            })
          ),
          captures,
        };
      }

      deriveMatchData(
        matchedNode: ts.FunctionDeclaration | ts.MethodDeclaration,
        captures: { name: ts.Identifier; body: ts.Block },
        context: Context
      ): { nodeCount: number } {
        let nodeCount = 0;
        visitSelfAndEachDescendant(captures.body, () => nodeCount++);

        return {
          nodeCount,
        };
      }
    }

    const matches = matcherEngine.findMatches(new FunctionMatcher());

    const functionElements = matches.map((match) => {
      const name = match.captures.name;
      const className = match.captures.className;

      return {
        id: getId(match.node)!,
        name:
          className != null
            ? // zero width space for breaking.
              // TODO expose className and move assembly into frontend
              `${className}.\u200B${name.text}`
            : name.text,
        start: match.node.getStart(),
        end: match.node.getEnd(),
        nameStart: name.getStart(),
        nameEnd: name.getEnd(),
        metrics: {
          size: match.data.nodeCount,
        },
      };
    });

    return {
      functionElements,
      errors: [],
    };
  }

  async getSelectionCodeAssists({
    absoluteRange,
    codeAssistTypes,
    minimumLevel,
    codeActionKindPrefix,
    onlyFirstMatch,
  }: {
    absoluteRange: Range;
    codeAssistTypes: Array<CodeAssistType<AnyMatch>>;
    minimumLevel?: CodeAssistLevel.CodeAssistLevel;
    codeActionKindPrefix?: string;
    onlyFirstMatch?: boolean;
  }): Promise<Array<CodeAssist>> {
    const relativeRange = this.convertToRelativeRange(absoluteRange);
    const context = this.codeAssistEngine.createContext(relativeRange);

    // Trim potential surround whitespace from the range to broaden node
    // selection. Finally position and range matching happens in the
    // code assist matching and in the action zones.
    const trimmedRange = trimWhitespaceFromSelection(
      this.sourceFile.getFullText(),
      relativeRange
    );

    const nodePath = findNodesContainingRange(
      trimmedRange.start,
      trimmedRange.end,
      this.codeAssistEngine.sourceFile
    );

    const selectionCodeAssists = [];

    // keep track of code action kinds by code assist type:
    const codeAssistCodeActionKinds = new Map<
      CodeAssistType<AnyMatch>,
      {
        relevantIndicesCount: number;
        usedIndices: Set<number>;
      }
    >();

    for (const codeAssistType of codeAssistTypes) {
      codeAssistCodeActionKinds.set(codeAssistType, {
        usedIndices: new Set<number>(),
        // limit to actually needed code action kinds
        // (performance optimization to abort search early):
        relevantIndicesCount:
          codeActionKindPrefix != null
            ? codeAssistType.codeActionKinds.filter((codeActionKind) =>
                codeActionKind.startsWith(codeActionKindPrefix)
              ).length
            : codeAssistType.codeActionKinds.length,
      });
    }

    // loop over nodes from leaf to root in outer loop to ensure that blocked zones work correctly:
    for (let i = nodePath.length - 1; i >= 0; i--) {
      for (const codeAssistType of codeAssistTypes) {
        const codeActionKindData =
          codeAssistCodeActionKinds.get(codeAssistType)!;

        // ignore code assists for which all relevant code actions have been computed:
        if (
          codeActionKindData.usedIndices.size >=
          codeActionKindData.relevantIndicesCount
        ) {
          continue;
        }

        const nodeCandidates = [
          nodePath[i],
          ...(codeAssistType.getCandidateChildren(nodePath[i]) ?? []),
        ];

        for (const node of nodeCandidates) {
          const match = codeAssistType.matcher.matchPattern(node, context);

          if (match == null) {
            continue;
          }

          const transformationResults = this.createTransformationResults(
            codeAssistType,
            match
          );

          this.storeTransformationResults(transformationResults);

          for (const transformationResult of transformationResults) {
            const actionZones = transformationResult.actionZones.filter(
              (zone) =>
                // range filter:
                zone.range.containsRange(trimmedRange) &&
                // code assist level filter:
                (minimumLevel == null || zone.level >= minimumLevel) &&
                // code action prefix filter:
                (codeActionKindPrefix == null ||
                  codeAssistType
                    .getCodeActionKind(zone.codeActionKindIndex)
                    .startsWith(codeActionKindPrefix))
            );

            // guarantee that zone with the highest level is prioritized:
            actionZones.sort((zoneA, zoneB) => zoneB.level - zoneA.level);

            const actionZone = actionZones[0];

            if (
              actionZone == null ||
              codeActionKindData.usedIndices.has(actionZone.codeActionKindIndex)
            ) {
              continue;
            }

            selectionCodeAssists.push(
              transformationResult.getSelectionCodeAssist(actionZone)
            );

            if (onlyFirstMatch) {
              return selectionCodeAssists;
            }

            codeActionKindData.usedIndices.add(actionZone.codeActionKindIndex);
          }

          // when only returning first match, check the blocked zones:
          if (
            onlyFirstMatch &&
            codeAssistType
              .getBlockedZones(match)
              .filter(
                (zone) =>
                  zone.range.containsRange(trimmedRange) &&
                  (codeActionKindPrefix == null ||
                    codeAssistType
                      .getCodeActionKind(zone.codeActionKindIndex)
                      .startsWith(codeActionKindPrefix))
              ).length > 0
          ) {
            return [];
          }
        }
      }
    }

    return selectionCodeAssists;
  }

  private createTransformationResults(
    codeAssistType: CodeAssistType<AnyMatch>,
    match: AnyMatch
  ): Array<TransformationResult> {
    return codeAssistType
      .getTransformations(match)
      .map(
        (transformation) =>
          new TransformationResult(this, codeAssistType, match, transformation)
      );
  }
}
