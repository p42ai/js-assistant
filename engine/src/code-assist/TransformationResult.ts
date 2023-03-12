import ts from "typescript";
import { AnyMatch } from "../matcher/engine/Match";
import { ActionZone } from "../transformation/ActionZone";
import * as EditorOperation from "../transformation/editor-operation/index";
import { InteractiveInput } from "../transformation/InteractiveInput";
import { Safety } from "../transformation/safety/Safety";
import { Suggestion } from "../transformation/Suggestion";
import { Transformation } from "../transformation/Transformation";
import { TransformedNodeTree } from "../transformation/TransformedNodeTree.generated";
import { CodeAssist, SuggestedCodeAssist } from "./CodeAssist";
import { CodeAssistAction } from "./CodeAssistAction";
import { generateCodeAssistId } from "./CodeAssistId";
import * as CodeAssistLevel from "./CodeAssistLevel";
import { CodeAssistType } from "./CodeAssistType";
import { createEditorActions } from "./editor-action/createEditorActions";
import { EmbeddedSource } from "./EmbeddedSource";

export class TransformationResult {
  readonly id: string;
  readonly actionZones: Array<ActionZone>;
  readonly suggestion: Suggestion | null;
  readonly safety: Safety;

  constructor(
    readonly embeddedSource: EmbeddedSource,
    readonly codeAssistType: CodeAssistType<AnyMatch>,
    readonly match: AnyMatch,
    readonly transformation: Transformation<AnyMatch>
  ) {
    this.id = generateCodeAssistId(
      embeddedSource,
      codeAssistType,
      match.node,
      transformation
    );
    this.safety = transformation.analyzeSafety(match);
    this.suggestion = transformation.getSuggestion(match, this.safety);
    this.actionZones = transformation.getActionZones(
      match,
      this.suggestion != null
    );
  }

  // for test purposes
  get blockedZones() {
    return this.codeAssistType.getBlockedZones(this.match)?.map((zone) => ({
      range: zone.range,
      kind: this.codeAssistType.getCodeActionKind(zone.codeActionKindIndex),
    }));
  }

  getBasicCodeAssist(): CodeAssist {
    const firstActionZone = this.actionZones[0];

    return {
      id: this.id,
      type: this.codeAssistType,
      safety: this.safety,
      label: firstActionZone.label,
      kind: this.codeAssistType.getCodeActionKind(
        firstActionZone.codeActionKindIndex
      ),
      level: firstActionZone.level,
    };
  }

  getSuggestedCodeAssist(): SuggestedCodeAssist | undefined {
    if (this.suggestion == null) {
      return undefined;
    }

    const firstSuggestionZone = this.actionZones.find(
      (zone) => zone.level === CodeAssistLevel.Suggestion
    );

    if (firstSuggestionZone == null) {
      throw new Error(`no suggestion zone for code assist ${this.id}`);
    }

    const primaryRange = firstSuggestionZone.range;

    return {
      id: this.id,
      label: firstSuggestionZone.label,
      shortActionLabel: this.suggestion.shortActionLabel,
      kind: this.codeAssistType.getCodeActionKind(
        firstSuggestionZone.codeActionKindIndex
      ),
      level: CodeAssistLevel.Suggestion,
      type: this.codeAssistType,
      description: this.suggestion.description,
      safety: this.safety,
      suggestionRanges: this.actionZones
        .filter((zone) => zone.level === CodeAssistLevel.Suggestion)
        .map((zone) => zone.range.move(this.embeddedSource.offset)),
      highlightRanges: this.suggestion.highlightRanges.map((range) =>
        range.move(this.embeddedSource.rangeInDocument.start)
      ),
      primaryLineCharacterRange: {
        start: this.embeddedSource.getLineAndCharacter(primaryRange.start),
        end: this.embeddedSource.getLineAndCharacter(primaryRange.end),
      },
    };
  }

  getSelectionCodeAssist(zone: ActionZone): CodeAssist {
    return {
      id: this.id,
      type: this.codeAssistType,
      safety: this.safety,
      label: zone.label,
      level: zone.level,
      kind: this.codeAssistType.getCodeActionKind(zone.codeActionKindIndex),
    };
  }

  getImpactNodes(): Array<ts.Node> {
    return this.transformation.getImpactedNodes(this.match);
  }

  async createCodeAssistAction({
    interactiveInput,
  }: {
    interactiveInput: InteractiveInput | undefined;
  }): Promise<CodeAssistAction> {
    const { edit, postEditOperations } =
      await this.embeddedSource.codeAssistEngine.createSingleInteractiveEdit({
        transformation: this.transformation,
        match: this.match,
        interactiveInput,
      });

    if (postEditOperations == null) {
      return {
        edit: this.embeddedSource.convertEditToAbsoluteRange(edit),
      };
    }

    // when there are post edit operations, apply the edit
    // and parse the post-edit embedded source
    const postEditContent =
      edit == null
        ? this.embeddedSource.content
        : edit.applyTo(this.embeddedSource.content);

    // TODO incremental parsing, store as future version
    const sourceFile = ts.createSourceFile(
      this.embeddedSource.path,
      postEditContent,
      this.embeddedSource.languageVersion,
      true,
      this.embeddedSource.scriptKind
    );

    return {
      edit: this.embeddedSource.convertEditToAbsoluteRange(edit),
      postEditActions: createEditorActions(
        postEditOperations,
        sourceFile,
        this.embeddedSource.offset
      ),
    };
  }

  apply({
    tree,
    interactiveInput,
  }: {
    interactiveInput?: InteractiveInput | undefined;
    tree: TransformedNodeTree;
  }): Promise<Array<EditorOperation.EditorOperation> | void> {
    return this.transformation.apply(this.match, tree, interactiveInput);
  }
}
