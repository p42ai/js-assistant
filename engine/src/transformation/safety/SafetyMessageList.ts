import { Safety } from "./Safety";
import { SafetyLevel } from "./SafetyLevel";

export class SafetyMessageList {
  // worst safety level from received messages
  private level: SafetyLevel | undefined = undefined;

  private messages: Array<string> = [];

  error(message: string) {
    this.level = "ERROR";
    this.messages.push(message);
  }

  information(message: string) {
    if (this.level !== "ERROR" && this.level !== "WARNING") {
      this.level = "INFORMATION";
    }
    this.messages.push(message);
  }

  warning(message: string) {
    if (this.level !== "ERROR") {
      this.level = "WARNING";
    }
    this.messages.push(message);
  }

  produceUnknown() {
    return this.produce("UNKNOWN");
  }

  produceSafe() {
    return this.produce("SAFE");
  }

  private produce(defaultLevel: "UNKNOWN" | "SAFE"): Safety {
    return this.level == null
      ? new Safety(defaultLevel)
      : new Safety(this.level, this.messages.join("; "));
  }
}
