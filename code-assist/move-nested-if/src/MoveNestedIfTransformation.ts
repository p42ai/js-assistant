
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  Safety,
  SafetyMessageList,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { MoveNestedIfMatch } from "./MoveNestedIfMatch";

export class MoveNestedIfTransformation extends Transformation<MoveNestedIfMatch> {
  async apply(match: MoveNestedIfMatch, tree: TransformedNodeTree) {
    const { innerThenElse, innerElseThen, innerElseElse } = match;
    const { innerThenIf, innerThenIfCondition } = match.captures;
    const outerIf = match.node;

    const outerIfExpressionClone = tree.copy(outerIf.expression);

    tree.replace(
      outerIf,
      tree.updateIfStatement(outerIf, {
        expression: innerThenIfCondition,
        thenStatement:
          ts.isBlock(outerIf.thenStatement) || !match.hasInnerElse()
            ? outerIf.thenStatement
            : tree.createBlock({ statements: [outerIf.thenStatement] }),
        elseStatement: match.hasInnerElse()
          ? tree.createBlock({
              statements: [
                tree.createIfStatement({
                  expression: outerIfExpressionClone,
                  thenStatement:
                    innerThenElse == null
                      ? tree.createBlock({ statements: [] })
                      : ts.isBlock(innerThenElse)
                      ? innerThenElse
                      : tree.createBlock({ statements: [innerThenElse] }),
                  elseStatement: innerElseElse,
                }),
              ],
            })
          : null,
      })
    );

    tree.replace(
      innerThenIf,
      tree.updateIfStatement(innerThenIf, {
        expression: outerIf.expression,
        elseStatement: innerElseThen ?? null,
      })
    );

    return EditorOperation.compose(
      this.moveSelection(match, tree),
      EditorOperation.highlightNodes(
        tree,
        innerThenIfCondition,
        outerIf.expression,
        match.hasInnerElse() ? outerIfExpressionClone : undefined
      )
    );
  }

  private moveSelection(match: MoveNestedIfMatch, tree: TransformedNodeTree) {
    const { innerThenIf } = match.captures;
    const outerIf = match.node;

    const selectionStart = match.context.selectedRange?.start;

    if (selectionStart == null) {
      return undefined;
    }

    if (match.outerIfActionRange.containsPosition(selectionStart)) {
      // move to first inner if:
      return EditorOperation.keepExistingSelection(
        tree,
        outerIf,
        innerThenIf,
        match.context
      );
    }

    if (match.innerThenIfActionRange.containsPosition(selectionStart)) {
      // move to outer if:
      return EditorOperation.keepExistingSelection(
        tree,
        innerThenIf,
        outerIf,
        match.context
      );
    }

    if (match.innerElseIfActionRange?.containsPosition(selectionStart)) {
      // move to outer if:
      return EditorOperation.keepExistingSelection(
        tree,
        match.innerElseIf!,
        outerIf,
        match.context
      );
    }
  }

  analyzeSafety(match: MoveNestedIfMatch): Safety {
    const messages = new SafetyMessageList();

    return messages.produceUnknown();
  }

  getActionZones(
    match: MoveNestedIfMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return [
      ...createActionZones(
        "Push into nested if",
        [
          {
            range: match.outerIfActionRange,
            level: CodeAssistLevel.QuickFix,
          },
        ],
        0
      ),
      ...createActionZones(
        "Pull up nested if",
        [
          {
            range: match.innerThenIfActionRange,
            level: CodeAssistLevel.QuickFix,
          },
          match.innerElseIfActionRange != null
            ? {
                range: match.innerElseIfActionRange,
                level: CodeAssistLevel.QuickFix,
              }
            : undefined,
        ],
        1
      ),
    ];
  }
}
