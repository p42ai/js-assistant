import { AbstractLogger } from "@p42/app-vscode-shared/build/logger/AbstractLogger";
import { Connection } from "vscode-languageserver";

export class ConnectionLogger extends AbstractLogger {
  constructor(private readonly connection: Connection) {
    super();
  }

  protected writeLogLine(logLine: string): void {
    this.connection.console.log(logLine);
  }
}
