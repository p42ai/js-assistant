
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  factory,
  getBindings,
  getDeclaredBindings,
  isConstantExpression,
  NodeRange,
  Safety,
  Suggestion,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import _ from "lodash";
import ts from "typescript";
import { getParameterLabel } from "./getParameterLabel";
import { PushParameterIntoIifeCandidate } from "./PushParameterIntoIifeCandidate";

export class PushParameterIntoIifeTransformation extends Transformation<PushParameterIntoIifeCandidate> {
  async apply(
    match: PushParameterIntoIifeCandidate,
    tree: TransformedNodeTree
  ) {
    const parameter = match.node;
    const functionNode = match.captures.function;

    if (match.data.argument != null) {
      tree.remove(match.data.argument);
    }

    tree.remove(parameter);

    // if any of the identifiers inside the parameter has write operations, use 'let'
    const isParameterModified = getDeclaredBindings
      .forBindingName(parameter.name, match.context)
      .some((binding) => !binding.isConstant);

    const variableDeclaration = factory.createSingleVariableStatement({
      flags: isParameterModified ? ts.NodeFlags.Let : ts.NodeFlags.Const,
      name: parameter.name,
      type: parameter.type,
      initializer:
        match.data.argument ??
        factory.createUndefined(tree, match.context.getScope(functionNode)),
      tree,
    });

    const { body } = functionNode;
    if (ts.isBlock(body)) {
      tree.insertStatement(body, variableDeclaration, 0);
    } else {
      tree.replace(
        body,
        tree.createBlock({
          statements: [
            variableDeclaration,
            tree.createReturnStatement({
              expression: body,
            }),
          ],
        })
      );
    }
  }

  analyzeSafety(match: PushParameterIntoIifeCandidate): Safety {
    const { context } = match;
    const { argument } = match.data;

    if (argument == null) {
      return Safety.safe();
    }

    // conflicting bindings:
    const scope = context.getScope(match.captures.function);
    const conflictingBindings = [...getBindings(argument, context)].filter(
      (binding) => scope.isBindingDeclared(binding.name)
    );

    if (conflictingBindings.length > 0) {
      // TODO include additional conflicting binding names
      const binding = conflictingBindings[0];
      return Safety.error(`'${binding.name}' is used in argument`);
    }

    const callArguments = match.captures.callExpression.arguments;
    if (
      !isConstantExpression(argument, context) &&
      _.last(callArguments) !== argument
    ) {
      return Safety.warning("changes execution order");
    }

    return Safety.safe();
  }

  getSuggestion(
    match: PushParameterIntoIifeCandidate,
    safety: Safety
  ): Suggestion | null {
    if (!safety.isSafe()) {
      return null;
    }

    return {
      description: `You can push the ${getParameterLabel(
        match.node
      )} into the ${match.data.type}.`,
      highlightRanges:
        match.data.argument == null
          ? [NodeRange.node(match.node)]
          : [NodeRange.node(match.node), NodeRange.node(match.data.argument)],
    };
  }

  getActionZones(
    match: PushParameterIntoIifeCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    const ranges = [NodeRange.node(match.node)];

    if (match.data.argument != null) {
      ranges.push(NodeRange.node(match.data.argument));
    }

    return createActionZones(
      `Push parameter into ${match.data.type}`,
      ranges.map((range) => ({
        range,
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      }))
    );
  }
}
