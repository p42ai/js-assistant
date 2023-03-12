import React from "react";

export const LineView: React.FC<{
  label: JSX.Element | string | undefined;
  line: number;
}> = ({ label, line }) => (
  <span className="line">
    {label != null ? <>{label} · </> : ""}
    line {line}
  </span>
);
