import ts from "typescript";
import { FunctionLike } from "../ast/FunctionLike";

export type calculateNodeMetric<NODE_TYPE extends ts.Node> = (
  node: NODE_TYPE
) => number;
