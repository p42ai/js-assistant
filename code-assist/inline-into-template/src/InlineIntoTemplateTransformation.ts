
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  getRawText,
  matchers as m,
  NodeRange,
  Range,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { InlineIntoTemplateCandidate } from "./InlineIntoTemplateCandidate";

const { constraint } = m;

export class InlineIntoTemplateTransformation extends Transformation<InlineIntoTemplateCandidate> {
  async apply(match: InlineIntoTemplateCandidate, tree: TransformedNodeTree) {
    const templateExpression = match.node.parent;
    const innerExpression = match.captures.expression;
    const templateSpans = templateExpression.templateSpans.slice();
    const spanIndex = templateSpans.indexOf(match.node);
    const rawHeadText = getRawText(templateExpression.head);
    const rawLiteralText = getRawText(match.node.literal);
    const isFirstSpan = spanIndex === 0;
    const isLastSpan = spanIndex === templateSpans.length - 1;
    let { head } = templateExpression;

    if (
      ts.isStringLiteral(innerExpression) ||
      ts.isNoSubstitutionTemplateLiteral(innerExpression)
    ) {
      const rawText = getRawText(innerExpression, tree);

      // change TemplateExpression into NoSubstitutionLiteral when there are no spans left after inlining:
      if (templateSpans.length === 1) {
        const replacement = tree.createNoSubstitutionTemplateLiteral({
          text: rawHeadText + rawText + rawLiteralText,
        });

        tree.replace(templateExpression, replacement);

        return;
      }

      if (isFirstSpan) {
        // merge into template head if position is zero:
        head = tree.updateTemplateHead(templateExpression.head, {
          text: rawHeadText + rawText + rawLiteralText,
        });
        templateSpans.splice(spanIndex, 1);
      } else {
        // merge into previous span
        const previousSpan = templateSpans[spanIndex - 1];
        const replacementText =
          getRawText(previousSpan.literal) + rawText + rawLiteralText;

        templateSpans.splice(
          spanIndex - 1,
          2,
          tree.updateTemplateSpan(previousSpan, {
            literal: isLastSpan
              ? tree.createTemplateTail({
                  text: replacementText,
                })
              : tree.createTemplateMiddle({
                  text: replacementText,
                }),
          })
        );
      }
    } else {
      const innerSpans = innerExpression.templateSpans;
      const lastInnerSpan = innerSpans[innerSpans.length - 1];
      const rawInnerHeadText = getRawText(innerExpression.head);
      const rawInnerTailText = getRawText(lastInnerSpan.literal);

      // merge head text into previous span
      if (isFirstSpan) {
        head = tree.updateTemplateHead(templateExpression.head, {
          text: rawHeadText + rawInnerHeadText,
        });
      }

      templateSpans.splice(
        isFirstSpan ? spanIndex : spanIndex - 1,
        isFirstSpan ? 1 : 2,
        ...(isFirstSpan
          ? []
          : [
              tree.updateTemplateSpan(templateSpans[spanIndex - 1], {
                literal: tree.createTemplateMiddle({
                  text:
                    getRawText(templateSpans[spanIndex - 1].literal) +
                    rawInnerHeadText,
                }),
              }),
            ]),
        ...innerSpans.slice(0, innerSpans.length - 1),
        tree.updateTemplateSpan(lastInnerSpan, {
          literal: isLastSpan
            ? tree.createTemplateTail({
                text: rawInnerTailText + rawLiteralText,
              })
            : tree.createTemplateMiddle({
                text: rawInnerTailText + rawLiteralText,
              }),
        })
      );
    }

    tree.replace(
      templateExpression,
      tree.updateTemplateExpression(templateExpression, {
        head,
        templateSpans,
      })
    );
  }

  analyzeSafety(match: InlineIntoTemplateCandidate): Safety {
    return constraint.isInTaggedTemplate(match.node.parent)
      ? Safety.warning("can change tagged template parameter values")
      : Safety.safe();
  }

  getSuggestion(
    match: InlineIntoTemplateCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    const innerExpression = match.node.expression;

    return {
      description: `You can inline '${match.node.expression.getText()}' into the outer template literal.`,
      shortActionLabel: "Inline",
      highlightRanges: [
        new Range(innerExpression.getStart() - 2, innerExpression.end + 1),
      ],
    };
  }

  getActionZones(
    match: InlineIntoTemplateCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Inline into template", [
      {
        range: NodeRange.node(match.node.expression),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
