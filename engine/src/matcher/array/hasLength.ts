import ts from "typescript";

export function hasLength(length: number) {
  return (array: Array<unknown> | ts.NodeArray<any>) => array.length === length;
}
