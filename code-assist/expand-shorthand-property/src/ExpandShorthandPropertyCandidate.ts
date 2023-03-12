import { Match } from "@p42/engine";
import ts from "typescript";

export interface ExpandShorthandPropertyCandidate
  extends Match<
    ts.ShorthandPropertyAssignment | ts.BindingElement,
    {
      identifierName: string;
    },
    undefined
  > {}
