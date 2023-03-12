import ts from "typescript";
import { getId } from "../../ast/getId";
import * as NodeRange from "../../ast/NodeRange";
import { ast } from "../../matcher";
import { Match } from "../../matcher/engine/Match";
import { PatternMatcher } from "../../matcher/engine/PatternMatcher";
import { Language } from "../../parser/file-type/Language";
import { ActionZone, createActionZones } from "../../transformation/ActionZone";
import { EditorOperation } from "../../transformation/editor-operation/index";
import { Safety } from "../../transformation/safety/Safety";
import { SafetyLevel } from "../../transformation/safety/SafetyLevel";
import { Suggestion } from "../../transformation/Suggestion";
import { Transformation } from "../../transformation/Transformation";
import { TransformedNodeTree } from "../../transformation/TransformedNodeTree.generated";
import { Range } from "../../util/text/Range";
import * as CodeAssistLevel from "../CodeAssistLevel";
import { CodeAssistType } from "../CodeAssistType";

interface BlockMatch extends Match<ts.Block, any, any> {}

class BlockMatcher extends PatternMatcher<BlockMatch> {
  createPattern() {
    return {
      match: ast.block(),
      captures: {},
    };
  }
}

export class BlockTransformation extends Transformation<BlockMatch> {
  private readonly isApplicableValue: boolean;
  private readonly isSuggestionValue: boolean;
  private readonly safetyLevel: SafetyLevel;
  private readonly nodeHighlightRanges: { [key: string]: Array<Range> };
  private readonly nodeActionZones: {
    [key: string]: (node: ts.Node) => Array<ActionZone>;
  };

  constructor({
    id,
    isApplicable = true,
    isSuggestion = false,
    safetyLevel = "UNKNOWN",
    nodeHighlightRanges = {},
    nodeActionZones = {},
  }: {
    id?: string;
    isApplicable?: boolean;
    isSuggestion?: boolean;
    safetyLevel?: SafetyLevel;
    nodeHighlightRanges?: { [key: string]: Array<Range> };
    nodeActionZones?: {
      [key: string]: (node: ts.Node) => Array<ActionZone>;
    };
  } = {}) {
    super(id);

    this.isApplicableValue = isApplicable;
    this.isSuggestionValue = isSuggestion;
    this.safetyLevel = safetyLevel;
    this.nodeActionZones = nodeActionZones;
    this.nodeHighlightRanges = nodeHighlightRanges;
  }

  async apply(match: BlockMatch, tree: TransformedNodeTree) {
    tree.insertStatement(
      match.node,
      tree.createExpressionStatement({
        expression: tree.createIdentifier({
          text: "inserted",
        }),
      }),
      0
    );
  }

  isApplicable(match: BlockMatch): boolean {
    return this.isApplicableValue;
  }

  getSuggestion(match: BlockMatch, safety: Safety): Suggestion | null {
    if (this.isSuggestionValue === false) {
      return null;
    }

    const description = `description:${getId(match.node)}${
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

  analyzeSafety(match: BlockMatch): Safety {
    return new Safety(
      this.safetyLevel,
      this.safetyLevel !== "UNKNOWN" ? `safety-${getId(match.node)}` : undefined
    );
  }

  getActionZones(match: BlockMatch, isSuggestion: boolean): ActionZone[] {
    return (
      this.nodeActionZones[getId(match.node)!]?.(match.node) ??
      createActionZones(
        `label:${getId(match.node)}${
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

export class BlockCodeAssist extends CodeAssistType<BlockMatch> {
  constructor({
    id = "block",
    languages = ["JAVASCRIPT", "TYPESCRIPT"],
    transformations = [new BlockTransformation()],
  }: {
    id?: string;
    languages?: Array<Language>;
    transformations?: Array<BlockTransformation>;
  } = {}) {
    super(
      {
        id,
        platform: {
          languages,
        },
        visualStudioCode: {
          codeActionKinds: ["block"],
        },
        documentation: {
          title: "block",
          categories: ["core"],
          shortDescription: "block code assist",
          references: undefined,
        },
      },
      new BlockMatcher(),
      transformations
    );
  }
}
