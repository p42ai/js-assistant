export type ScanConfiguration = {
  refactorings: Array<string> | null;
  maxDiffSize: number;
  includedPaths: Array<string> | null;
  excludedPaths: Array<string>;
  isLoggingEnabled: boolean;
};
