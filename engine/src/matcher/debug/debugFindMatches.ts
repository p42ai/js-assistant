import ts from "typescript";
import { getId } from "../../ast/getId";
import { CodeAssistType } from "../../code-assist/CodeAssistType";
import { Context } from "../engine/Context";
import { PatternMatcherEngine } from "../engine/PatternMatcherEngine";
import {
  enableTransformationDebugging,
  getTree,
} from "../predicate/predicate-wrapper";

export type DebugResult = {
  match: boolean;
  matchDebugTree: any;
};

function createDebugTreeNode(
  node: ts.Node,
  context: Context,
  transformationClass: any
): DebugResult {
  enableTransformationDebugging();
  const transformation = new transformationClass() as CodeAssistType<any>;
  const match = transformation.matcher.matchPattern(node, context);
  const matchDebugTree = getTree();

  return {
    match: match != null,
    matchDebugTree,
  };
}

export function convertToDebugTree(
  engine: PatternMatcherEngine,
  context: Context,
  transformationClass: any
): Record<string, DebugResult> {
  const transformation = new transformationClass() as CodeAssistType<any>;
  const candidates = engine.getCandidates(transformation.matcher.candidates);
  const evaluatedNodes: Record<string, any> = {};

  for (const candidate of candidates) {
    evaluatedNodes[`${getId(candidate)}`] = createDebugTreeNode(
      candidate,
      context,
      transformationClass
    );
  }

  return evaluatedNodes;
}
