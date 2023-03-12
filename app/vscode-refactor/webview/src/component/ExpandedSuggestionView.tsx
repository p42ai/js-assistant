import React from "react";
import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import { LineView } from "./LineView";
import { DiffView } from "./DiffView";

export const ExpandedSuggestionView: React.FC<{
  suggestion: SerializedSuggestionCodeAssist;
  diff?: string | undefined;
  onClickApply: () => void;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({
  suggestion,
  diff,
  onClickApply,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) => {
  // TODO extract into some library (shared routes)
  const codeAssistDocumentationUrl = `https://p42.ai/documentation/code-assist/${suggestion.typeId}`;
  return (
    <div
      className="information-element expanded"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="information-element-title">{suggestion.description}</div>

      {diff != null && (
        <div style={{ marginTop: "20px", marginBottom: "10px" }}>
          <DiffView diff={diff} />
        </div>
      )}

      {suggestion.safetyLevel !== "UNKNOWN" &&
        suggestion.safetyLevel !== "SAFE" && (
          <div className="safety">
            <span style={{ fontFamily: "Monaco" }}>
              {suggestion.safetyIcon}
            </span>
            {"\u00a0\u00a0"}
            {suggestion.safetyMessage}
          </div>
        )}

      <button className={"apply-button"} onClick={onClickApply}>
        {suggestion.shortActionLabel ?? "Apply"}
      </button>
      <div className="learn-more">
        <span>
          <a href={codeAssistDocumentationUrl}>Learn more</a>
        </span>
        <LineView
          line={suggestion.suggestionLine}
          label={
            suggestion.safetyLevel === "SAFE" ? (
              <>
                <i
                  className="codicon codicon-pass safe-icon"
                  style={{ verticalAlign: "sub" }}
                />{" "}
                safe
              </>
            ) : undefined
          }
        />
      </div>
    </div>
  );
};
