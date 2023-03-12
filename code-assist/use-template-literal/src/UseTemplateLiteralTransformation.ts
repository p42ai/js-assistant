
import {
  ActionZone,
  checkMerge,
  CodeAssistLevel,
  createActionZones,
  escapeTextForTemplate,
  getRawText,
  isSingleQuote,
  NodeRange,
  octalEscapeSequence,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { UseTemplateLiteralCandidate } from "./UseTemplateLiteralCandidate";

export class UseTemplateLiteralTransformation extends Transformation<UseTemplateLiteralCandidate> {
  async apply(match: UseTemplateLiteralCandidate, tree: TransformedNodeTree) {
    const { parts } = match.captures;

    const replacementBuilder = new ReplacementBuilder(tree);
    for (const part of parts) {
      replacementBuilder.consume(part);
    }

    const replacement = replacementBuilder.produceReplacement();
    if (replacement != null) {
      tree.replace(match.node, replacement);
    }
  }

  analyzeSafety(match: UseTemplateLiteralCandidate) {
    return Safety.safe();
  }

  getSuggestion(
    match: UseTemplateLiteralCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description: `You can merge a concatenation expression into a single ${match.data.target}.`,
      highlightRanges: [NodeRange.node(match.node)],
    };
  }

  getActionZones(
    match: UseTemplateLiteralCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(`Merge into single ${match.data.target}`, [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}

type Replacement =
  | ts.StringLiteral
  | ts.NoSubstitutionTemplateLiteral
  | ts.TemplateExpression
  | undefined;

interface ReplacementBuilderState {
  consume(part: ts.Expression, builder: ReplacementBuilder): void;

  produceReplacement(): Replacement;
}

class EmptyReplacementBuilderState implements ReplacementBuilderState {
  consume(part: ts.Expression, builder: ReplacementBuilder): void {
    if (ts.isStringLiteral(part)) {
      builder.moveToStringState(part);
    } else if (ts.isNoSubstitutionTemplateLiteral(part)) {
      builder.moveToNoSubstitutionTemplateState(undefined, part);
    } else {
      builder.moveToTemplateState(undefined, part);
    }
  }

  produceReplacement(): undefined {
    return undefined;
  }
}

class StringLiteralReplacementBuilderState implements ReplacementBuilderState {
  #text: string;
  #isSingleQuote: boolean | undefined;
  #tree: TransformedNodeTree;

  constructor(part: ts.StringLiteral, tree: TransformedNodeTree) {
    this.#tree = tree;
    this.#isSingleQuote = isSingleQuote(part, this.#tree);
    this.#text = getRawText(part, this.#tree);
  }

  consume(part: ts.Expression, builder: ReplacementBuilder): void {
    if (ts.isStringLiteral(part)) {
      const text = getRawText(part, this.#tree);
      if (checkMerge(octalEscapeSequence, this.#text, text)) {
        this.#text += text;
      } else {
        builder.moveToTemplateState(this.#text, part);
      }
    } else if (ts.isNoSubstitutionTemplateLiteral(part)) {
      builder.moveToNoSubstitutionTemplateState(this.#text, part);
    } else {
      builder.moveToTemplateState(this.#text, part);
    }
  }

  produceReplacement(): ts.StringLiteral {
    return this.#tree.createStringLiteral({
      text: this.#text,
      isSingleQuote: this.#isSingleQuote,
    });
  }
}

class NoSubstitutionTemplateLiteralReplacementBuilderState
  implements ReplacementBuilderState
{
  #text: string;
  #tree: TransformedNodeTree;

  constructor(
    precedingText: string | undefined,
    part: ts.NoSubstitutionTemplateLiteral,
    tree: TransformedNodeTree
  ) {
    this.#tree = tree;
    this.#text = escapeTextForTemplate(precedingText ?? "") + getRawText(part);
  }

  consume(part: ts.Expression, builder: ReplacementBuilder): void {
    if (ts.isStringLiteral(part)) {
      this.#text += escapeTextForTemplate(getRawText(part, this.#tree));
    } else if (ts.isNoSubstitutionTemplateLiteral(part)) {
      this.#text += getRawText(part);
    } else {
      builder.moveToTemplateState(this.#text, part);
    }
  }

  produceReplacement(): ts.NoSubstitutionTemplateLiteral {
    return this.#tree.markNewNode(
      ts.factory.createNoSubstitutionTemplateLiteral(this.#text)
    );
  }
}

class TemplateLiteralReplacementBuilderState
  implements ReplacementBuilderState
{
  #head: ts.TemplateHead;
  #spans: Array<ts.TemplateSpan> = [];

  #currentExpression: ts.Expression;
  #currentText: string | undefined;

  #tree: TransformedNodeTree;

  constructor(
    leadingText: string | undefined,
    expression: ts.Expression,
    tree: TransformedNodeTree
  ) {
    this.#tree = tree;

    if (ts.isTemplateExpression(expression)) {
      this.#head =
        leadingText === undefined
          ? tree.markOriginalNode(expression.head)
          : tree.markNewNode(
              ts.factory.createTemplateHead(
                escapeTextForTemplate(leadingText ?? "") +
                  getRawText(expression.head)
              )
            );

      const spans = expression.templateSpans;
      this.#spans = spans
        .slice(0, expression.templateSpans.length - 1)
        .map((span) => tree.markOriginalNode(span));

      const tailSpan = spans[spans.length - 1];
      this.#currentText = getRawText(tailSpan.literal);
      this.#currentExpression = tailSpan.expression;
    } else {
      this.#head = tree.markNewNode(
        ts.factory.createTemplateHead(escapeTextForTemplate(leadingText ?? ""))
      );

      this.#currentExpression = expression;
      this.#currentText = undefined;
    }
  }

  #addCurrentValuesAsSpan(tail = false) {
    const text = this.#currentText ?? "";

    this.#spans.push(
      this.#tree.markNewNode(
        ts.factory.createTemplateSpan(
          this.#tree.markOriginalNode(this.#currentExpression),
          this.#tree.markNewNode(
            tail
              ? ts.factory.createTemplateTail(text)
              : ts.factory.createTemplateMiddle(text)
          )
        )
      )
    );
  }

  #addText(
    part: ts.StringLiteral | ts.NoSubstitutionTemplateLiteral | ts.TemplateHead
  ) {
    const text = ts.isStringLiteral(part)
      ? escapeTextForTemplate(getRawText(part, this.#tree))
      : getRawText(part);

    if (this.#currentText === undefined) {
      this.#currentText = text;
    } else if (checkMerge(octalEscapeSequence, this.#currentText, text)) {
      this.#currentText += text;
    } else {
      if (ts.isTemplateHead(part)) {
        part = this.#tree.createStringLiteral({
          text,
        });
      }

      this.#addCurrentValuesAsSpan();
      this.#currentExpression = part;
      this.#currentText = undefined;
    }
  }

  consume(part: ts.Expression, builder: ReplacementBuilder): void {
    if (ts.isStringLiteral(part) || ts.isNoSubstitutionTemplateLiteral(part)) {
      this.#addText(part);
    } else if (ts.isTemplateExpression(part)) {
      this.#addText(part.head);
      this.#addCurrentValuesAsSpan();

      const spans = part.templateSpans;
      for (let i = 0; i < spans.length - 1; i++) {
        this.#spans.push(this.#tree.markOriginalNode(spans[i]));
      }

      const tailSpan = spans[spans.length - 1];
      this.#currentText = getRawText(tailSpan.literal);
      this.#currentExpression = tailSpan.expression;
    } else {
      // new expression: need to add current expression as span
      this.#addCurrentValuesAsSpan();
      this.#currentExpression = part;
      this.#currentText = undefined;
    }
  }

  produceReplacement(): ts.TemplateExpression {
    this.#addCurrentValuesAsSpan(true);

    return this.#tree.markNewNode(
      ts.factory.createTemplateExpression(this.#head, this.#spans)
    );
  }
}

class ReplacementBuilder {
  #state: ReplacementBuilderState = new EmptyReplacementBuilderState();
  #tree: TransformedNodeTree;

  constructor(tree: TransformedNodeTree) {
    this.#tree = tree;
  }

  consume(part: ts.Expression) {
    this.#state.consume(part, this);
  }

  produceReplacement(): Replacement {
    return this.#state.produceReplacement();
  }

  moveToNoSubstitutionTemplateState(
    precedingText: string | undefined,
    part: ts.NoSubstitutionTemplateLiteral
  ) {
    this.#state = new NoSubstitutionTemplateLiteralReplacementBuilderState(
      precedingText,
      part,
      this.#tree
    );
  }

  moveToStringState(part: ts.StringLiteral) {
    this.#state = new StringLiteralReplacementBuilderState(part, this.#tree);
  }

  moveToTemplateState(precedingText: string | undefined, part: ts.Expression) {
    this.#state = new TemplateLiteralReplacementBuilderState(
      precedingText,
      part,
      this.#tree
    );
  }
}
