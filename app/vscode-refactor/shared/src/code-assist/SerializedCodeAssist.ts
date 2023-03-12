import * as p42 from "@p42/engine";

export type SerializedCodeAssist = {
  /**
   * Lightweight reference that does not require calculating the replacement
   * text (expensive) before the actual execution of the refactoring.
   */
  id: string;

  /**
   * Id of the code assist type.
   */
  typeId: string;

  kind: string;

  actionLabel: string;

  safetyLevel: p42.SafetyLevel;
  safetyIcon: string | undefined;
  safetyMessage: string | undefined;
};

export const serializeCodeAssist = (
  codeAssist: p42.CodeAssist
): SerializedCodeAssist => ({
  id: codeAssist.id,
  typeId: codeAssist.type.id,
  kind: codeAssist.kind,
  actionLabel: codeAssist.label,
  safetyLevel: codeAssist.safety.level,
  safetyIcon: codeAssist.safety.icon,
  safetyMessage: codeAssist.safety.message,
});
