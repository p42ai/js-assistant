import * as vscode from "vscode";
import { BrowserLanguageServerClient } from "./language-service-client/BrowserLanguageServerClient";
import { ExtensionSetup } from "./setup/ExtensionSetup";

export const activate = async (context: vscode.ExtensionContext) => {
  await ExtensionSetup.activate({
    context,
    type: "browser",
    languageServerClient: new BrowserLanguageServerClient(context.extensionUri),
  });
};

export const deactivate = async () => {
  await ExtensionSetup.deactivate();
};
