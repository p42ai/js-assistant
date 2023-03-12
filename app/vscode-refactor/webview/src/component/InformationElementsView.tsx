import { InformationElement } from "@p42/app-vscode-shared/build/assistant/InformationElement";
import * as _ from "lodash";
import React from "react";
import { CollapsedFunctionView } from "./CollapsedFunctionView";
import { CollapsedSuggestionView } from "./CollapsedSuggestionView";
import { ExpandedFunctionView } from "./ExpandedFunctionView";
import { ExpandedSuggestionView } from "./ExpandedSuggestionView";
import { vscodeApi } from "../vscode/VsCodeApi";
import { VisibleLineRange } from "../panel/assistant/VisibleLineRange";

type SplitInformationElements = {
  above: Array<InformationElement>;
  visible: Array<InformationElement>;
  below: Array<InformationElement>;
};

function splitInformationElementsByVisibleRange(
  informationElements: Array<InformationElement>,
  visibleRange: VisibleLineRange | undefined
): SplitInformationElements {
  const result: SplitInformationElements = {
    above: [],
    visible: [],
    below: [],
  };

  if (visibleRange == null) {
    result.visible.push(...informationElements);
    return result;
  }

  for (const element of informationElements) {
    switch (element.type) {
      case "suggestion": {
        if (element.codeAssist.suggestionLine < visibleRange.firstLine) {
          result.above.push(element);
        } else if (visibleRange.lastLine < element.codeAssist.suggestionLine) {
          result.below.push(element);
        } else {
          result.visible.push(element);
        }
        break;
      }
      case "function": {
        if (element.endLine < visibleRange.firstLine) {
          result.above.push(element);
        } else if (visibleRange.lastLine < element.startLine) {
          result.below.push(element);
        } else {
          result.visible.push(element);
        }
        break;
      }
    }
  }

  return result;
}

export function getSuggestionLabel(count: number) {
  return count === 1 ? `1 suggestion` : `${count} suggestions`;
}

export const InformationElementsView: React.FC<{
  informationElements: Array<InformationElement>;
  visibleLineRange: { firstLine: number; lastLine: number };
  selectedElementId: string | undefined;
  selectedElementDiff: string | undefined;
}> = ({
  informationElements,
  selectedElementId,
  selectedElementDiff,
  visibleLineRange,
}) => {
  if (informationElements.length === 0) {
    return (
      <div className="no-suggestions-message">
        Looks great! No suggestions available.
      </div>
    );
  }

  const informationElementsByRange = splitInformationElementsByVisibleRange(
    informationElements,
    visibleLineRange
  );

  informationElementsByRange.visible = _.sortBy(
    informationElementsByRange.visible,
    (informationElement) => {
      switch (informationElement.type) {
        case "suggestion":
          return informationElement.codeAssist.suggestionLine;
        case "function":
          return informationElement.startLine;
      }
    }
  );

  const selectedIndex = informationElementsByRange.visible.findIndex(
    (informationElement) => informationElement.id === selectedElementId
  );

  const numberOfSuggestionsAbove = informationElementsByRange.above.filter(
    (informationElement) => informationElement.type === "suggestion"
  ).length;

  const numberOfSuggestionsBelow = informationElementsByRange.below.filter(
    (informationElement) => informationElement.type === "suggestion"
  ).length;

  return (
    <>
      {numberOfSuggestionsAbove > 0 && (
        <div className="more-suggestions-indicator">
          ⬆ {getSuggestionLabel(numberOfSuggestionsAbove)} above
        </div>
      )}
      {informationElementsByRange.visible.map((informationElement, i) => {
        const isSelected = i === selectedIndex;

        const sendClearHighlights = () => {
          vscodeApi.postMessage({
            type: "clearHighlights",
          });
        };

        const sendSelectElement = () => {
          vscodeApi.postMessage({
            type: "selectElement",
            elementId: informationElement.id,
          });
        };

        if (informationElement.type === "suggestion") {
          const codeAssist = informationElement.codeAssist;

          const postMessage = (type: string) => {
            vscodeApi.postMessage({ type, codeAssist });
          };

          const sendCodeAssistHighlight = () => {
            vscodeApi.postMessage({
              type: "highlight",
              highlightRanges: codeAssist.highlightRanges,
            });
          };

          return isSelected ? (
            <ExpandedSuggestionView
              key={informationElement.id}
              suggestion={codeAssist}
              diff={selectedElementDiff}
              onClick={_.noop}
              onClickApply={() => postMessage("executeCodeAssistAction")}
              onMouseEnter={sendCodeAssistHighlight}
              onMouseLeave={sendClearHighlights}
            />
          ) : (
            <CollapsedSuggestionView
              key={informationElement.id}
              suggestion={codeAssist}
              onClick={sendSelectElement}
              onClickApply={() => postMessage("executeCodeAssistAction")}
              onMouseEnter={sendCodeAssistHighlight}
              onMouseLeave={sendClearHighlights}
            />
          );
        }

        if (informationElement.type === "function") {
          const sendFunctionHighlight = () => {
            vscodeApi.postMessage({
              type: "highlight",
              highlightRanges: [
                {
                  start: informationElement.functionElement.nameStart,
                  end: informationElement.functionElement.nameEnd,
                },
              ],
            });
          };

          return isSelected ? (
            <ExpandedFunctionView
              key={informationElement.id}
              element={informationElement.functionElement}
              onMouseEnter={sendFunctionHighlight}
              onMouseLeave={sendClearHighlights}
            />
          ) : (
            <CollapsedFunctionView
              key={informationElement.id}
              element={informationElement.functionElement}
              onClick={() => {
                sendSelectElement();

                // TODO make this part of select element:
                vscodeApi.postMessage({
                  type: "revealLine",
                  line: informationElement.startLine,
                });
              }}
              onMouseEnter={sendFunctionHighlight}
              onMouseLeave={sendClearHighlights}
            />
          );
        }

        return null;
      })}
      {numberOfSuggestionsBelow > 0 && (
        <div className="more-suggestions-indicator">
          ⬇ {getSuggestionLabel(numberOfSuggestionsBelow)} below
        </div>
      )}
      <div className="feedback">
        <a href="https://github.com/p42ai/js-assistant/issues">Give feedback</a>
      </div>
    </>
  );
};
