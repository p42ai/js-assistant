import ts from "typescript";
import { getSyntaxKindLabel } from "./getSyntaxKindLabel";

export function getCommentId(comment: ts.CommentRange): string {
  return `${comment.pos}-${comment.end}-${getSyntaxKindLabel(comment.kind)}`;
}
