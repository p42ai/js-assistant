
import ts from "typescript";
import { UseEqEqNullCandidate } from "./UseEqEqNullCandidate";

export function getComparison(match: UseEqEqNullCandidate) {
  return match.captures.isNegated
    ? ts.SyntaxKind.ExclamationEqualsToken
    : ts.SyntaxKind.EqualsEqualsToken;
}
