import React from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Diff, Hunk, parseDiff } from "react-diff-view";
import { SquigglySeparator } from "./SquigglySeparator";

interface DiffViewProps {
  diff: string;
}

export const DiffView: React.FC<DiffViewProps> = ({ diff }) => {
  return (
    <>
      {parseDiff(diff).map(
        ({
          oldRevision,
          oldPath,
          newRevision,
          type,
          hunks,
        }: {
          oldRevision: any;
          oldPath: any;
          newRevision: any;
          type: any;
          hunks: any;
        }) => (
          <Diff
            key={`${oldRevision}-${newRevision}-unified`}
            viewType="unified"
            gutterType="none"
            diffType={type}
            hunks={hunks}
          >
            {(hunks: any) =>
              hunks.map((hunk: any, index: number) => (
                <>
                  {index > 0 && <SquigglySeparator key={`sep-${index}`} />}
                  <Hunk key={`hunk-${index}`} hunk={hunk} />
                </>
              ))
            }
          </Diff>
        )
      )}
    </>
  );
};
