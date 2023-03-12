export type DocumentManagerEventListener = {
  onDocumentCleared: (documentUri: string) => Promise<void>;
  onDocumentInitialized: (documentUri: string) => Promise<void>;
};
