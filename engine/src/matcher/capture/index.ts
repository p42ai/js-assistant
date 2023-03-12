import ts from "typescript";
import {
  createIsNodeStructureEqual,
  IsNodeStructureEqualOptions,
} from "../../ast/isNodeStructureEqual.generated";
import { Context } from "../engine/Context";
import { SetCapture } from "./SetCapture";
import { StackCapture } from "./StackCapture";
import { TemporaryValue } from "./TemporaryValue";
import { ValueCapture } from "./ValueCapture";

export function node<T extends ts.Node | undefined>(
  options?: IsNodeStructureEqualOptions | undefined
) {
  return new ValueCapture<T, Context>(createIsNodeStructureEqual(options));
}

export function nodeStack<T extends ts.Node>(
  options?: IsNodeStructureEqualOptions | undefined
) {
  return new StackCapture<T, Context>(createIsNodeStructureEqual(options));
}

export function set<T>() {
  return new SetCapture<T>();
}

export function value<T>() {
  return new ValueCapture<T, Context>();
}

export function temporaryValue<T>() {
  return new TemporaryValue<T>();
}

export { Capture } from "./Capture";
export { TemporaryValue } from "./TemporaryValue";
export { ValueCapture } from "./ValueCapture";
export { ValueContainer } from "./ValueContainer";
