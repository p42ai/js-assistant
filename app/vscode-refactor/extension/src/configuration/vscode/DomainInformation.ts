import * as vscode from "vscode";

export class DomainInformation {
  readonly baseUrl: string;
  readonly host: string;
  readonly port: number;
  readonly scheme: "http" | "https";

  constructor({
    baseUrl,
    host,
    port,
    scheme,
  }: {
    baseUrl: string;
    host: string;
    port: number;
    scheme: "http" | "https";
  }) {
    this.baseUrl = baseUrl;
    this.host = host;
    this.port = port;
    this.scheme = scheme;
  }

  async openUrl({ path }: { path: string }): Promise<boolean> {
    return vscode.env.openExternal(
      vscode.Uri.from({
        scheme: this.scheme,
        authority: `${this.host}:${this.port}`,
        path,
      })
    );
  }
}
