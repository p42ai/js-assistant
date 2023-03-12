
import {
  BindingReference,
  capture,
  Context,
  findIdentifierPatternContainer,
  getFunctionScopeNode,
  FunctionLike,
  isScopeNode,
  matchers as m,
  NamedFunctionCallsAugmentation,
  PatternMatcher,
  predicates as p,
  VariableDeclarationKind,
} from "@p42/engine";
import * as _ from "lodash";
import ts from "typescript";
import { ReplaceVarWithLetAndConstCandidate } from "./ReplaceVarWithLetAndConstCandidate";

const { ast, constraint, path } = m;

function sharesReferenceAncestorForBinding(
  node: ts.Node,
  ancestorPredicate: p.Predicate<ts.Node, Context>,
  context: Context
): (value: BindingReference) => boolean {
  const referenceAncestor = context
    .getAncestors(node)
    .find(ancestorPredicate, context);
  return referenceAncestor == null
    ? _.constant(true)
    : (reference) =>
        context
          .getAncestors(reference.identifier)
          .containsValue(referenceAncestor, context);
}

export class ReplaceVarWithLetAndConstMatcher extends PatternMatcher<ReplaceVarWithLetAndConstCandidate> {
  candidates = {
    nodes: [ts.SyntaxKind.VariableDeclarationList],
  };

  createPattern() {
    const captures = {
      constDeclarators: capture.set<ts.VariableDeclaration>(),
      letDeclarators: capture.set<ts.VariableDeclaration>(),
    };

    const isNotUsedBeforeDeclaration = p.define<ts.Identifier, Context>(
      "isNotUsedBeforeDeclaration",
      (identifier, context) => {
        const binding = context.getBinding(identifier);
        return (
          binding != null &&
          binding.references.every(
            // performance: .pos good enough for comparison (vs .getStart()) - whitespace/comments don't matter
            (reference) => identifier.pos <= reference.identifier.pos
          )
        );
      }
    );

    const isNotUsedInDeclarationInit = p.define<ts.Identifier, Context>(
      "isNotUsedInDeclarationInit",
      (identifier, context) => {
        // check if there are references other than the node itself that share the variable declarator
        // parent - if so, the node is used in the right hand side of it's initialization
        const declaration = context
          .getAncestors(identifier)
          .find(ts.isVariableDeclaration, context);
        const binding = context.getBinding(identifier);
        return !binding?.references.some((reference) => {
          let currentNode: ts.Node = reference.identifier;
          let parentNode = reference.identifier.parent;
          while (
            parentNode != null &&
            !(
              parentNode === declaration &&
              (parentNode as ts.VariableDeclaration).initializer === currentNode
            )
          ) {
            currentNode = parentNode;
            parentNode = parentNode.parent;
          }
          return parentNode != null;
        });
      }
    );

    const isOnlyUsedInDeclarationBlockScope = p.define<ts.Identifier, Context>(
      "isOnlyUsedInDeclarationBlockScope",
      (identifier, context) => {
        const binding = context.getBinding(identifier);
        return !!binding?.references.every(
          sharesReferenceAncestorForBinding(identifier, isScopeNode, context),
          context
        );
      }
    );

    // todo cover cases where we have for-in/for-of statement (which is auto-assigned)
    // todo what if it's used in function in loop? think about ancestor path barriers
    const isInLoop = p.define("isInLoop", m.hasAncestor(m.loop));

    const isNotInsideLoopAndUsedInFunction = p.define<ts.Identifier, Context>(
      "isNotInsideLoopAndUsedInFunction",
      (identifier, context) => {
        const loop = context.getAncestors(identifier).find(m.loop, context);
        const binding = context.getBinding(identifier);
        return (
          loop == null ||
          !binding?.references.some((reference) => {
            const referenceFunctionLikeAncestor = context
              .getAncestors(reference.identifier)
              .find(FunctionLike.isFunctionLike, context);

            return (
              referenceFunctionLikeAncestor != null &&
              // TODO auto-remove || false (it is useless if the previous value returns a boolean)
              (context
                .getAncestors(referenceFunctionLikeAncestor)
                .containsValue(loop, context) ||
                false)
            );
          })
        );
      }
    );

    const isNotUsedInDifferentSwitchCases = p.define<ts.Identifier, Context>(
      "isNotUsedInDifferentSwitchCases",
      (identifier, context) => {
        const binding = context.getBinding(identifier);
        // TODO type breakage when applying optional chaining
        return (
          binding != null &&
          binding.references.every(
            sharesReferenceAncestorForBinding(
              identifier,
              ts.isCaseClause,
              context
            ),
            context
          )
        );
      }
    );

    const isNotUsedInsideLoopAndUsedBeforeInitialized = p.define<
      ts.Identifier,
      Context
    >("isNotUsedInsideLoopAndUsedBeforeInitialized", (identifier, context) => {
      // TODO refactor into using BindingReference or Binding with flags
      // variable identifier has been initialized:
      const declarator = findIdentifierPatternContainer(identifier)?.parent;
      if (
        declarator != null &&
        ts.isVariableDeclaration(declarator) &&
        declarator.initializer != null
      ) {
        return true;
      }

      if (!isInLoop(identifier, context)) {
        return true;
      }

      const binding = context.getBinding(identifier);
      if (binding == null) {
        return false;
      }

      // TODO sorting by the textual position is not 100% accurate, because operator precedence can change the
      // order in which things are being executed. Ideally this would be based on the control flow graph.
      const references = _.sortBy(binding.references, [
        (reference: BindingReference) => reference.identifier.pos,
      ]);

      // TODO replace lodash with anArray.find refactoring
      const firstUsage = _.find(
        references,
        (reference) => reference.isRead
      )?.identifier;

      // TODO replace lodash with anArray.find refactoring
      const firstMutation = _.find(
        references,
        (reference) => reference.isWrite
      )?.identifier;

      return (
        firstUsage == null ||
        firstMutation == null ||
        firstMutation.pos <= firstUsage.pos
      );
    });

    const isNotUsedInsideLoopAndConditionallyAssigned = p.define<
      ts.Identifier,
      Context
    >("isNotUsedInsideLoopAndConditionallyAssigned", (identifier, context) => {
      const loop = context.getAncestors(identifier).find(m.loop, context);

      if (loop == null) {
        return true;
      }

      const binding = context.getBinding(identifier);

      if (binding == null) {
        return false;
      }

      // todo needs more sophisticated branch analysis to get 100% right (if set in all branches
      // it can be converted
      // todo conditional assignment needs to be such that we have a passthrough
      // --> there needs to be a chance that a value from a previous iteration is being used
      // --> before first usage, there must be at least 1 path where value is not assigned
      // --> needs control flow graph
      // todo conditional assignment in switch
      // todo conditional assignment through ternary, or statements and the like.
      const writes = binding.writeReferences;
      return !writes.some((writeReference) => {
        const ifStatement = context
          .getAncestors(writeReference.identifier)
          .find(ts.isIfStatement, context);

        return (
          ifStatement != null &&
          context.getAncestors(ifStatement).containsValue(loop, context)
        );
      });
    });

    const isNotSharedBetweenLoopIterations = [
      isNotInsideLoopAndUsedInFunction,
      isNotUsedInsideLoopAndUsedBeforeInitialized,
      isNotUsedInsideLoopAndConditionallyAssigned,
    ];

    const isNotUsedBeforeDeclarationThroughHoistedFunction = p.define<
      ts.Identifier,
      Context
    >(
      "isNotUsedBeforeDeclarationThroughHoistedFunction",
      (identifier, context) => {
        const identifierScopeNode = getFunctionScopeNode(identifier);

        const binding = context.getBinding(identifier);
        if (binding == null) {
          return false;
        }

        // performance: avoid duplicate evaluation of a function scope node
        const referenceScopeNodes = new Set<ts.FunctionDeclaration>();

        // performance: use array and avoid memory allocation by avoiding map/filter
        for (const reference of binding.references) {
          const scopeNode = getFunctionScopeNode(reference.identifier);
          if (
            scopeNode !== identifierScopeNode &&
            // reference scope must be a function declaration in order for it to be hoisted:
            ts.isFunctionDeclaration(scopeNode)
          ) {
            referenceScopeNodes.add(scopeNode as ts.FunctionDeclaration);
          }
        }

        // performance: init before loop:
        const isBeforeIdentifier = m.isBefore(identifier);

        for (const referenceScopeNode of referenceScopeNodes) {
          if (
            // check calls:
            NamedFunctionCallsAugmentation.getValue(
              referenceScopeNode,
              context
            )!.some(isBeforeIdentifier, context)
          ) {
            return false;
          }
        }
        return true;
      }
    );

    function blockScopeIdentifier(
      bindingReference:
        | p.Predicate<BindingReference | undefined, Context>
        | undefined = undefined
    ) {
      return ast.identifier({
        bindingReference,
        binding: p.isDefined(constraint.isBindingDeclaredOnce),
        constraints: [
          constraint.isDeclaringIdentifier,
          isNotUsedBeforeDeclaration,
          isNotUsedBeforeDeclarationThroughHoistedFunction,
          isNotUsedInDeclarationInit,
          ...isNotSharedBetweenLoopIterations,
          isNotUsedInDifferentSwitchCases,
          isOnlyUsedInDeclarationBlockScope,
        ],
      });
    }

    const constDeclarationIdentifier = p.recursive<
      ts.Node | undefined,
      Context
    >((recursion) =>
      p.or(
        // final element: block scoped variable that is not changed
        blockScopeIdentifier(
          (reference) => reference?.binding?.isConstant !== false
        ),
        // recursion for array pattern:
        ast.arrayBindingPattern({
          elements: p.every(
            p.or(
              ast.omittedExpression(),
              ast.bindingElement({
                name: recursion,
              })
            )
          ),
        }),
        // recursion for object pattern:
        ast.objectBindingPattern({
          elements: p.every(
            ast.bindingElement({
              name: recursion,
            })
          ),
        })
      )
    );

    const letDeclarationIdentifier = p.recursive<ts.Node | undefined, Context>(
      (recursion) =>
        p.or(
          // final element: block scoped variable
          blockScopeIdentifier(),
          // recursion for array pattern:
          ast.arrayBindingPattern({
            elements: p.some(
              p.or(
                ast.omittedExpression(),
                ast.bindingElement({
                  name: recursion,
                })
              )
            ),
          }),
          // recursion for object pattern:
          ast.objectBindingPattern({
            elements: p.some(
              ast.bindingElement({
                name: recursion,
              })
            ),
          })
        )
    );

    return {
      match: ast.variableDeclarationList({
        debugName: "BlockScopedVariable",
        kind: VariableDeclarationKind.Var,
        declarations: p.someEvaluateAll(
          p.or(
            captures.constDeclarators.record(
              ast.variableDeclaration({
                debugName: "const",
                name: constDeclarationIdentifier,
                constraints: [
                  // performance: run as combined check to prevent double matching of constDeclarationIdentifier
                  p.or(
                    // initialized variables without write references can be const:
                    path.optionalProperty("initializer", p.notEmpty),
                    // variables without init can be const in a for..in or for..of loop:
                    // todo this fails with destructuring?
                    path.parent(
                      path.parent(
                        p.or(ast.forOfStatement(), ast.forInStatement())
                      )
                    )
                  ),
                ],
              })
            ),
            captures.letDeclarators.record(
              // any declarator that can be block scoped could be 'let':
              ast.variableDeclaration({
                debugName: "let",
                name: letDeclarationIdentifier,
              })
            )
          )
        ),
      }),
      captures,
    };
  }
}
