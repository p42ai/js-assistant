import * as p42 from "@p42/engine";
import React from "react";

export const ExpandedFunctionView: React.FC<{
  element: p42.FunctionElement;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ element, onMouseEnter, onMouseLeave }) => {
  // TODO reuse ERROR_THRESHOLD from CollapsedFunctionView
  return (
    <div
      className="information-element expanded"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="information-element-title">{element.name}()</div>
      {element.metrics.size >= 200 && (
        <div>
          {" "}
          <i
            className="codicon codicon-note error-icon"
            style={{ verticalAlign: "sub", marginRight: "8px" }}
          />
          <b>This is a big function</b>. Big functions are harder to understand
          and change. You can refactor it, e.g., by extracting some of its logic
          into new functions.
        </div>
      )}
    </div>
  );
};
