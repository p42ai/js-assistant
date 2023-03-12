import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import * as p42 from "@p42/engine";
import React from "react";

function createSafetyIcon(
  safetyLevel: p42.SafetyLevel
): JSX.Element | undefined {
  return safetyLevel === "SAFE" ? (
    <i className="codicon codicon-pass safe-icon" />
  ) : undefined;
}

export const CollapsedSuggestionView: React.FC<{
  suggestion: SerializedSuggestionCodeAssist;
  onClick: () => void;
  onClickApply: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ suggestion, onClick, onClickApply, onMouseEnter, onMouseLeave }) => (
  <div
    className="information-element collapsed"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="information-element-type-icon">
      <i className="codicon codicon-wand" />
    </div>
    <div className="information-element-title">{suggestion.description}</div>
    <span className="information-element-markers">
      {createSafetyIcon(suggestion.safetyLevel)}
    </span>
    <div className="information-element-actions">
      <button
        className="muted"
        onClick={(event) => {
          event.stopPropagation();
          onClickApply();
        }}
      >
        {suggestion.shortActionLabel ?? "Apply"}
      </button>
    </div>
  </div>
);
