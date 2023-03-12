import ts from "typescript";
import { Context } from "../../matcher/engine/Context";
import { AugmentationErrorHandler } from "../AugmentationErrorHandler";
import { SourceFileAugmentation } from "../SourceFileAugmentation";
import { CommentSet } from "./CommentSet";
import { parseComments } from "./parseComments";

export const CommentAugmentation = new SourceFileAugmentation<CommentSet>(
  "comment",

  (ast: ts.SourceFile, context: Context, logger: AugmentationErrorHandler) => {
    return parseComments(ast.getFullText());
  }
);
