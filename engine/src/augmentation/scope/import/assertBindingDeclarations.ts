import * as ts from "typescript";
import { getId } from "../../../ast/getId";
import { Binding } from "../Binding";

export function assertBindingDeclarations(
  binding: Binding | undefined,
  ...expectedDeclarations: Array<ts.Identifier>
) {
  expect(binding).toBeDefined();
  expect(binding!.declaringNodes.map(getId)).toEqual(
    expectedDeclarations.map(getId)
  );
}
