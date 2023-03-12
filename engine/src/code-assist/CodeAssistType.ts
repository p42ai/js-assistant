import ts from "typescript";
import { AnyMatch } from "../matcher/engine/Match";
import { PatternMatcher } from "../matcher/engine/PatternMatcher";
import { Language } from "../parser/file-type/Language";
import { BlockedZone } from "../transformation/BlockedZone";
import { Transformation } from "../transformation/Transformation";
import {
  CodeAssistMetadata,
  getMetadataCodeActionKinds,
} from "./CodeAssistMetadata";

export abstract class CodeAssistType<PATTERN extends AnyMatch> {
  readonly codeActionKinds: Array<string>;

  constructor(
    readonly metadata: CodeAssistMetadata,
    readonly matcher: PatternMatcher<PATTERN>,
    readonly transformations: Array<Transformation<PATTERN>>
  ) {
    this.codeActionKinds = getMetadataCodeActionKinds(metadata);
  }

  get id() {
    return this.metadata.id;
  }

  get title() {
    return this.metadata.documentation.title;
  }

  get categoryDescription() {
    const ecmaScriptVersion = this.metadata.platform.ecmaScript ?? "";

    if (this.metadata.isModernization && ecmaScriptVersion != null) {
      return `${ecmaScriptVersion} Modernization`;
    }

    return "Refactoring";
  }

  /**
   * @returns When `true`, this code assist produces suggested changes. Code assists
   *          that produce suggestions can be run in bulk, on pull request, and
   *          as diagnostics.
   *          When `false`, this code assist should only be computed and shown on demand,
   *          e.g. when the cursor is on a triggering element in the users editor.
   */
  get producesSuggestions(): boolean {
    return this.metadata.suggestions?.available ?? false;
  }

  get supportedLanguages() {
    return this.metadata.platform.languages;
  }

  /**
   * Returns child nodes that are candidates for matching. This is needed when
   * calculating matches for a specific position and the code assist has
   * activation zones on different nodes that are siblings (e.g. merge
   * declaration and initialization). When undefined, there are
   * no potential child node candidates, or this resolution is not needed,
   * because the target node would have been matched already.
   */
  getCandidateChildren(parent: ts.Node): undefined | Iterable<ts.Node> {
    return undefined;
  }

  getCodeActionKind(index: number) {
    if (index >= this.codeActionKinds.length) {
      throw new Error(`invalid code action kind index ${index}`);
    }
    return this.codeActionKinds[index];
  }

  isCodeActionKindPrefixSupported(prefix: string) {
    return this.metadata.visualStudioCode.codeActionKinds.some(
      (codeActionKind) => codeActionKind.startsWith(prefix)
    );
  }

  isLanguageSupported(language: Language): boolean {
    return this.supportedLanguages.includes(language);
  }

  /**
   * Returns `true` when the code assist is enabled. From metadata.
   */
  isEnabled(): boolean {
    return this.metadata.isEnabled ?? true;
  }

  /**
   * Returns the possible transformations for this match. The result is ordered and the
   * first transformation (if any) is the default that is applied in e.g. mass refactoring.
   */
  getTransformations(match: PATTERN): Array<Transformation<PATTERN>> {
    return this.transformations.filter((transformation) =>
      transformation.isApplicable(match)
    );
  }

  getBlockedZones(match: PATTERN): Array<BlockedZone> {
    const blockedZones: Array<BlockedZone> = [];

    const rejectedTransformations = this.transformations.filter(
      (transformation) => !transformation.isApplicable(match)
    );

    for (const rejectedTransformation of rejectedTransformations) {
      const transformationsBlockedZones =
        rejectedTransformation.getBlockedZones(match);

      if (transformationsBlockedZones != null) {
        blockedZones.push(...transformationsBlockedZones);
      }
    }

    return blockedZones;
  }
}
