import ts from "typescript";
import { getId } from "../../ast/getId";
import * as NodeRange from "../../ast/NodeRange";
import { ast } from "../../matcher";
import { Match } from "../../matcher/engine/Match";
import { PatternMatcher } from "../../matcher/engine/PatternMatcher";
import { Language } from "../../parser/file-type/Language";
import { ActionZone, createActionZones } from "../../transformation/ActionZone";
import { Safety } from "../../transformation/safety/Safety";
import { SafetyLevel } from "../../transformation/safety/SafetyLevel";
import { Suggestion } from "../../transformation/Suggestion";
import { Transformation } from "../../transformation/Transformation";
import { TransformedNodeTree } from "../../transformation/TransformedNodeTree.generated";
import { Range } from "../../util/text/Range";
import * as CodeAssistLevel from "../CodeAssistLevel";
import { CodeAssistType } from "../CodeAssistType";

interface IdentifierMatch extends Match<ts.Identifier, any, any> {}

export class IdentifierMatcher extends PatternMatcher<IdentifierMatch> {
  constructor() {
    super();
  }

  createPattern() {
    return {
      match: ast.identifier({
        text: (value: string) => value !== "replacement",
      }),
      captures: {},
    };
  }
}

export class IdentifierTransformation extends Transformation<IdentifierMatch> {
  private readonly isApplicableValue: boolean;
  private readonly isSuggestionValue: boolean;
  private readonly safetyLevel: SafetyLevel;
  private readonly replacementText: string;
  private readonly nodeHighlightRanges: { [key: string]: Array<Range> };
  private readonly nodeActionZones: {
    [key: string]: (node: ts.Node) => Array<ActionZone>;
  };

  constructor({
    id,
    isApplicable = true,
    isSuggestion = false,
    safetyLevel = "UNKNOWN",
    replacementText = "replacement",
    nodeHighlightRanges = {},
    nodeActionZones = {},
  }: {
    id?: string;
    isApplicable?: boolean;
    isSuggestion?: boolean;
    safetyLevel?: SafetyLevel;
    replacementText?: string;
    nodeHighlightRanges?: { [key: string]: Array<Range> };
    nodeActionZones?: {
      [key: string]: (node: ts.Node) => Array<ActionZone>;
    };
  } = {}) {
    super(id);

    this.isApplicableValue = isApplicable;
    this.isSuggestionValue = isSuggestion;
    this.safetyLevel = safetyLevel;
    this.replacementText = replacementText;
    this.nodeActionZones = nodeActionZones;
    this.nodeHighlightRanges = nodeHighlightRanges;
  }

  async apply(match: IdentifierMatch, tree: TransformedNodeTree) {
    tree.replace(
      match.node,
      tree.createIdentifier({
        text: this.replacementText,
      })
    );
  }

  isApplicable(match: IdentifierMatch): boolean {
    return this.isApplicableValue;
  }

  getSuggestion(match: IdentifierMatch, safety: Safety): Suggestion | null {
    if (this.isSuggestionValue === false) {
      return null;
    }

    const description = `description:${match.node.text}${
      match.context.selectedRange != null
        ? `:range-${match.context.selectedRange}`
        : ""
    }`;

    return {
      description,
      highlightRanges: this.nodeHighlightRanges[getId(match.node)!] ?? [
        NodeRange.node(match.node),
      ],
    };
  }

  analyzeSafety(match: IdentifierMatch): Safety {
    return new Safety(
      this.safetyLevel,
      this.safetyLevel !== "UNKNOWN" ? `safety-${match.node.text}` : undefined
    );
  }

  getActionZones(match: IdentifierMatch, isSuggestion: boolean): ActionZone[] {
    return (
      this.nodeActionZones[getId(match.node)!]?.(match.node) ??
      createActionZones(
        `label:${match.node.text}${
          match.context.selectedRange != null
            ? `:range-${match.context.selectedRange}`
            : ""
        }`,
        [
          {
            range: NodeRange.node(match.node),
            level: isSuggestion
              ? CodeAssistLevel.Suggestion
              : CodeAssistLevel.QuickFix,
          },
        ]
      )
    );
  }
}

export class IdentifierCodeAssist extends CodeAssistType<IdentifierMatch> {
  private getCandidateChildrenFunction?: (
    parent: ts.Node
  ) => undefined | Iterable<ts.Node>;

  constructor({
    id = "identifier",
    languages = ["JAVASCRIPT", "TYPESCRIPT"],
    matcher = new IdentifierMatcher(),
    transformations = [new IdentifierTransformation()],
    getCandidateChildrenFunction,
  }: {
    id?: string;
    languages?: Array<Language>;
    matcher?: IdentifierMatcher;
    transformations?: Array<IdentifierTransformation>;
    getCandidateChildrenFunction?: (
      parent: ts.Node
    ) => undefined | Iterable<ts.Node>;
  } = {}) {
    super(
      {
        id,
        platform: {
          languages,
        },
        visualStudioCode: {
          codeActionKinds: ["identifier"],
        },
        documentation: {
          title: "identifier",
          categories: ["core"],
          shortDescription: "identifier code assist",
          references: undefined,
        },
      },
      matcher,
      transformations
    );

    this.getCandidateChildrenFunction = getCandidateChildrenFunction;
  }

  getCandidateChildren(parent: ts.Node): Iterable<ts.Node> | undefined {
    return this.getCandidateChildrenFunction?.(parent);
  }
}
