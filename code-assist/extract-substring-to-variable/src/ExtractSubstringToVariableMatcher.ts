
import {
  Context,
  escapeTextForTemplate,
  getRawText,
  getRelativeTextPosition,
  isPositionInsideNodeText,
  matchers as m,
  PatternMatcher,
  predicates as p,
  Range,
} from "@p42/engine";
import ts from "typescript";
import { ExtractSubstringToVariableCandidate } from "./ExtractSubstringToVariableCandidate";
import { getTemplatePartForTextPosition } from "./getTemplatePartForTextPosition";

const { ast, constraint, path } = m;

export class ExtractSubstringToVariableMatcher extends PatternMatcher<ExtractSubstringToVariableCandidate> {
  candidates = {
    nodes: [
      ts.SyntaxKind.StringLiteral,
      ts.SyntaxKind.NoSubstitutionTemplateLiteral,
      ts.SyntaxKind.TemplateHead,
      ts.SyntaxKind.TemplateMiddle,
      ts.SyntaxKind.TemplateTail,
      ts.SyntaxKind.TemplateExpression,
    ],
  };

  createPattern() {
    const captures = {};

    return {
      match: p.and(
        constraint.isRangeSelection,
        p.or(
          p.and(
            constraint.isTextSelection,
            p.or(
              ast.stringLiteral(),
              ast.noSubstitutionTemplateLiteral(),
              ast.templateHead({
                constraints: [path.parent(ts.isTemplateExpression)],
              }),
              ast.templateMiddle({
                constraints: [path.parent(ts.isTemplateSpan)],
              }),
              ast.templateTail({
                constraints: [path.parent(ts.isTemplateSpan)],
              })
            )
          ),
          ast.templateExpression({
            constraints: [
              (node, context) => {
                const range = context.selectedRange!;
                const startNode = getTemplatePartForTextPosition(
                  range.start,
                  node
                );
                const endNode = getTemplatePartForTextPosition(range.end, node);

                return (
                  startNode != null &&
                  isPositionInsideNodeText(range.start, startNode) &&
                  endNode != null &&
                  isPositionInsideNodeText(range.end, endNode)
                );
              },
            ],
          })
        )
      ),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: ExtractSubstringToVariableCandidate["node"],
    captures: ExtractSubstringToVariableCandidate["captures"],
    context: Context
  ): ExtractSubstringToVariableCandidate["data"] {
    const range = context!.selectedRange!;

    if (ts.isTemplateExpression(matchedNode)) {
      return this.deriveMatchedDataFromTemplateExpression(matchedNode, range);
    }

    const text = getRawText(matchedNode);
    const startInLiteral = getRelativeTextPosition(range.start, matchedNode);
    const endInLiteral = getRelativeTextPosition(range.end, matchedNode);

    const escape = ts.isStringLiteral(matchedNode)
      ? escapeTextForTemplate
      : (value: string) => value;

    return {
      leadingText: escape(text.substring(0, startInLiteral)),
      // extracted text is not escaped, since the extracted type is the same as the source type
      selection: text.substring(startInLiteral, endInLiteral),
      trailingText: escape(text.substring(endInLiteral)),
    };
  }

  private deriveMatchedDataFromTemplateExpression(
    templateExpression: ts.TemplateExpression,
    range: Range
  ) {
    const spans = templateExpression.templateSpans;

    const start = this.splitElementAtPosition(templateExpression, range.start);
    const end = this.splitElementAtPosition(templateExpression, range.end);

    return {
      leadingText: start.leadingText,
      selection: {
        leadingText: start.trailingText,
        startSpanIndex: ts.isTemplateHead(start.node)
          ? 0
          : spans.indexOf(start.node.parent as ts.TemplateSpan) + 1,
        endSpanIndex: spans.indexOf(end.node.parent as ts.TemplateSpan),
        trailingText: end.leadingText,
      },
      trailingText: end.trailingText,
    };
  }

  private splitElementAtPosition(
    templateExpression: ts.TemplateExpression,
    position: number
  ) {
    const node = getTemplatePartForTextPosition(position, templateExpression)!;

    const text = getRawText(node);
    const splitIndex = getRelativeTextPosition(position, node);

    return {
      node,
      leadingText: text.substring(0, splitIndex),
      trailingText: text.substring(splitIndex),
    };
  }
}
