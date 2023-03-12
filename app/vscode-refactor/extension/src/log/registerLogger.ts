import * as vscode from "vscode";
import { OutputChannelLogger } from "./OutputChannelLogger";

export function registerLogger(
  context: vscode.ExtensionContext,
  outputChannelName: string
): OutputChannelLogger {
  const outputChannel = vscode.window.createOutputChannel(outputChannelName);
  context.subscriptions.push(outputChannel);
  return new OutputChannelLogger(outputChannel);
}
