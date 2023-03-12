import { InformationElement } from "@p42/app-vscode-shared/build/assistant/InformationElement";
import React from "react";
import { vscodeApi } from "../../vscode/VsCodeApi";
import { FileHeader } from "./FileHeader";
import { InformationElementsView } from "../../component/InformationElementsView";
import { VisibleLineRange } from "./VisibleLineRange";

export const AssistantPanel: React.FC<{
  data:
    | {
        baseUrl: string;
        shortFileName: string;
        isDocumentSupported: boolean;
        informationElements: Array<InformationElement>;
        visibleLineRange: VisibleLineRange;

        selectedElementId: string | undefined;
        selectedElementDiff: string | undefined;
      }
    | undefined;
}> = ({ data }) => {
  if (data == null) {
    return <></>; // not initialized
  }

  const {
    baseUrl,
    isDocumentSupported,
    shortFileName,
    informationElements,
    visibleLineRange,
    selectedElementId,
    selectedElementDiff,
  } = data;

  return (
    <>
      {isDocumentSupported ? (
        <>
          <div className="container top">
            <FileHeader
              shortFileName={shortFileName}
              visibleLineRange={visibleLineRange}
              onClickScan={() => {
                vscodeApi.postMessage({ type: "scanFile" });
              }}
            />
          </div>
          <div className="container content">
            <InformationElementsView
              informationElements={informationElements}
              visibleLineRange={visibleLineRange}
              selectedElementId={selectedElementId}
              selectedElementDiff={selectedElementDiff}
            />
          </div>
        </>
      ) : (
        <div className="container content not-supported-message">
          The content type of{" "}
          {shortFileName != null ? `'${shortFileName}'` : "the active editor"}{" "}
          is unsupported.
        </div>
      )}
    </>
  );
};
