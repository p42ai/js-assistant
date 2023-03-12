import { ConfigurationManager } from "../configuration/ConfigurationManager";
import { Logger } from "./Logger";
import { PerformanceLogger } from "./PerformanceLogger";

export class PerformanceLoggerFactory {
  private performanceLoggerCount = 0;

  constructor(
    private readonly configurationManager: ConfigurationManager,
    private readonly logger: Logger
  ) {}

  createPerformanceLogger(path?: string | undefined) {
    return new PerformanceLogger(
      path,
      this.performanceLoggerCount++,
      this.logger,
      this.configurationManager.getPerformanceLogLevel()
    );
  }
}
