import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import * as vscode from "vscode";
import { ActiveEditor } from "../../content/ActiveEditor";
import { LanguageServerFacade } from "../../language-service-client/LanguageServerFacade";
import { AssistantView } from "./AssistantView";

export function registerAssistantView({
  languageServer,
  baseUrl,
  activeEditor,
  context,
  configurationManager,
}: {
  baseUrl: string;
  activeEditor: ActiveEditor;
  context: vscode.ExtensionContext;
  configurationManager: ConfigurationManager;
  languageServer: LanguageServerFacade;
}) {
  const assistantView = new AssistantView(
    context.extensionUri,
    baseUrl,
    activeEditor,
    configurationManager,
    languageServer
  );

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(AssistantView.id, assistantView)
  );

  return assistantView;
}
