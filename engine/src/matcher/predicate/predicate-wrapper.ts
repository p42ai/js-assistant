import * as _ from "lodash";
import { getId } from "../../ast/getId";
import { Predicate } from "./Predicate";

let counter = 0;

let debugMode = false;

let tree: any;

let stack: any[];

export function enableTransformationDebugging() {
  tree = { children: [] };
  stack = [tree];
  debugMode = true;
  counter = 0;
}

export function getTree() {
  return tree.children[0]; // there is one root predicate as entry point to a patternmatcher
}

export function define<T, CONTEXT>(
  name: string,
  f: Predicate<T, CONTEXT>
): Predicate<T, CONTEXT> {
  if (!debugMode) {
    return f;
  }

  const wrapper = (value: T, context: CONTEXT): boolean => {
    const valueAny = value as any;

    let valueText = "";
    let type: any = undefined;

    if (_.isString(value)) {
      valueText = `"${value}"`;
      type = "String";
    }

    const id = getId(valueAny);
    if (id != null) {
      valueText = id;
      type = "Node";
    }

    const current: any = {
      name,
      match: undefined,
      type,
      valueText,
      children: [],
    };

    const parent = stack[stack.length - 1];
    parent.children.push(current);

    stack.push(current);
    const match = f(value, context);
    stack.pop();

    current.match = match;

    return match;
  };

  // for better debugging output change the toString functions
  f.toString = () => name;
  wrapper.toString = () => `wrap(${name})`;

  return wrapper;
}
