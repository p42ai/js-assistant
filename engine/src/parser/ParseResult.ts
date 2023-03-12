import ts from "typescript";
import { TypeSystem } from "../ast/TypeSystem";
import { ScriptRangeWithExtension } from "./file-type/ScriptRange";

export type ParseResult = {
  /**
   * Parsed syntax tree.
   */
  sourceFile: ts.SourceFile;

  typeSystem: TypeSystem;
} & ScriptRangeWithExtension;
