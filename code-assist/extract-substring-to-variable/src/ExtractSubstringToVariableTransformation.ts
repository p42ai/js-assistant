
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  factory,
  getBlockChildParent,
  matchers as m,
  NodeRange,
  nameOracle,
  Safety,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import {
  ExtractSubstringToVariableCandidate,
  TemplateSelection,
} from "./ExtractSubstringToVariableCandidate";

const { constraint } = m;

const CAN_CHANGE_TAGGED_TEMPLATE_WARNING = Safety.warning(
  "can change tagged template parameter values"
);

export class ExtractSubstringToVariableTransformation extends Transformation<ExtractSubstringToVariableCandidate> {
  async apply(
    match: ExtractSubstringToVariableCandidate,
    tree: TransformedNodeTree
  ) {
    const matchedNode = match.node;

    const variableName = nameOracle.generateVariableName(
      nameOracle.nameWithIncreasingNumber("extractedText"),
      match.context.getScope(matchedNode)
    );

    // insert variable declaration:
    const declarationIdentifier = tree.createIdentifier({
      text: variableName,
    });

    const statementParent = getBlockChildParent(matchedNode);

    tree.insertStatementsBefore(
      statementParent,
      factory.createSingleVariableStatement({
        flags: ts.NodeFlags.Const,
        name: declarationIdentifier,
        initializer: this.createExtractedSelectionExpression(match, tree),
        tree,
      })
    );

    if (ts.isTemplateExpression(matchedNode)) {
      const { templateSpans } = matchedNode;
      const selection = match.data.selection as TemplateSelection;
      const startIndex = selection.startSpanIndex;
      const startsInHead = startIndex === 0;
      const endIndex = selection.endSpanIndex;
      const endsInTail = endIndex === templateSpans.length - 1;

      const leadingSpans = startsInHead
        ? []
        : [
            ...templateSpans.slice(0, startIndex - 1),
            tree.updateTemplateSpan(templateSpans[startIndex - 1], {
              literal: tree.createTemplateMiddle({
                text: match.data.leadingText,
              }),
            }),
          ];

      const trailingSpans = endsInTail
        ? []
        : templateSpans.slice(selection.endSpanIndex + 1);

      tree.replace(
        matchedNode,
        tree.updateTemplateExpression(matchedNode, {
          head: startsInHead
            ? tree.createTemplateHead({
                text: match.data.leadingText,
              })
            : undefined,
          templateSpans: [
            ...leadingSpans,
            tree.createTemplateSpan({
              expression: tree.createIdentifier({
                text: variableName,
              }),
              literal: endsInTail
                ? tree.createTemplateTail({
                    text: match.data.trailingText,
                  })
                : tree.createTemplateMiddle({
                    text: match.data.trailingText,
                  }),
            }),
            ...trailingSpans,
          ],
        })
      );
    } else if (ts.isTemplateHead(matchedNode)) {
      const templateExpression = matchedNode.parent as ts.TemplateExpression;

      tree.replace(
        templateExpression,
        tree.updateTemplateExpression(templateExpression, {
          head: tree.createTemplateHead({
            text: match.data.leadingText,
          }),
          templateSpans: [
            tree.createTemplateSpan({
              expression: tree.createIdentifier({
                text: variableName,
              }),
              literal: tree.createTemplateMiddle({
                text: match.data.trailingText,
              }),
            }),
          ].concat(templateExpression.templateSpans),
        })
      );
    } else if (
      ts.isTemplateMiddle(matchedNode) ||
      ts.isTemplateTail(matchedNode)
    ) {
      const templateSpan = matchedNode.parent as ts.TemplateSpan;
      const templateExpression = templateSpan.parent;
      const templateSpans = templateExpression.templateSpans.slice();

      const index = templateSpans.indexOf(templateSpan);

      templateSpans.splice(
        index,
        1,
        tree.updateTemplateSpan(templateSpan, {
          literal: ts.isTemplateMiddle(matchedNode)
            ? tree.updateTemplateMiddle(matchedNode, {
                text: match.data.leadingText,
              })
            : tree.createTemplateMiddle({
                text: match.data.leadingText,
              }),
        }),
        tree.createTemplateSpan({
          expression: tree.createIdentifier({
            text: variableName,
          }),
          literal: ts.isTemplateMiddle(matchedNode)
            ? tree.createTemplateMiddle({
                text: match.data.trailingText,
              })
            : tree.updateTemplateTail(matchedNode, {
                text: match.data.trailingText,
              }),
        })
      );

      tree.replace(
        templateExpression,
        tree.updateTemplateExpression(templateExpression, {
          templateSpans,
        })
      );
    } else {
      // replace original string literal with broken-up version:
      tree.replace(
        matchedNode,
        this.createStringLiteralReplacement(match, variableName, tree)
      );
    }

    return EditorOperation.compose(
      EditorOperation.rename(tree.getNodePath(declarationIdentifier))
    );
  }

  private createExtractedSelectionExpression(
    match: ExtractSubstringToVariableCandidate,
    tree: TransformedNodeTree
  ) {
    if (ts.isTemplateExpression(match.node)) {
      const selection = match.data.selection as TemplateSelection;
      const templateSpans = match.node.templateSpans.slice(
        selection.startSpanIndex,
        selection.endSpanIndex + 1
      );

      // update the last span to be the tail
      templateSpans[templateSpans.length - 1] = tree.updateTemplateSpan(
        templateSpans[templateSpans.length - 1],
        {
          literal: tree.createTemplateTail({
            text: selection.trailingText,
          }),
        }
      );

      return tree.createTemplateExpression({
        head: tree.createTemplateHead({
          text: selection.leadingText,
        }),
        templateSpans,
      });
    }

    const selection = match.data.selection as string;

    if (ts.isStringLiteral(match.node)) {
      return tree.createStringLiteral({
        text: selection,
      });
    }

    return tree.createNoSubstitutionTemplateLiteral({
      text: selection,
    });
  }

  private createStringLiteralReplacement(
    match: ExtractSubstringToVariableCandidate,
    variableName: string,
    tree: TransformedNodeTree
  ) {
    const identifier = tree.createIdentifier({
      text: variableName,
    });

    const noLeadingText = match.data.leadingText === "";
    const noTrailingText = match.data.trailingText === "";
    if (noLeadingText && noTrailingText) {
      return identifier;
    }

    return tree.createTemplateExpression({
      head: tree.createTemplateHead({
        text: match.data.leadingText,
      }),
      templateSpans: [
        tree.createTemplateSpan({
          expression: identifier,
          literal: tree.createTemplateTail({
            text: match.data.trailingText,
          }),
        }),
      ],
    });
  }

  analyzeSafety(match: ExtractSubstringToVariableCandidate): Safety {
    const { node } = match;

    if (ts.isNoSubstitutionTemplateLiteral(node)) {
      if (constraint.isInTaggedTemplate(node)) {
        return CAN_CHANGE_TAGGED_TEMPLATE_WARNING;
      }
    } else if (ts.isTemplateExpression(node)) {
      return constraint.isInTaggedTemplate(node)
        ? CAN_CHANGE_TAGGED_TEMPLATE_WARNING
        : Safety.unknown();
    } else if (ts.isTemplateMiddle(node) || ts.isTemplateTail(node)) {
      const templateSpan = node.parent as ts.TemplateSpan;
      if (constraint.isInTaggedTemplate(templateSpan.parent)) {
        return CAN_CHANGE_TAGGED_TEMPLATE_WARNING;
      }
    } else if (ts.isTemplateHead(node)) {
      if (constraint.isInTaggedTemplate(node.parent as ts.TemplateExpression)) {
        return CAN_CHANGE_TAGGED_TEMPLATE_WARNING;
      }
    }

    return Safety.safe();
  }

  getActionZones(
    match: ExtractSubstringToVariableCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Extract selected text into variable", [
      {
        range: NodeRange.node(match.node),
        level: isSuggestion
          ? CodeAssistLevel.Suggestion
          : CodeAssistLevel.PreferredQuickFix,
      },
    ]);
  }
}
