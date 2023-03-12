import * as vscode from "vscode";
import { NodeLanguageServerClient } from "./language-service-client/NodeLanguageServerClient";
import { ExtensionSetup } from "./setup/ExtensionSetup";

export const activate = async (context: vscode.ExtensionContext) => {
  await ExtensionSetup.activate({
    context,
    type: "node",
    languageServerClient: new NodeLanguageServerClient(context),
  });
};

export const deactivate = async () => {
  await ExtensionSetup.deactivate();
};
