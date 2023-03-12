export type CodeAssistApplicationResult = {
  codeAssistId: string;
  result: "applied" | "rejected/conflict" | "rejected/no-code-assist";
};
