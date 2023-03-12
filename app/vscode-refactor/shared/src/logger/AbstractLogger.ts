import * as _ from "lodash";
import { Logger, LogLevel, LogParameters } from "./Logger";

export abstract class AbstractLogger implements Logger {
  private levelEnablement = new Map<LogLevel, boolean>();

  // TODO add level for suppressed errors
  // TODO load log level from VSCode configuration
  constructor() {
    this.levelEnablement.set(LogLevel.DEBUG, false);
    this.levelEnablement.set(LogLevel.INFO, true);
    this.levelEnablement.set(LogLevel.WARNING, true);
    this.levelEnablement.set(LogLevel.ERROR, true);

    // true because enablement is handled in performance logger:
    this.levelEnablement.set(LogLevel.PERFORMANCE, true);
  }

  isLevelEnabled(level: LogLevel): boolean {
    return this.levelEnablement.get(level) ?? false;
  }

  setLevelEnabled(level: LogLevel, enabled: boolean): void {
    this.levelEnablement.set(level, enabled);
  }

  protected abstract writeLogLine(logLine: string): void;

  private writeLogMessage(
    level: LogLevel,
    message: string,
    path: string | undefined,
    error: any | undefined
  ) {
    if (path != null) {
      message = `${path} - ${message}`;
    }

    this.writeLogLine(`[${level}] ${message}`);

    if (error != null) {
      this.writeLogLine(`[${level}] ${error.message ?? error}`);
    }
  }

  log(level: LogLevel, parameters: LogParameters) {
    if (!this.isLevelEnabled(level)) {
      return;
    }

    if (_.isString(parameters)) {
      this.writeLogMessage(level, parameters, undefined, undefined);
    } else {
      this.writeLogMessage(
        level,
        parameters.message,
        parameters.path,
        parameters.error
      );
    }
  }

  debug(params: LogParameters) {
    this.log(LogLevel.DEBUG, params);
  }

  debugMessage(message: string) {
    this.debug({ message });
  }

  info(params: LogParameters) {
    this.log(LogLevel.INFO, params);
  }

  infoMessage(message: string) {
    this.info({ message });
  }

  warn(params: LogParameters) {
    this.log(LogLevel.WARNING, params);
  }

  warnMessage(message: string) {
    this.warn({ message });
  }

  error(params: LogParameters) {
    this.log(LogLevel.ERROR, params);
  }

  errorMessage(message: string) {
    this.error({ message });
  }
}
