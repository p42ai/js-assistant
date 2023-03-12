import ts from "typescript";
import { toEqualNodeStructure } from "./toEqualNodeStructure";
import { toEqualWithNodeIds } from "./toEqualWithNodeIds";
import { toInclude } from "./toInclude";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      toEqualNodeStructure(expectedNode: ts.Node): R;
      toEqualWithNodeIds(expected: any): R;
      toInclude(expected: any): R;
    }
  }
}

expect.extend({
  toEqualNodeStructure,
  toEqualWithNodeIds,
  toInclude,
});
