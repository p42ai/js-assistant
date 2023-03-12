/* eslint-disable no-console */

import { AbstractLogger } from "./AbstractLogger";

export class ConsoleLogger extends AbstractLogger {
  protected writeLogLine(logLine: string): void {
    console.log(logLine);
  }
}
