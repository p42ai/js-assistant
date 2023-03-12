import React from "react";
import { VisibleLineRange } from "./VisibleLineRange";

export const FileHeader: React.FC<{
  shortFileName: string | undefined;
  visibleLineRange: VisibleLineRange | undefined;
  onClickScan: () => void;
}> = ({ shortFileName, visibleLineRange, onClickScan }) => (
  <div className="file-header">
    <div>
      <div className="filename">{shortFileName}</div>
      {visibleLineRange != null && (
        <div className="lines">
          Lines {visibleLineRange.firstLine} to {visibleLineRange.lastLine}
        </div>
      )}
    </div>
    <div>
      <button className="muted" onClick={onClickScan}>
        Scan
      </button>
    </div>
  </div>
);
