import { SerializedSuggestionCodeAssist } from "@p42/app-vscode-shared/build/code-assist/SerializedSuggestionCodeAssist";
import * as _ from "lodash";
import React from "react";
import { CollapsedSuggestionView } from "../../component/CollapsedSuggestionView";
import { ExpandedSuggestionView } from "../../component/ExpandedSuggestionView";
import { vscodeApi } from "../../vscode/VsCodeApi";

// TODO reuse / extract
function getSuggestionLabel(count: number) {
  return count === 1 ? `1 Suggestion` : `${count} Suggestions`;
}

export const FileScanView: React.FC<{
  data:
    | {
        suggestions: Array<SerializedSuggestionCodeAssist>;
        selectedElementId: string | undefined;
        selectedElementDiff: string | undefined;
      }
    | undefined;
}> = ({ data }) => {
  if (data == null) {
    return <></>; // not initialized
  }

  const { suggestions, selectedElementId, selectedElementDiff } = data;

  if (suggestions.length === 0) {
    return <div className="suggestion-count">No Suggestions</div>;
  }

  const sortedSuggestions = _.sortBy(
    suggestions,
    (suggestion) => suggestion.shortActionLabel
  );

  const selectedIndex = sortedSuggestions.findIndex(
    (suggestion) => suggestion.id === selectedElementId
  );

  return (
    <>
      <div className="suggestion-count">
        {getSuggestionLabel(sortedSuggestions.length)}
      </div>
      <button
        className="apply-button"
        onClick={() => {
          vscodeApi.postMessage({
            type: "applySafeSuggestions",
          });
        }}
      >
        Apply Safe Suggestions
      </button>
      {sortedSuggestions.map((codeAssist, i) => {
        const postMessage = (type: string) => {
          vscodeApi.postMessage({ type, codeAssist });
        };

        return i === selectedIndex ? (
          <ExpandedSuggestionView
            key={i}
            suggestion={codeAssist}
            diff={selectedElementDiff}
            onClickApply={() => postMessage("executeCodeAssistAction")}
            onClick={_.noop}
            onMouseEnter={() => postMessage("highlightCodeAssist")}
            onMouseLeave={() => postMessage("clearCodeAssistHighlights")}
          />
        ) : (
          <CollapsedSuggestionView
            key={i}
            suggestion={codeAssist}
            onClick={() => {
              postMessage("onCodeAssistSelection");
            }}
            onClickApply={() => postMessage("executeCodeAssistAction")}
            onMouseEnter={() => postMessage("highlightCodeAssist")}
            onMouseLeave={() => postMessage("clearCodeAssistHighlights")}
          />
        );
      })}
    </>
  );
};
