import { CodeAssistMetadata } from "@p42/engine";

export type CodeAssistBundle = CodeAssistMetadata & {
  documentation: {
    description: string | null;
    rationale: string | null;
    safety: string | null;
    mechanics: string | null;
  };
};
