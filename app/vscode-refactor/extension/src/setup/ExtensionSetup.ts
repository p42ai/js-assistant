import { ConfigurationManager } from "@p42/app-vscode-shared/build/configuration/ConfigurationManager";
import { PerformanceLoggerFactory } from "@p42/app-vscode-shared/build/logger/PerformanceLoggerFactory";
import * as bundle from "@p42/bundle";
import * as p42 from "@p42/engine";
import * as vscode from "vscode";
import { registerCodeAssistCommand } from "../command/CodeAssistCommand";
import { createApplyAllSafeSuggestionsCommand } from "../command/createApplyAllSafeSuggestionsCommand";
import { createCodeActionContextMenuCommand } from "../command/createCodeAssistContextMenuCommand";
import { createDelegateCommand } from "../command/createDelegateCommand";
import { createGetStartedCommand } from "../command/createGetStartedCommand";
import { createMassRefactorCommand } from "../command/createMassRefactorCommand";
import { createOpenPageCommand } from "../command/createOpenPageCommand";
import { createOpenSettingsCommand } from "../command/createOpenSettingsCommand";
import { createScanFileCommand } from "../command/createScanFileCommand";
import { WorkspaceFileConfigurationManager } from "../configuration/file/WorkspaceFileConfigurationManager";
import { WorkspaceVscodeSettingsManager } from "../configuration/vscode/WorkspaceVscodeSettingsManager";
import { ActiveEditor } from "../content/ActiveEditor";
import { getDocumentSelector } from "../content/getDocumentSelector";
import { createDependencyVisualizationCommand } from "../dependency-visualization/createDependencyVisualizationCommand";
import { LanguageServerClient } from "../language-service-client/LanguageServerClient";
import { LanguageServerFacade } from "../language-service-client/LanguageServerFacade";
import { registerLogger } from "../log/registerLogger";
import { registerAssistantView } from "../panel/assistant/registerAssistantView";
import { activateTypeScriptPluginSync } from "./activateTypeScriptPluginSync";

export const ExtensionSetup = Object.freeze({
  async activate({
    context,
    type,
    languageServerClient,
  }: {
    context: vscode.ExtensionContext;
    type: "node" | "browser";
    languageServerClient: LanguageServerClient;
  }) {
    const logger = registerLogger(context, "P42 JS Assistant");

    const vscodeSettingsManager = new WorkspaceVscodeSettingsManager();
    const { domainInformation } = vscodeSettingsManager;

    const languageServer = new LanguageServerFacade(
      languageServerClient,
      logger
    );

    context.subscriptions.push(
      await languageServer.init({
        outputChannel: logger.outputChannel,
        documentSelector: getDocumentSelector(),
      })
    );

    const fileConfigurationManager = new WorkspaceFileConfigurationManager(
      "p42.toml",
      logger
    );

    const configurationManager = new ConfigurationManager(
      fileConfigurationManager,
      vscodeSettingsManager
    );

    // note: listener registration needs to happen after configuration manager is initialized
    // to prevent a race condition with the state of isExcluded (which leads to diagnostics not
    // being updated immediately when p42.toml is saved)
    fileConfigurationManager.onConfigurationChange(async (event) => {
      await languageServer.setConfigurationFileContent(event);
    });

    // initialize p42.toml values in language server
    const folders = vscode.workspace.workspaceFolders ?? [];
    for (const folder of folders) {
      const workspaceFolderUri = folder.uri.toString();
      if (
        await fileConfigurationManager.hasConfigurationFile(workspaceFolderUri)
      ) {
        await languageServer.setConfigurationFileContent({
          workspaceFolderUri,
          content:
            (await fileConfigurationManager.getConfigurationContent(
              workspaceFolderUri
            )) ?? null,
        });
      }
    }

    context.subscriptions.push(configurationManager);

    const performanceLoggerFactory = new PerformanceLoggerFactory(
      configurationManager,
      logger
    );

    const activeEditor = new ActiveEditor(context);

    const assistantView = registerAssistantView({
      languageServer,
      activeEditor,
      context,
      configurationManager,
      baseUrl: domainInformation.baseUrl,
    });

    function registerCommands(
      // TODO better type instead of any
      commands: Array<{ commandId: string; command: any }>
    ) {
      for (const { commandId, command } of commands) {
        context.subscriptions.push(
          vscode.commands.registerCommand(commandId, command)
        );
      }
    }

    registerCodeAssistCommand({
      context,
      logger,
      getCodeAssistAction:
        languageServer.getCodeAssistAction.bind(languageServer),
      isCodeAssistAnimationEnabled: () =>
        configurationManager.isCodeAssistAnimationEnabled(),
    });

    registerCommands([
      {
        commandId: "p42.openSettings",
        command: createOpenSettingsCommand(),
      },
      {
        commandId: "p42.openDocumentation",
        command: createOpenPageCommand({
          domainInformation,
          path: "/documentation/p42-for-vscode",
        }),
      },
      {
        commandId: "p42.openLandingPage",
        command: createOpenPageCommand({
          domainInformation,
          path: "/",
        }),
      },
      {
        commandId: "p42.getStarted",
        command: createGetStartedCommand(),
      },
      {
        commandId: "p42.massRefactor",
        command: createMassRefactorCommand({
          logger,
          sourceDocumentFactory: new p42.SourceDocumentFactory(
            bundle.AUGMENTATIONS,
            bundle.createCodeAssists()
          ),
          configurationManager,
          performanceLoggerFactory,
          baseUrl: domainInformation.baseUrl,
        }),
      },
      {
        commandId: "p42.applySafeSuggestions",
        command: createApplyAllSafeSuggestionsCommand(logger, languageServer),
      },
      {
        commandId: "p42.codeActionMenu.action",
        command: createCodeActionContextMenuCommand({
          kind: "action",
          apply: "never",
        }),
      },
      {
        commandId: "p42.touchBar.rename",
        command: createDelegateCommand("editor.action.rename"),
      },
      {
        commandId: "p42.touchBar.quickFix",
        command: createCodeActionContextMenuCommand({
          kind: "",
          apply: "never",
        }),
      },
      {
        commandId: "p42.touchBar.sourceAction",
        command: createDelegateCommand("editor.action.sourceAction"),
      },
      {
        commandId: "p42.touchBar.refactor",
        command: createDelegateCommand("editor.action.refactor"),
      },
      {
        commandId: "p42.scanFile",
        command: createScanFileCommand({
          logger,
          languageServer,
          extensionUri: context.extensionUri,
        }),
      },
      {
        commandId: "p42.openFileDependencyGraph",
        command: createDependencyVisualizationCommand({
          logger,
          languageServer,
          extensionUri: context.extensionUri,
        }),
      },
    ]);

    // initialize hide typescript refactors plugin configuration:
    if (type === "node") {
      await activateTypeScriptPluginSync(configurationManager);
    }
  },

  async deactivate() {
    // noop
  },
});
