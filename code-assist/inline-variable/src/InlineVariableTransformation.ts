
import {
  ActionZone,
  BindingElement,
  CodeAssistLevel,
  composeCountLabel,
  createActionZones,
  EditorOperation,
  hasDescendant,
  isConstantExpression,
  matchers as m,
  Node,
  NodeRange,
  Safety,
  SafetyMessageList,
  Suggestion,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationList,
} from "@p42/engine";
import ts from "typescript";
import { InlineVariableMatch } from "./InlineVariableMatch";

const { ast } = m;

export class InlineVariableTransformation extends Transformation<InlineVariableMatch> {
  async apply(match: InlineVariableMatch, tree: TransformedNodeTree) {
    const { binding } = match.captures;

    tree.remove(match.node);

    const highlightedNodes: Array<ts.Node> = [];
    for (const reference of binding.readReferences) {
      // create for each reference replacement to have separate nodes:
      const inlineExpression = match.createInlineExpression(tree);

      const { identifier } = reference;

      const replacement = ts.isShorthandPropertyAssignment(identifier.parent)
        ? tree.createPropertyAssignment({
            name: tree.copy(identifier),
            initializer: inlineExpression,
          })
        : inlineExpression;

      tree.replace(identifier, replacement);
      highlightedNodes.push(replacement);
    }

    return EditorOperation.compose(
      EditorOperation.highlightNodes(tree, ...highlightedNodes)
    );
  }

  analyzeSafety(match: InlineVariableMatch): Safety {
    const messages = new SafetyMessageList();

    const {
      initializer,
      context,
      captures: { variableStatement },
    } = match;

    if (Node.isExported(variableStatement)) {
      // only warn, not error, because it is not certain that something will break:
      messages.warning("removes export");
    }

    const { declarationList } = match.captures.variableStatement;
    if (VariableDeclarationList.isVar(declarationList)) {
      messages.warning("var could be accessed before initialization");
    }

    if (
      VariableDeclarationList.isGlobalVarDeclarationList(
        declarationList,
        context
      )
    ) {
      messages.warning("could remove global variable");
    }

    if (
      match.isInlineFromDestructuring &&
      ts.isBindingElement(match.node) &&
      BindingElement.hasDefault(match.node)
    ) {
      messages.error("removes default application");
    }

    if (match.hasType) {
      messages.information("removes type");
    }

    // TODO can destructuring be safe? how to analyze?
    if (!match.isInlineFromDestructuring) {
      if (
        isConstantExpression(initializer, context) ||
        match.isSafelyInlineableThisReference
      ) {
        return messages.produceSafe();
      }

      if (ts.isIdentifier(initializer)) {
        const binding = context.getBinding(initializer);

        if (binding != null) {
          if (binding.isGlobal) {
            messages.warning(
              `'${initializer.text}' is global and could be modified`
            );
          } else if (!binding.isConstant) {
            messages.warning(`'${initializer.text}' could be modified`);
          } else {
            return messages.produceSafe();
          }
        }
      }
    }

    // expression contains 'this' and is used in a different function context:
    if (
      hasDescendant(initializer, ast.thisExpression(), context) &&
      !match.hasSingleThisScope
    ) {
      messages.error("inlining 'this' into function changes its value");
    }

    if (match.data.readReferenceCount > 1) {
      if (ts.isCallExpression(initializer)) {
        // TODO what about nested call expressions, e.g. inside
        // binary expression
        messages.warning("increases number of function calls");
      } else if (
        ts.isNewExpression(initializer) ||
        ts.isArrayLiteralExpression(initializer) ||
        ts.isObjectLiteralExpression(initializer)
      ) {
        messages.warning("creates multiple objects");
      }

      return messages.produceUnknown();
    }

    // TODO inline into loop changes # of calls

    // TODO when there is only 1 destructured variable, then this could be safe
    if (match.isImmediatelyReturned && !match.isInlineFromDestructuring) {
      return messages.produceSafe();
    }

    // TODO intermediate statements might affect how variable is calculated
    return messages.produceUnknown();
  }

  getSuggestion(match: InlineVariableMatch, safety: Safety): Suggestion | null {
    if (
      !safety.isSafe() ||
      !(
        match.isImmediatelyReturned ||
        match.isSafelyInlineableThisReference ||
        ts.isIdentifier(match.initializer)
      )
    ) {
      return null;
    }

    return {
      description: `You can inline ${composeCountLabel(
        match.data.readReferenceCount,
        "occurrences"
      )} of '${match.captures.binding.name}'${
        match.isImmediatelyReturned ? " that is immediately returned" : ""
      }.`,
      shortActionLabel: "Inline",
      highlightRanges: match.captures.binding.references.map((reference) =>
        NodeRange.node(reference.identifier)
      ),
    };
  }

  getActionZones(
    match: InlineVariableMatch,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones(
      `Inline ${composeCountLabel(
        match.data.readReferenceCount,
        "occurrences"
      )}`,
      [
        {
          range: NodeRange.node(match.declaringIdentifier),
          // unless suggested, only show inline in the quick-fix menu to prevent
          // it from colliding with quick-fixes from other linters on their warnings and errors.
          level: isSuggestion
            ? CodeAssistLevel.Suggestion
            : CodeAssistLevel.QuickFix,
        },
      ]
    );
  }
}
