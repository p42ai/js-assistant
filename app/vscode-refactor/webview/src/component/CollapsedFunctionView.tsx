import * as p42 from "@p42/engine";
import React from "react";

// TODO calculate in extension and send in as flag?
const ERROR_THRESHOLD = 200;

function createSizeIcon(size: number): JSX.Element | undefined {
  return size >= ERROR_THRESHOLD ? (
    <i className="codicon codicon-note error-icon" />
  ) : undefined;
}

export const CollapsedFunctionView: React.FC<{
  element: p42.FunctionElement;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}> = ({ element, onClick, onMouseEnter, onMouseLeave }) => (
  <div
    className="information-element collapsed"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="information-element-type-icon">
      <i className="codicon codicon-symbol-method" />
    </div>
    <div className="information-element-title">{element.name}()</div>
    <span className="information-element-markers">
      {createSizeIcon(element.metrics.size)}
    </span>
  </div>
);
