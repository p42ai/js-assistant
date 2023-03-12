import { Match } from "@p42/engine";
import ts from "typescript";

export interface CollapsePropertyIntoShorthandCandidate
  extends Match<
    ts.PropertyAssignment | ts.BindingElement,
    {
      identifierName: string;
    },
    undefined
  > {}
