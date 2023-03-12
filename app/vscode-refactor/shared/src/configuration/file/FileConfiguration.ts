import * as toml from "@iarna/toml";
import * as p42 from "@p42/engine";
import * as _ from "lodash";

/**
 * P42.toml file configuration interface.
 */
export class FileConfiguration {
  private readonly configMap: toml.JsonMap;

  constructor(configText: string) {
    this.configMap = toml.parse(configText);
  }

  private get configAny(): any {
    return this.configMap as any;
  }

  // default: enabled
  isCodeAssistEnabled(codeAssistId: string): boolean | undefined {
    // TODO rename key (breaking change for users)
    return this.configAny.refactoring?.[codeAssistId]?.enabled;
  }

  getEcmaScriptVersion(): p42.EcmaScriptVersion | undefined {
    const version = this.configAny.platform?.ecmaScriptVersion;

    if (version == null) {
      return undefined;
    }

    if (!_.isString(version)) {
      // TODO log to output, show output
      return undefined;
    }

    const upperCaseVersion = version.toUpperCase();

    if (!p42.isEcmaScriptVersion(upperCaseVersion)) {
      // TODO log to output, show output
      return undefined;
    }

    return upperCaseVersion;
  }

  /**
   * Returns the exclusion glob patterns (relative to the workspace folder).
   */
  getExcludedPathPatterns() {
    const excludedPathPatterns: toml.AnyJson | undefined =
      this.configMap.excludedPathPatterns;

    if (excludedPathPatterns == null) {
      return undefined;
    }

    if (
      !_.isArray(excludedPathPatterns) ||
      excludedPathPatterns.some((element) => !_.isString(element))
    ) {
      throw new Error(
        "configuration value for 'excludedPathPatterns' is not a glob array."
      );
    }

    // TODO check for invalid glob patterns

    return excludedPathPatterns as Array<string>;
  }
}
