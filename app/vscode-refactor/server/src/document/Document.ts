import { CODE_ASSIST_COMMAND_ID } from "@p42/app-vscode-shared/build/code-assist/CodeAssistCommand";
import {
  serializeCodeAssist,
  SerializedCodeAssist,
} from "@p42/app-vscode-shared/build/code-assist/SerializedCodeAssist";
import {
  SerializedSuggestionCodeAssist,
  serializeSuggestionCodeAssist,
} from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import { Configuration } from "@p42/app-vscode-shared/build/configuration/Configuration";
import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { PerformanceLogger } from "@p42/app-vscode-shared/build/logger/PerformanceLogger";
import { SafetyAnalysisVisibility } from "@p42/app-vscode-shared/src/configuration/vscode/P42VscodeSettings";
import * as p42 from "@p42/engine";
import ts from "typescript";
import {
  CodeAction,
  CodeActionContext,
  CodeActionKind,
  Diagnostic,
  Range,
} from "vscode-languageserver";
import { TextDocumentContent } from "../content/TextDocumentContent";
import { convertToDocumentRange } from "../util/convertToDocumentRange";
import { convertToOffsetRange } from "../util/convertToOffsetRange";
import { sortCodeActions } from "./sortCodeActions";

const P42_DIAGNOSTIC_SOURCE = "p42";

const DIRECT_MOVE_CODE_ACTION_KINDS = [
  "refactor.move.up",
  "refactor.move.down",
];

/**
 * VS Code specific wrapper around SourceDocument. Offers VS Code specific capabilities
 * for a single editor document and configuration.
 *
 * Responsibilities:
 * - diagnostics
 * - suggestions (serialized)
 * - code actions
 */
export class Document {
  sourceDocument: p42.SourceDocument | undefined;

  constructor(
    private readonly relativePath: string,
    readonly content: TextDocumentContent,
    private readonly configuration: Configuration,
    private readonly logger: Logger,
    readonly performanceLogger: PerformanceLogger,
    readonly cancellationToken: p42.CancellationToken
  ) {}

  get uri() {
    return this.content.document.uri;
  }

  async initializeSourceDocument(
    sourceDocumentFactory: p42.SourceDocumentFactory
  ) {
    this.sourceDocument = await sourceDocumentFactory.createSourceDocument({
      content: this.content,
      handleAugmentationError: (
        augmentation: p42.Augmentation<any>,
        node: ts.Node,
        error: any
      ) => {
        this.logger.error({
          path: this.relativePath,
          message: `augmentation '${augmentation.id}', node '${p42.getId(
            node
          )}'`,
          error,
        });
      },
      performanceRecorder: this.performanceLogger,
      cancellationToken: this.cancellationToken,
    });
  }

  private getCodeAssistTypeIds(
    filter: (codeAssistType: p42.CodeAssistType<p42.AnyMatch>) => boolean
  ): Array<string> {
    return this.sourceDocument!.codeAssistTypes.filter(filter).map(
      (codeAssistType) => codeAssistType.id
    );
  }

  private logErrors(errors: Array<unknown>) {
    for (const error of errors) {
      this.logger.error({
        path: this.relativePath,
        message: "error querying suggestions",
        error,
      });
    }
  }

  private async getSuggestions(): Promise<
    Array<p42.SuggestedCodeAssist> | undefined
  > {
    if (this.sourceDocument == null) {
      return undefined;
    }

    const { codeAssists, errors } =
      await this.sourceDocument.getSuggestedCodeAssists({
        codeAssistTypeIds: this.getCodeAssistTypeIds((codeAssistType) =>
          this.configuration.areSuggestionsAvailable(codeAssistType)
        ),
        cancellationToken: this.cancellationToken,
      });

    this.logErrors(errors);

    return this.configuration.areUnsafeSuggestionsEnabled()
      ? codeAssists
      : codeAssists.filter((codeAssist) => codeAssist.safety.isSafe());
  }

  async getSerializedSuggestions(): Promise<
    Array<SerializedSuggestionCodeAssist> | undefined
  > {
    return (await this.getSuggestions())?.map(serializeSuggestionCodeAssist);
  }

  async getFunctionElements(): Promise<Array<p42.FunctionElement> | undefined> {
    if (this.sourceDocument == null) {
      return undefined;
    }

    const { functionElements, errors } =
      await this.sourceDocument.getFunctionElements({
        cancellationToken: this.cancellationToken,
      });

    this.logErrors(errors);

    return functionElements;
  }

  private async getCodeAssists(
    selection: Range
  ): Promise<Array<p42.CodeAssist> | undefined> {
    if (this.sourceDocument == null) {
      return undefined;
    }

    const { codeAssists, errors } =
      await this.sourceDocument.getSelectionCodeAssists({
        codeAssistTypeIds: this.getCodeAssistTypeIds((codeAssistType) =>
          this.configuration.isCodeAssistEnabled(codeAssistType)
        ),
        range: convertToOffsetRange(selection, this.content.document),
      });

    this.logErrors(errors);

    return codeAssists;
  }

  async getCodeAssistAction(parameters: {
    codeAssistId: string;
    interactiveInput: p42.InteractiveInput;
  }): Promise<p42.CodeAssistAction | undefined> {
    return this.sourceDocument?.getCodeAssistAction(parameters);
  }

  async getCodeAssistDiff({
    codeAssistId,
    contextLines,
  }: {
    codeAssistId: string;
    contextLines?: number | undefined;
  }) {
    return this.sourceDocument?.getDiff({
      codeAssistId,
      contextLines,
      interactiveInput: undefined,
    });
  }

  async getSerializedCodeAssists(
    selection: Range
  ): Promise<Array<SerializedCodeAssist> | undefined> {
    return (await this.getCodeAssists(selection))?.map(serializeCodeAssist);
  }

  // TODO cancellation token
  async calculateDiagnostics(): Promise<Array<Diagnostic>> {
    if (this.sourceDocument == null) {
      throw new Error(`source document for ${this.relativePath} is not ready`);
    }

    const suggestions = await this.getSuggestions();

    return suggestions!.flatMap((codeAssist) => {
      // TODO cache by type?
      const severity = this.configuration.getDiagnosticSeverity(
        codeAssist.type.id
      );

      if (severity == null) {
        return [];
      }

      const message = codeAssist.safety.isUnknown()
        ? codeAssist.description
        : `${codeAssist.description}\n${codeAssist.safety.iconAndMessage}`;

      // TODO use routes object from web (move to lib pkg)
      const documentationUrl = `https://p42.ai/documentation/code-assist/${codeAssist.type.id}`;

      return codeAssist.suggestionRanges.map((suggestionRange) => ({
        range: convertToDocumentRange(suggestionRange, this.content.document),
        message,
        severity,
        // documentation reference:
        source: P42_DIAGNOSTIC_SOURCE,
        code: codeAssist.type.id,
        codeDescription: {
          href: documentationUrl,
        },
        // store information for the code action creation
        data: codeAssist.id,
      }));
    });
  }

  private getSuggestionCodeActions(
    p42Diagnostics: Array<Diagnostic>
  ): Array<CodeAction> {
    return p42Diagnostics.flatMap((diagnostic) => {
      const codeAssistId = diagnostic.data as string;
      try {
        const codeAssist =
          this.sourceDocument!.getSuggestionCodeAssist(codeAssistId);

        if (codeAssist == null) {
          this.logger.error({
            path: this.relativePath,
            message: `no code assist with id '${codeAssistId}' found`,
          });
          return [];
        }

        return createCodeAction({
          codeAssist,
          kind: CodeActionKind.QuickFix,
          requestedKinds: undefined,
          isPreferred: true,
          diagnostic,
          safetyAnalysisVisibility:
            this.configuration.getSafetyAnalysisVisibility(),
        });
      } catch (error) {
        this.logger.error({
          path: this.relativePath,
          message: `getting code assist with id '${codeAssistId}' failed`,
          error,
        });
        return [];
      }
    });
  }

  async provideCodeActions(
    range: Range,
    context: CodeActionContext
  ): Promise<Array<CodeAction> | undefined> {
    return this.performanceLogger.runAsync(
      "provideCodeActions",
      "overview",
      async () => {
        try {
          if (this.sourceDocument == null) {
            return undefined;
          }

          const requestedCodeActionKind = getRequestedCodeActionKind(context);

          const p42Diagnostics = context.diagnostics.filter(
            (diagnostic) => diagnostic.source === P42_DIAGNOSTIC_SOURCE
          );

          // This happens when a popover for warnings, hints etc. is shown.
          // Excluded from analytics recording.
          if (requestedCodeActionKind === CodeActionKind.QuickFix) {
            return sortCodeActions(
              this.getSuggestionCodeActions(p42Diagnostics)
            );
          }

          const diagnosticsByCodeAssistId = new Map<string, Diagnostic>();
          for (const diagnostic of p42Diagnostics) {
            diagnosticsByCodeAssistId.set(
              diagnostic.data as string,
              diagnostic
            );
          }

          const { codeAssists, errors } =
            await this.sourceDocument.getSelectionCodeAssists({
              range: convertToOffsetRange(range, this.content.document),
              codeAssistTypeIds: this.getCodeAssistTypeIds(
                (codeAssistType) =>
                  this.configuration.isCodeAssistEnabled(codeAssistType) &&
                  (isCursorMovementCodeActionRequested(
                    requestedCodeActionKind
                  ) ||
                    isCodeActionKindRequested(
                      codeAssistType,
                      requestedCodeActionKind
                    ))
              ),
              minimumLevel: isCursorMovementCodeActionRequested(
                requestedCodeActionKind
              )
                ? p42.CodeAssistLevel.QuickFix
                : undefined,
              codeActionKindPrefix: requestedCodeActionKind,

              // For direct move keyboard actions, only a single result should be return to not
              // show a context menu. This filtering solution was chosen over a dedicated command
              // to be able to show the keyboard shorts for move up/down/left/right in the
              // higher-level move context menu on Mac OS:
              onlyFirstMatch:
                requestedCodeActionKind != null &&
                DIRECT_MOVE_CODE_ACTION_KINDS.includes(requestedCodeActionKind),
            });

          this.logErrors(errors);

          const codeActions = sortCodeActions(
            codeAssists.map((codeAssist) => {
              const diagnostic = diagnosticsByCodeAssistId.get(codeAssist.id);

              return createCodeAction({
                codeAssist,
                // Show as quick fix if it's a suggestion and a quick fix is requested
                // (so it's on top of the code action context menu):
                kind:
                  isCursorMovementCodeActionRequested(
                    requestedCodeActionKind
                  ) &&
                  codeAssist.level === p42.CodeAssistLevel.Suggestion &&
                  this.configuration.areSuggestionsAvailable(codeAssist.type)
                    ? CodeActionKind.QuickFix
                    : codeAssist.kind,
                requestedKinds: context.only,
                diagnostic,
                isPreferred: p42.CodeAssistLevel.isPreferred(codeAssist.level),
                safetyAnalysisVisibility:
                  this.configuration.getSafetyAnalysisVisibility(),
              });
            })
          );

          return codeActions;
        } catch (error: any) {
          this.logger.error({
            path: this.relativePath,
            message: error.message ?? error,
            error,
          });
        }
      }
    );
  }
}

/**
 * When the cursor is moved (via keyboard, mouse or external navigation), VS Code requests
 * code actions for the current position. These will be available in when clicking the
 * indicator lightbulb or when invoking the quick-fix menu with a keyboard shortcut.
 */
function isCursorMovementCodeActionRequested(
  requestedCodeActionKind: string | undefined
): requestedCodeActionKind is undefined {
  return requestedCodeActionKind === undefined;
}

/**
 * When the user invokes a refactoring context menu or uses refactorings with a keyboard shortcut,
 * the code assist kind needs to be a prefix of the requested code action kind.
 */
function isCodeActionKindRequested(
  codeAssistType: p42.CodeAssistType<p42.AnyMatch>,
  requestedCodeActionKind: string
) {
  return codeAssistType.isCodeActionKindPrefixSupported(
    requestedCodeActionKind
  );
}

function getRequestedCodeActionKind(
  context: CodeActionContext
): string | undefined {
  return context.only?.[0]; // assuming single element inside limit, first index
}

// [P42] Branding: show that a code assist is added by P42
// This is helpful when receiving bug reports and talking to users
// (to verify it is truly a P42 code assist), and has a small marketing effect
// (e.g. during pair programming situations, on screencasts and in screenshots)
function getBrandedActionLabelWithSafetyInformation(
  codeAssist: p42.CodeAssist,
  safetyAnalysisVisibility: SafetyAnalysisVisibility
): string {
  const safetyIndicatorText = getSafetyAnalysisIndicatorText(
    codeAssist,
    safetyAnalysisVisibility
  );

  return `${codeAssist.label}${
    safetyIndicatorText != null ? ` ${safetyIndicatorText}` : ""
  } ${codeAssist.type.metadata.requiresCloudAi === true ? "👤 AI " : ""}[P42]`;
  // alternative AI emoji: 🔮 👤 🤖
}

function getSafetyAnalysisIndicatorText(
  codeAssist: p42.CodeAssist,
  safetyAnalysisVisibility: SafetyAnalysisVisibility
): string | unknown {
  switch (safetyAnalysisVisibility) {
    case "Do not show safety analysis":
      return undefined;
    case "Show safety indicator":
      return codeAssist.safety.icon;
    case "Show safety indicator and message":
    default:
      return codeAssist.safety.iconAndMessage;
  }
}

function createCodeAction({
  codeAssist,
  requestedKinds,
  kind,
  diagnostic,
  safetyAnalysisVisibility,
}: {
  codeAssist: p42.CodeAssist;
  kind: CodeActionKind;
  requestedKinds: Array<CodeActionKind> | undefined;
  isPreferred?: boolean;
  diagnostic?: Diagnostic;
  safetyAnalysisVisibility: SafetyAnalysisVisibility;
}) {
  return {
    title: getBrandedActionLabelWithSafetyInformation(
      codeAssist,
      safetyAnalysisVisibility
    ),
    kind,
    diagnostics: diagnostic != null ? [diagnostic] : undefined,
    isPreferred: p42.CodeAssistLevel.isPreferred(codeAssist.level),
    command: {
      title: codeAssist.label,
      command: CODE_ASSIST_COMMAND_ID,
      arguments: [
        codeAssist.id,
        // information for telemetry:
        `codeAction-${requestedKinds?.join(",") ?? "quickfix"}-diagnostic:${
          diagnostic != null
        }-fromDiagnostic:${kind === CodeActionKind.QuickFix}`,
      ],
    },
  };
}
