import { Position } from "./Position";

/**
 * VS Code compatible range.
 */
export type Range = {
  start: Position;
  end: Position;
};
