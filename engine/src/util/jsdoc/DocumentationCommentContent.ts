export type DocumentationCommentParam = {
  description: string;
  type: string | null;
  name: string;
};

export type DocumentationCommentReturns = {
  description: string;
  type: string | null;
};

export type DocumentationCommentContent = {
  description: string;
  params: Array<DocumentationCommentParam> | null;
  returns: DocumentationCommentReturns | null;
};
