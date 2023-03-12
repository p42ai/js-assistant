export enum LogLevel {
  DEBUG = "DEBUG",
  INFO = "INFO",
  WARNING = "WARNING",
  ERROR = "ERROR",
  PERFORMANCE = "PERFORMANCE",
}

/**
 * Can be either a complex object or a string. If it's a string, it'll be
 * treated as a complex object with the message being set.
 */
export type LogParameters =
  | string
  | {
      message: string;
      path?: string | undefined;
      error?: any | undefined;
    };

export interface Logger {
  log(level: LogLevel, params: LogParameters): void;

  debug(params: LogParameters): void;
  debugMessage(message: string): void;
  info(params: LogParameters): void;
  infoMessage(message: string): void;
  warn(params: LogParameters): void;
  warnMessage(message: string): void;
  error(params: LogParameters): void;
  errorMessage(message: string): void;

  isLevelEnabled(level: LogLevel): boolean;
  setLevelEnabled(level: LogLevel, enabled: boolean): void;
}
