/**
 * Stand-alone Disposable implementation that mimics the vscode disposable interface.
 * The VS code API is not available in the language server and the webview layer.
 */
export type Disposable = {
  dispose(): any;
};
