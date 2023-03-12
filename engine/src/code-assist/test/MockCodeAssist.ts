import ts from "typescript";
import { findNodeById } from "../../ast/findNodeById";
import { getId } from "../../ast/getId";
import * as NodeRange from "../../ast/NodeRange";
import { Match } from "../../matcher/engine/Match";
import { PatternMatcher } from "../../matcher/engine/PatternMatcher";
import { Language } from "../../parser/file-type/Language";
import { ActionZone, createActionZones } from "../../transformation/ActionZone";
import { BlockedZone } from "../../transformation/BlockedZone";
import { Safety } from "../../transformation/safety/Safety";
import { SafetyLevel } from "../../transformation/safety/SafetyLevel";
import { Suggestion } from "../../transformation/Suggestion";
import { Transformation } from "../../transformation/Transformation";
import { TransformedNodeTree } from "../../transformation/TransformedNodeTree.generated";
import * as CodeAssistLevel from "../CodeAssistLevel";
import { CodeAssistType } from "../CodeAssistType";

interface MockMatch extends Match<ts.Node, any, any> {}

export class MockMatcher extends PatternMatcher<MockMatch> {
  constructor(readonly matchedNodeIds: Array<string>) {
    super();
  }

  createPattern() {
    return {
      match: (node: ts.Node) => {
        const id = getId(node);
        return id != null && this.matchedNodeIds.includes(id);
      },
      captures: {},
    };
  }
}

export class MockTransformation extends Transformation<MockMatch> {
  private readonly isApplicableValue: boolean;
  private readonly isSuggestionValue: boolean;
  private readonly safetyLevel: SafetyLevel;

  // matched node id => impact node ids
  private readonly impactNodes: Map<string, Array<string>> | undefined;

  // matched node id => action zones
  private readonly actionZones: Map<string, Array<ActionZone>> | undefined;

  // matched node id => blocked
  private readonly blockedZones: Map<string, Array<BlockedZone>> | undefined;

  constructor({
    id,
    isApplicable = true,
    isSuggestion = false,
    safetyLevel = "UNKNOWN",
    impactNodes,
    actionZones,
    blockedZones,
  }: {
    id?: string;
    isApplicable?: boolean;
    isSuggestion?: boolean;
    safetyLevel?: SafetyLevel;
    impactNodes?: Map<string, Array<string>>;
    actionZones?: Map<string, Array<ActionZone>>;
    blockedZones?: Map<string, Array<BlockedZone>>;
  } = {}) {
    super(id);

    this.isApplicableValue = isApplicable;
    this.isSuggestionValue = isSuggestion;
    this.safetyLevel = safetyLevel;
    this.impactNodes = impactNodes;
    this.actionZones = actionZones;
    this.blockedZones = blockedZones;
  }

  async apply(match: MockMatch, tree: TransformedNodeTree) {
    // noop
  }

  getImpactedNodes(match: MockMatch): Array<ts.Node> {
    const impactedNodeIds = this.impactNodes?.get(getId(match.node)!);

    if (impactedNodeIds == null) {
      return super.getImpactedNodes(match);
    }

    return impactedNodeIds.flatMap(
      (nodeId) => findNodeById(match.node.getSourceFile(), nodeId) ?? []
    );
  }

  isApplicable(match: MockMatch): boolean {
    return this.isApplicableValue;
  }

  getSuggestion(match: MockMatch, safety: Safety): Suggestion | null {
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
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(match: MockMatch, isSuggestion: boolean): ActionZone[] {
    if (this.actionZones?.has(getId(match.node)!)) {
      return this.actionZones.get(getId(match.node)!)!;
    }

    return createActionZones(
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
    );
  }

  getBlockedZones(match: MockMatch): BlockedZone[] | null {
    return this.blockedZones?.get(getId(match.node)!) ?? null;
  }

  analyzeSafety(match: MockMatch): Safety {
    return new Safety(
      this.safetyLevel,
      this.safetyLevel !== "UNKNOWN" ? `safety-${getId(match.node)}` : undefined
    );
  }
}

export class MockCodeAssist extends CodeAssistType<MockMatch> {
  constructor({
    id = "mock",
    languages = ["JAVASCRIPT", "TYPESCRIPT"],
    matcher = new MockMatcher([]),
    transformations = [new MockTransformation()],
    codeActionKinds = ["mock-kind-1"],
  }: {
    id?: string;
    languages?: Array<Language>;
    matcher?: MockMatcher;
    transformations?: Array<MockTransformation>;
    codeActionKinds?: Array<string>;
  } = {}) {
    super(
      {
        id,
        platform: {
          languages,
        },
        visualStudioCode: {
          codeActionKinds,
        },
        documentation: {
          title: "mock",
          categories: ["core"],
          shortDescription: "mock code assist",
          references: undefined,
        },
      },
      matcher,
      transformations
    );
  }
}
