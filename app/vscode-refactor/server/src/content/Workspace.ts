import { Connection } from "vscode-languageserver";

export class Workspace {
  constructor(private readonly connection: Connection) {}

  private async getWorkspaceFolders() {
    return (await this.connection.workspace.getWorkspaceFolders()) ?? [];
  }

  async getWorkspaceFolderUri(
    documentUri: string
  ): Promise<string | undefined> {
    const folders = await this.getWorkspaceFolders();

    for (const folder of folders) {
      // TODO what if multiple folders contain the file?
      if (documentUri.startsWith(folder.uri)) {
        return folder.uri;
      }
    }

    return undefined;
  }

  async asRelativePath(documentUri: string): Promise<string> {
    try {
      const workspaceFolderUri = await this.getWorkspaceFolderUri(documentUri);

      if (workspaceFolderUri == null) {
        return documentUri;
      }

      return documentUri.substring(workspaceFolderUri.length + 1); // + 1 to cut leading slash
    } catch (error) {
      // TODO log error
      return documentUri;
    }
  }
}
