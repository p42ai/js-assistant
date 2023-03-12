import { SafetyLevel } from "./SafetyLevel";

const safetyLevelToIcon = new Map<SafetyLevel, string>();
safetyLevelToIcon.set("SAFE", "🟢"); // alternative: ✅
safetyLevelToIcon.set("INFORMATION", "🔵"); // alternative: ℹ️
safetyLevelToIcon.set("WARNING", "🟡"); // alternative: 🔶 🟨 🔔 ⚠️
safetyLevelToIcon.set("ERROR", "🔴"); // alternative: 🛑 ⛔

export class Safety {
  static unknown(): Safety {
    return Unknown;
  }

  static safe(): Safety {
    return Safe;
  }

  static information(message: string): Safety {
    return new Safety("INFORMATION", message);
  }

  static warning(message: string): Safety {
    return new Safety("WARNING", message);
  }

  static error(message: string): Safety {
    return new Safety("ERROR", message);
  }

  constructor(readonly level: SafetyLevel, readonly message?: string) {}

  get icon(): string {
    return safetyLevelToIcon.get(this.level) ?? "";
  }

  get hasMessage(): boolean {
    return this.message != null;
  }

  get iconAndMessage(): string {
    return this.isUnknown()
      ? ""
      : `${this.icon}  ${
          this.message ?? (this.isSafe() ? "safe" : "might change semantics")
        }`;
  }

  isError() {
    return this.level === "ERROR";
  }

  isInformation() {
    return this.level === "INFORMATION";
  }

  isSafe() {
    return this.level === "SAFE";
  }

  isUnknown() {
    return this.level === "UNKNOWN";
  }

  isWarning() {
    return this.level === "WARNING";
  }
}

const Safe: Safety = new Safety("SAFE");
const Unknown: Safety = new Safety("UNKNOWN");
