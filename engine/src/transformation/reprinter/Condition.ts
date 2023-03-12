import ts from "typescript";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { ReprintContext } from "./ReprintContext";

type ConditionContext = {
  getNextChild: () => ts.Node;
};

export type Condition = {
  extractCondition: (
    node: ts.Node,
    tree: TransformedNodeTree,
    context: ConditionContext
  ) => boolean;
  emitCondition: (
    node: ts.Node,
    tree: TransformedNodeTree,
    extractionResult: boolean | undefined,
    context: ReprintContext
  ) => boolean;
};

const createBasicCondition = (
  predicate: (node: ts.Node, tree: TransformedNodeTree) => boolean
): Condition => ({
  extractCondition: predicate,
  emitCondition: predicate,
});

export const Conditions = {
  or(condition1: Condition, condition2: Condition): Condition {
    return {
      extractCondition(node, tree, context) {
        return (
          condition1.extractCondition(node, tree, context) ||
          condition2.extractCondition(node, tree, context)
        );
      },
      emitCondition(node, tree, extractionResult, context) {
        return (
          condition1.emitCondition(node, tree, extractionResult, context) ||
          condition2.emitCondition(node, tree, extractionResult, context)
        );
      },
    };
  },

  basic: createBasicCondition,

  hasChild(property: string): Condition {
    return createBasicCondition(
      (node: ts.Node) => (node as any)[property] != null
    );
  },

  hasChildElements(property: string): Condition {
    return createBasicCondition(
      (node: ts.Node) => (node as any)[property]?.length > 0
    );
  },

  hasForcedLeadingNewLine(): Condition {
    return createBasicCondition((node, tree) => tree.hasForcedNewLine(node));
  },

  hasJsxAttributes(property: string): Condition {
    return createBasicCondition(
      (node: ts.Node) =>
        ((node as any)[property] as ts.JsxAttributes).properties.length > 0
    );
  },

  hasTokenAtPosition(tokenKind: ts.TokenSyntaxKind): Condition {
    return {
      extractCondition: (node, tree, context) =>
        context.getNextChild()?.kind === tokenKind,
      emitCondition: (node, tree, extractionResult) => extractionResult ?? true,
    };
  },

  hasTokenKindAtCurrentPosition(
    tokenKind: ts.TokenSyntaxKind,
    emitPredicate: (value: ts.Node) => boolean
  ): Condition {
    return {
      extractCondition: (node, tree, context) =>
        context.getNextChild().kind === tokenKind,
      emitCondition: (
        node: ts.Node,
        tree,
        extractionResult: boolean | undefined
      ) => emitPredicate(node) || extractionResult !== false,
    };
  },

  /**
   * Suppresses synthetic parentheses around optional chaining expression.
   *
   * Workaround to preserved clean optional chaining output after
   * https://github.com/microsoft/TypeScript/pull/50156
   */
  isNotSuppressedSyntheticNode(): Condition {
    return {
      extractCondition() {
        return true;
      },
      emitCondition(node, tree) {
        return !(
          tree.isNodeSynthesizedByTypeScript(node) &&
          ts.isParenthesizedExpression(node) &&
          (ts.isPropertyAccessChain(node.expression) ||
            ts.isCallChain(node.expression) ||
            ts.isElementAccessChain(node.expression))
        );
      },
    };
  },
};
