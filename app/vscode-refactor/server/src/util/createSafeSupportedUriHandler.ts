import { Logger } from "@p42/app-vscode-shared/build/logger/Logger";
import { Workspace } from "../content/Workspace";

export function createSafeSupportedUriHandler<T>(
  errorMessage: string,
  logger: Logger,
  workspace: Workspace,
  handler: (uri: string) => Promise<T>
): (uri: string) => Promise<T | undefined> {
  return async (uri: string) => {
    // exclude URI schemes like git:// or gitlens:// where the workspace folder cannot be resolved:
    if (!uri.startsWith("file://")) {
      // for non-file uris, try to resolve the workspace folder. This is required to support github.dev
      // where the uri scheme is "github://"
      const folder = await workspace.getWorkspaceFolderUri(uri);
      if (folder == null) {
        return undefined;
      }
    }

    // try-catch to prevent server crashes
    try {
      return await handler(uri); // needs await for catch to work
    } catch (error) {
      logger.error({
        message: errorMessage,
        path: await workspace.asRelativePath(uri),
        error,
      });
      return undefined;
    }
  };
}
