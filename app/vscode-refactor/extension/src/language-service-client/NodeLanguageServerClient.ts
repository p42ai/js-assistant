import * as path from "path";
import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { Disposable } from "@p42/app-vscode-shared/build/util/Disposable";
import { LanguageServerClient } from "./LanguageServerClient";

export class NodeLanguageServerClient implements LanguageServerClient {
  client: LanguageClient | undefined;

  private disposable: Disposable | undefined;

  private worker: Worker | undefined;

  constructor(private readonly context: vscode.ExtensionContext) {}

  dispose() {
    this.disposable?.dispose();
    this.worker?.terminate();
  }

  async init(clientOptions: LanguageClientOptions) {
    const serverModule = this.context.asAbsolutePath(
      path.join("server", "dist", "server-node.js")
    );

    this.client = new LanguageClient(
      "p42.server.node",
      "P42 JS Assistant Server",
      {
        run: {
          module: serverModule,
          transport: TransportKind.ipc,
          options: { cwd: process.cwd() },
        },
        debug: {
          module: serverModule,
          transport: TransportKind.ipc,
          options: {
            execArgv: ["--nolazy", "--inspect=6014"],
            cwd: process.cwd(),
          },
        },
      },
      clientOptions
    );

    this.disposable = this.client.start();

    await this.client.onReady();

    return this;
  }
}
