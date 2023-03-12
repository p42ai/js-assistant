import * as p42 from "@p42/engine";
import { Logger, LogLevel } from "./Logger";

export class PerformanceLogger implements p42.PerformanceRecorder {
  constructor(
    private readonly path: string | undefined,
    private readonly id: number,
    private readonly logger: Logger,
    private readonly logLevel: p42.PerformanceLogLevel | "off"
  ) {}

  log(message: string) {
    this.logger.log(LogLevel.PERFORMANCE, {
      path: this.path,
      message: `${this.id} - ${message}`,
    });
  }

  logTimePassed(label: string, beforeMs: number) {
    const afterMs = Date.now();
    this.log(`${label} - ${afterMs - beforeMs}`);
  }

  logComputationCancelled() {
    if (this.logLevel === "off") {
      return;
    }

    this.log("computation cancelled");
  }

  run<T>(label: string, level: p42.PerformanceLogLevel, f: () => T) {
    if (
      this.logLevel === "off" ||
      (this.logLevel === "overview" && level === "detail")
    ) {
      return f();
    }

    // using Date.now() to have similar code in browser and node (ms precision is sufficient)
    const beforeMs = Date.now();
    const result = f();
    this.logTimePassed(label, beforeMs);
    return result;
  }

  async runAsync<T>(
    label: string,
    level: p42.PerformanceLogLevel,
    f: () => Promise<T>
  ) {
    if (
      this.logLevel === "off" ||
      (this.logLevel === "overview" && level === "detail")
    ) {
      return f();
    }

    const beforeMs = Date.now();
    const result = await f();
    this.logTimePassed(label, beforeMs);
    return result;
  }
}
