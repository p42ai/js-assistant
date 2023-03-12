import ts from "typescript";
import { getId } from "../ast/getId";
import { AnyMatch } from "../matcher/engine/Match";
import { Transformation } from "../transformation/Transformation";
import { CodeAssistType } from "./CodeAssistType";
import { EmbeddedSource } from "./EmbeddedSource";

// ID: have embedded source id first to make it easy to extract.
export const generateCodeAssistId = (
  embeddedSource: EmbeddedSource,
  codeAssistType: CodeAssistType<AnyMatch>,
  node: ts.Node,
  transformation: Transformation<AnyMatch>
) =>
  `${embeddedSource.index}:${codeAssistType.id}:${getId(node)}:${
    transformation.id
  }`;

export const splitCodeAssistId = (codeAssistId: string) => {
  const [embeddedSourceId, codeAssistTypeId, matchNodeId, transformationId] =
    codeAssistId.split(":");
  return {
    embeddedSourceId,
    codeAssistTypeId,
    matchedNodeId: matchNodeId,
    transformationId,
  };
};

export const getEmbeddedSourceIndex = (codeAssistId: string) =>
  +codeAssistId.substring(0, codeAssistId.indexOf(":"));
