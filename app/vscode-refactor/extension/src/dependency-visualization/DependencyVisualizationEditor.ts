import * as p42 from "@p42/engine";
import * as ts from "typescript";
import * as vscode from "vscode";
import { findFilesInFolder } from "../util/fs/findFilesInFolder";
import { readFileContent } from "../util/fs/readFileContent";
import { P42WebView } from "../webview/P42WebView";
import { DependencyGraph } from "./DependencyGraph";
import { layoutGraph } from "./layout/layoutGraph";
import { layoutWithDagre } from "./layout/layoutWithDagre";

export class DependencyVisualizationEditor implements vscode.Disposable {
  private readonly webview: P42WebView;
  private readonly layoutGraph: layoutGraph = layoutWithDagre;
  private readonly panel: vscode.WebviewPanel;
  private readonly disposables: Array<vscode.Disposable> = [];
  private readonly folderUri: vscode.Uri;
  private dependencies: DependencyGraph | undefined;

  static async create(configuration: {
    folderUri: vscode.Uri;
    extensionUri: vscode.Uri;
  }) {
    const editor = new DependencyVisualizationEditor(configuration);
    await editor.update();
    return editor;
  }

  constructor({
    folderUri,
    extensionUri,
  }: {
    folderUri: vscode.Uri;
    extensionUri: vscode.Uri;
  }) {
    this.folderUri = folderUri;

    this.panel = vscode.window.createWebviewPanel(
      "p42-dependency-visualization",
      `${this.folderPath} - File Dependency Graph`,
      vscode.ViewColumn.Active,
      {}
    );

    this.panel.onDidDispose(() => {
      this.dispose();
    });

    this.panel.iconPath = vscode.Uri.joinPath(
      extensionUri,
      "image",
      "p42-icon.png"
    );

    this.webview = new P42WebView({
      webviewId: "dependency-visualization",
      webview: this.panel.webview,
      extensionUri,
    });

    this.disposables.push(
      this.webview.onDidReceiveMessage(async (message) => {
        const type = message.type as string;

        switch (type) {
          case "doubleClickNode": {
            const nodeId = message.nodeId as string;
            const path = `${this.folderPath}/${nodeId}`;
            const module = this.dependencies?.modules.get(path);
            const fileUri = module?.fileUri;

            if (fileUri != null) {
              vscode.window.showTextDocument(fileUri, {
                viewColumn: vscode.ViewColumn.Beside,
              });
            }
          }
        }
      })
    );
  }

  dispose() {
    this.disposables.forEach((disposable) => disposable.dispose());
  }

  private get folderPath(): string {
    return vscode.workspace.asRelativePath(this.folderUri);
  }

  // TODO check for max number of nodes
  private async update() {
    const graph = await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
      },
      async (progress) => {
        progress.report({
          message: "Analyzing file dependencies…",
        });

        await p42.defer();

        const fileUris = await findFilesInFolder(
          this.folderUri,
          p42.FileTypes.getAllSupportedFileExtensions()
        );

        this.dependencies = new DependencyGraph(this.folderPath);

        for (const fileUri of fileUris) {
          // TODO file path should be relative to folderUri:
          const filePath = vscode.workspace.asRelativePath(fileUri);

          const sourceText = await readFileContent(fileUri);

          const sourceFile = ts.createSourceFile(
            filePath,
            sourceText,
            ts.ScriptTarget.ES2022
          );

          this.dependencies.addModule(
            fileUri,
            filePath,
            findModuleSpecifiers(sourceFile)
          );
        }

        this.dependencies.removeExternalModules();

        // TODO clean separation of node/edge layout vs information (linked by ids)

        const prefixLength = this.folderPath.length + 1;
        const stronglyConnectedComponents = Array.from(
          this.dependencies.calculateStronglyConnectedComponents().values()
        )
          .filter((data) => data.component.length > 1)
          .map((data) => data.component)
          .map((data) => data.map((node) => node.substring(prefixLength)));

        progress.report({
          message: "Calculating graph layout…",
        });

        return {
          layout: this.layoutGraph(this.dependencies),
          stronglyConnectedComponents,
        };
      }
    );

    this.webview.updateState({
      graph: graph.layout,
      stronglyConnectedComponents: graph.stronglyConnectedComponents,
    });
  }
}

// TODO add common js support
function findModuleSpecifiers(sourceFile: ts.SourceFile): Array<string> {
  const declarations: Array<ts.ImportDeclaration | ts.ExportDeclaration> = [];

  p42.visitSelfAndEachDescendant(sourceFile, (node) => {
    if (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) {
      declarations.push(node);
    }
  });

  return declarations
    .map((importElement) => {
      const moduleSpecifier = importElement.moduleSpecifier;

      if (moduleSpecifier != null && ts.isStringLiteral(moduleSpecifier)) {
        return moduleSpecifier.text;
      }
    })
    .filter((name): name is string => name !== undefined);
}
