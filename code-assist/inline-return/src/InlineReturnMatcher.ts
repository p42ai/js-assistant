import {
  Binding,
  BindingKind,
  BindingReference,
  capture,
  Flags,
  getBlockChildParent,
  getFunctionScopeNode,
  isBlockLike,
  matchers as m,
  PatternMatcher,
} from "@p42/engine";
import ts from "typescript";
import { buildDataflow } from "./buildDataflow";
import { getFlowNode } from "./getFlowNode";
import { InlineReturnCandidate } from "./InlineReturnCandidate";

const { ast } = m;

export class InlineReturnMatcher extends PatternMatcher<InlineReturnCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.ExpressionStatement],
  };

  createPattern() {
    const captures = {
      variableName: capture.value<string>(),
      variableBinding: capture.value<Binding>(),
      assignedExpression: capture.node<ts.Expression>(),
      removableReturnStatement: capture.node<ts.ReturnStatement>(),
    };

    return {
      match: ast.expressionStatement({
        expression: ast.binaryExpression({
          left: ast.identifier({
            text: captures.variableName.record(),
            binding: captures.variableBinding.record(),
            constraints: [
              (identifier, context) => {
                const binding = context.getBinding(identifier);

                if (binding == null) {
                  return false;
                }

                // variable is referenced in a function that's different from it's declaring function
                // (performance: check this before the control flow analysis)
                if (
                  getFunctionScopeNode(binding.declaringNodes[0]) !==
                  getFunctionScopeNode(identifier)
                ) {
                  return false;
                }

                // TODO need to consider all return references
                const returnReference: BindingReference | undefined =
                  binding.references.find((reference) =>
                    ts.isReturnStatement(reference.identifier.parent)
                  );

                // variable is not returned:
                if (returnReference == null) {
                  return false;
                }

                const dataflow = buildDataflow(binding);
                const downstreamNodes =
                  dataflow?.getDownstreamNodes(identifier);

                // could not build dataflow or get downstream nodes, e.g. because of performance issues
                if (downstreamNodes == null) {
                  return false;
                }

                // if any downstream node contains other mutations
                // or calls, or if there is a loop, the return statement cannot be inlined:
                for (const node of downstreamNodes) {
                  const flowNode = node.tsFlowNode;
                  if (
                    Flags.isAnySet(
                      flowNode.flags,
                      ts.FlowFlags.Assignment |
                        ts.FlowFlags.ArrayMutation |
                        ts.FlowFlags.Call |
                        ts.FlowFlags.LoopLabel
                    )
                  ) {
                    return false;
                  }

                  // the ts flowgraph always maps preceeding flow nodes, need to check
                  // if there is an identifier match to see if there could be a call:
                  const nodeIdentifier = node.bindingReference?.identifier;
                  if (
                    nodeIdentifier != null &&
                    nodeIdentifier !== returnReference.identifier
                  ) {
                    return false;
                  }
                }

                // no additional operations between node and return
                const returnIdentifier = returnReference.identifier;
                const returnStatement = getBlockChildParent(returnIdentifier);
                const block = returnStatement.parent as ts.BlockLike;
                const returnIndex = block.statements.indexOf(returnStatement);

                let currentNode: ts.Node = identifier;
                while (currentNode.parent !== block) {
                  const { parent } = currentNode;

                  if (parent == null) {
                    return false;
                  }

                  // there must be no further statements (other than break) in block:
                  if (isBlockLike(parent)) {
                    const index = parent.statements.indexOf(
                      currentNode as ts.Statement
                    );

                    // only statements that are allowed after are break statements:
                    if (index !== parent.statements.length - 1) {
                      const nextStatements = parent.statements.slice(index + 1);
                      if (
                        !nextStatements.every((statement) =>
                          ts.isBreakStatement(statement)
                        )
                      ) {
                        return false;
                      }
                    }
                  }

                  currentNode = parent;
                }

                const assignmentIndex = block.statements.indexOf(
                  currentNode as ts.Statement
                );

                if (
                  assignmentIndex == null ||
                  returnIndex - assignmentIndex > 1 // nodes between assignment and return
                ) {
                  return false;
                }

                // TODO account for various blocks (needs to be last statement in block)

                // capture return if it can be removed:
                const returnUpstream =
                  dataflow!.getUpstreamNodes(returnIdentifier)!;

                downstreamNodes.forEach((node) => {
                  returnUpstream.delete(node);
                });
                dataflow!.getUpstreamNodes(identifier)!.forEach((node) => {
                  returnUpstream.delete(node);
                });
                returnUpstream.delete(
                  dataflow!.nodes.get(getFlowNode(identifier)!)!
                );

                if (returnUpstream.size === 0) {
                  captures.removableReturnStatement.record()(
                    returnReference.identifier.parent as ts.ReturnStatement,
                    context
                  );
                }

                return true;
              },
            ],
          }),
          operator: ts.SyntaxKind.EqualsToken,
          right: captures.assignedExpression.record(),
        }),
      }),
      captures,
    };
  }

  deriveMatchData(
    matchedNode: InlineReturnCandidate["node"],
    captures: InlineReturnCandidate["captures"]
  ): InlineReturnCandidate["data"] {
    const binding = captures.variableBinding;
    return {
      // 3 references: declaration + assignment + return
      canRemoveVariableDeclaration:
        binding.kind !== BindingKind.PARAMETER &&
        binding.references.length === 3,
    };
  }
}
