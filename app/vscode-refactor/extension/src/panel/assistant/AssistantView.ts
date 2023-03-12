import { InformationElement } from "@p42/app-vscode-shared/build/assistant/InformationElement";
import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import * as p42 from "@p42/engine";
import * as _ from "lodash";
import * as vscode from "vscode";
import { executeCodeAssistCommand } from "../../command/CodeAssistCommand";
import { ActiveEditor } from "../../content/ActiveEditor";
import { DocumentWatcher } from "../../content/DocumentWatcher";
import { LanguageServerFacade } from "../../language-service-client/LanguageServerFacade";
import { convertOffsetRangeToVscodeRange } from "../../util/text/convertOffsetRangeToVscodeRange";
import { WebViewWrapper } from "../../webview/WebViewWrapper";

export class AssistantView implements vscode.WebviewViewProvider {
  public static readonly id = "p42.assistant";

  private view: WebViewWrapper | undefined;
  private decoration: vscode.TextEditorDecorationType;
  private documentWatcher: DocumentWatcher;

  private selectedElementId: string | undefined = undefined;

  constructor(
    private readonly extensionUri: vscode.Uri,
    private readonly baseUrl: string,
    private readonly activeEditor: ActiveEditor,
    private readonly configurationManager: ConfigurationManager,
    languageServer: LanguageServerFacade
  ) {
    this.decoration = vscode.window.createTextEditorDecorationType({
      backgroundColor: "rgba(255, 76, 48, 0.3)",
    });

    this.documentWatcher = new DocumentWatcher(languageServer);
    this.documentWatcher.setDocumentUri(this.activeEditor.documentUri);

    this.documentWatcher.onSuggestionChange(async () => this.refresh());

    this.activeEditor.onDidUpdate((event) => {
      if (event.type === "editorChange") {
        this.selectedElementId = undefined; // reset when editor changes
      }
      this.documentWatcher.setDocumentUri(this.activeEditor.documentUri);
    });
  }

  // called when panel is shown for the first time
  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    cancellationToken: vscode.CancellationToken
  ) {
    // debounce to prevent multiple invocations through quick clicking
    // TODO extract debounceClick
    const debounceClick = (f: any) => _.debounce(f, 1000, { leading: true });

    this.view = new WebViewWrapper(
      webviewView,
      "assistant",
      this.extensionUri,
      async (message) => {
        const type = message.type as string;

        // TODO refactor into command pattern
        switch (type) {
          case "revealLine": {
            const textEditor = vscode.window.activeTextEditor!;
            const line = message.line as number;
            textEditor.revealRange(new vscode.Range(line, 0, line, 0));
            break;
          }
          case "onCodeAssistSelection": {
            const codeAssist =
              message.codeAssist as SerializedSuggestionCodeAssist;

            const textEditor = vscode.window.activeTextEditor!;
            const range = convertOffsetRangeToVscodeRange(
              codeAssist.highlightRanges[0],
              textEditor.document
            );

            textEditor.revealRange(range);
            textEditor.selection = new vscode.Selection(range.start, range.end);

            break;
          }
          case "executeCodeAssistAction": {
            const codeAssist =
              message.codeAssist as SerializedSuggestionCodeAssist;

            this.clearHighlights();

            // runs async:
            executeCodeAssistCommand(codeAssist.id, "suggestionPanel");
            break;
          }
          case "highlight": {
            const highlightRanges = message.highlightRanges as Array<p42.Range>;
            const textEditor = vscode.window.activeTextEditor!;

            textEditor.setDecorations(
              this.decoration,
              highlightRanges.map((range) =>
                convertOffsetRangeToVscodeRange(range, textEditor.document)
              )
            );

            break;
          }
          case "clearHighlights": {
            this.clearHighlights();
            break;
          }
          case "applySafeSuggestions": {
            vscode.commands.executeCommand("p42.applySafeSuggestions");
            break;
          }
          case "scanFile": {
            vscode.commands.executeCommand(
              "p42.scanFile",
              this.activeEditor.documentUri
            );
            break;
          }
          case "selectElement": {
            this.refresh(message.elementId as string);
            break;
          }
        }
      },
      async () => this.refresh()
    );

    this.refresh();
  }

  private clearHighlights() {
    vscode.window.activeTextEditor?.setDecorations(this.decoration, []);
  }

  // TODO clean up hacky selectedId approach
  async refresh(selectedId?: string) {
    // before view check so the id is stored.
    if (selectedId != null) {
      this.selectedElementId = selectedId;
    }

    if (this.view == null) {
      return;
    }

    const { isDocumentSupported, shortFileName } = this.activeEditor;
    const suggestions = (await this.documentWatcher.getSuggestions()) ?? [];
    const webView = this.view.view;

    const suggestionCount = this.getSuggestionBadgeCount(suggestions);
    webView.title = p42.composeCountLabel(suggestions.length, "suggestions");
    webView.badge = {
      value: suggestionCount,
      tooltip: p42.composeCountLabel(suggestionCount, "suggestions"),
    };

    const informationElements = await this.getInformationElements(suggestions);

    this.view?.updateState({
      baseUrl: this.baseUrl,
      shortFileName,
      isDocumentSupported,
      informationElements,
      visibleLineRange: this.visibleLineRange,
      selectedElementId: this.selectedElementId,
      selectedElementDiff: await this.getSelectedElementDiff(
        informationElements
      ),
    });
  }

  private async getSelectedElementDiff(
    informationElements: Array<InformationElement>
  ) {
    if (this.selectedElementId == null) {
      return undefined;
    }

    const element = informationElements.find(
      (element) => element.id === this.selectedElementId
    );

    if (element == null || element.type !== "suggestion") {
      return undefined;
    }

    return await this.documentWatcher.getCodeAssistDiff(
      element.codeAssist.id,
      1
    );
  }

  private getSuggestionBadgeCount(
    suggestions: SerializedSuggestionCodeAssist[]
  ) {
    const suggestionBadgeVisibility =
      this.configurationManager.getSuggestionBadgeVisibility();

    const visibleLineRange = this.visibleLineRange;
    const visibleSuggestions =
      visibleLineRange != null
        ? suggestions.filter(
            (suggestion) =>
              visibleLineRange.firstLine <= suggestion.suggestionLine &&
              suggestion.suggestionLine <= visibleLineRange.lastLine
          )
        : suggestions;

    switch (suggestionBadgeVisibility) {
      case "Show badge for all suggestions":
        return visibleSuggestions.length;
      case "Show badge only for safe suggestions":
        return visibleSuggestions.filter(
          (suggestion) => suggestion.safetyLevel === "SAFE"
        ).length;
      case "Do not show badge":
        return 0;
      default:
        const exhaustiveCheck: never = suggestionBadgeVisibility;
        throw new Error(
          `unsupported suggestionBadgeVisibility: ${exhaustiveCheck}`
        );
    }
  }

  private async getInformationElements(
    suggestions: SerializedSuggestionCodeAssist[]
  ) {
    const suggestionElements: Array<InformationElement> = suggestions.map(
      (suggestion) => ({
        type: "suggestion",
        id: `suggestion-${suggestion.id}`,
        codeAssist: suggestion,
      })
    );

    const functionElements: Array<InformationElement> = (
      (await this.documentWatcher.getFunctionElements()) ?? []
    ).map((functionElement) => {
      const vscodeRange = convertOffsetRangeToVscodeRange(
        new p42.Range(functionElement.start, functionElement.end),
        this.activeEditor.document!
      );

      return {
        type: "function",
        id: `function-${functionElement.id}`,
        functionElement,
        startLine: vscodeRange.start.line + 1,
        endLine: vscodeRange.end.line + 1,
      };
    });

    return [...suggestionElements, ...functionElements];
  }

  private get visibleLineRange() {
    const visibleRange = this.activeEditor.editor?.visibleRanges[0];
    return visibleRange == null
      ? undefined
      : {
          firstLine: visibleRange.start.line + 1, // lines start with 1
          lastLine: visibleRange.end.line + 1,
        };
  }
}
