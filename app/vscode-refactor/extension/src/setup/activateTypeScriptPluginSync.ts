import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import * as vscode from "vscode";

const typeScriptExtensionId = "vscode.typescript-language-features";
const pluginId = "@p42/hide-typescript-refactors";

export async function activateTypeScriptPluginSync(
  configurationManager: ConfigurationManager
) {
  const extension = vscode.extensions.getExtension(typeScriptExtensionId);

  if (extension == null) {
    return;
  }

  await extension.activate();

  const api = extension.exports?.getAPI?.(0);

  if (api == null) {
    return;
  }

  function synchronizeConfiguration() {
    api.configurePlugin(pluginId, {
      shouldRemoveOverlappingRefactors:
        configurationManager.shouldOnlyShowP42CodeAssists(),
    });
  }

  configurationManager.onConfigurationUpdate(async () =>
    synchronizeConfiguration()
  );

  synchronizeConfiguration();
}
