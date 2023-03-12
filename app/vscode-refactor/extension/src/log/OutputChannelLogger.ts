import * as vscode from "vscode";
import { AbstractLogger } from "@p42/app-vscode-shared/build/logger/AbstractLogger";

export class OutputChannelLogger extends AbstractLogger {
  constructor(readonly outputChannel: vscode.OutputChannel) {
    super();
  }

  protected writeLogLine(logLine: string): void {
    this.outputChannel.appendLine(logLine);
  }

  showOutput() {
    this.outputChannel.show(true);
  }
}
