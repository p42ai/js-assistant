import { LogLevel } from "@p42/app-vscode-shared/build/logger/Logger";
import * as _ from "lodash";
import * as vscode from "vscode";
import { LanguageServerFacade } from "../language-service-client/LanguageServerFacade";
import { OutputChannelLogger } from "../log/OutputChannelLogger";
import { executeCodeAssistCommand } from "./CodeAssistCommand";

export const createApplyAllSafeSuggestionsCommand =
  (logger: OutputChannelLogger, languageServer: LanguageServerFacade) =>
  async (documentUri: vscode.Uri) => {
    const path = vscode.workspace.asRelativePath(documentUri);

    const listener = async (changedDocumentUri: string) => {
      if (changedDocumentUri === documentUri.toString()) {
        await applyFirstSafeSuggestion();
      }
    };

    const listenerDisposable = languageServer.onDocumentUpdated(listener);

    const finish = () => {
      logger.log(LogLevel.INFO, {
        path,
        message: `Finished applying safe suggestions.`,
      });
      listenerDisposable.dispose();
    };

    async function applyFirstSafeSuggestion() {
      try {
        const suggestions = (
          await languageServer.getSuggestions(documentUri.toString())
        )?.filter((suggestion) => suggestion.safetyLevel === "SAFE");

        if (suggestions == null) {
          finish();
          return;
        }

        const firstSafeSuggestion = _.sortBy(
          suggestions,
          (finding) => finding.suggestionLine
        )[0];

        if (firstSafeSuggestion == null) {
          finish();
          return;
        }

        await executeCodeAssistCommand(
          firstSafeSuggestion.id,
          "applyAllSafeSuggestions"
        );

        logger.log(LogLevel.INFO, {
          path,
          message: `Line ${firstSafeSuggestion.suggestionLine}: ${firstSafeSuggestion.actionLabel}`,
        });
      } catch (error: any) {
        finish();
        logger.error({ path, message: "Applying suggestions failed", error });
      }
    }

    logger.showOutput();
    logger.log(LogLevel.INFO, {
      path,
      message: `Start applying safe suggestions.`,
    });
    applyFirstSafeSuggestion();
  };
