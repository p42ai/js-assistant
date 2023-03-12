
import { matchers as m, PatternMatcher } from "@p42/engine";
import ts from "typescript";
import { ConvertArrayTypeToGenericArrayMatch } from "./ConvertArrayTypeToGenericArrayMatch";

const { ast } = m;

export class ConvertArrayTypeToGenericArrayMatcher extends PatternMatcher<ConvertArrayTypeToGenericArrayMatch> {
  candidates = {
    nodes: [ts.SyntaxKind.ArrayType],
  };

  constructor() {
    super(ConvertArrayTypeToGenericArrayMatch);
  }

  createPattern() {
    const captures = {};

    return {
      match: ast.arrayType(),
      captures,
    };
  }
}
