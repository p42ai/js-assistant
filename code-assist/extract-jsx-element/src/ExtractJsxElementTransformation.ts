
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  EditorOperation,
  hasDescendant,
  InteractiveInput,
  matchers as m,
  nameOracle,
  NodeRange,
  Safety,
  Statement,
  Transformation,
  TransformedNodeTree,
} from "@p42/engine";
import ts from "typescript";
import { ExtractJsxElementCandidate } from "./ExtractJsxElementCandidate";

const { ast } = m;

const EXTRACT_AS_ARROW_FUNCTION = "Extract as arrow function";
const EXTRACT_AS_FUNCTION_DECLARATION = "Extract as function declaration";

export class ExtractJsxElementTransformation extends Transformation<ExtractJsxElementCandidate> {
  async apply(
    match: ExtractJsxElementCandidate,
    tree: TransformedNodeTree,
    interactiveInput: InteractiveInput
  ) {
    const targetFormat = await interactiveInput.selectOption({
      title: "Extract React Function Component",
      options: [
        { label: EXTRACT_AS_ARROW_FUNCTION },
        { label: EXTRACT_AS_FUNCTION_DECLARATION },
      ],
      selectedOption: EXTRACT_AS_ARROW_FUNCTION,
    });

    if (
      targetFormat == null ||
      ![EXTRACT_AS_ARROW_FUNCTION, EXTRACT_AS_FUNCTION_DECLARATION].includes(
        targetFormat
      )
    ) {
      return; // no target format selected
    }

    const functionName = nameOracle.generateVariableName(
      nameOracle.nameWithIncreasingNumber("NewComponent"),
      match.context.getScope(match.node)
    );

    // get insertion position
    const { sourceFile, index: insertionIndex } =
      Statement.getSourceFileStatementIndex(match.node);

    const bindings = match.data.sortedBindings;

    // replace original node occurrence with function call
    const elementReplacement = tree.createJsxSelfClosingElement({
      tagName: tree.createIdentifier({
        text: functionName,
      }),
      attributes: tree.createJsxAttributes({
        properties: bindings.map((binding) =>
          tree.createJsxAttribute({
            name: tree.createIdentifier({
              text: binding.name,
            }),
            initializer: tree.createJsxExpression({
              expression: tree.createIdentifier({
                text: binding.name,
              }),
            }),
          })
        ),
      }),
    });
    tree.replace(match.node, elementReplacement);

    const parameterType =
      match.data.parameterTypes != null
        ? tree.createTypeLiteralNode({
            members: match.data.parameterTypes.map((parameter) =>
              tree.createPropertySignature({
                name: tree.createIdentifier({
                  text: parameter.name,
                }),
                type: tree.markNewNode(parameter.typeNode),
              })
            ),
          })
        : undefined;

    function generateParameters(parameterType: ts.TypeLiteralNode | undefined) {
      return bindings.length === 0
        ? []
        : [
            tree.createParameterDeclaration({
              name: tree.createObjectBindingPattern({
                elements: bindings.map((binding) =>
                  tree.createBindingElement({
                    name: tree.createIdentifier({
                      text: binding.name,
                    }),
                  })
                ),
              }),
              type: parameterType,
            }),
          ];
    }

    const componentIdentifier = tree.createIdentifier({
      text: functionName,
    });

    const functionComponentDeclaration =
      targetFormat === EXTRACT_AS_FUNCTION_DECLARATION
        ? tree.createFunctionDeclaration({
            name: componentIdentifier,
            parameters: generateParameters(parameterType),
            body: tree.createBlock({
              statements: [
                tree.createReturnStatement({
                  expression: match.node,
                }),
              ],
            }),
          })
        : tree.createVariableStatement({
            declarationList: tree.createVariableDeclarationList({
              flags: ts.NodeFlags.Const,
              declarations: [
                tree.createVariableDeclaration({
                  name: componentIdentifier,
                  type:
                    parameterType != null
                      ? tree.createTypeReferenceNode({
                          typeName: tree.createQualifiedName({
                            left: tree.createIdentifier({ text: "React" }),
                            right: tree.createIdentifier({ text: "FC" }),
                          }),
                          typeArguments:
                            // suppress generic type when there are no parameters:
                            ts.isTypeLiteralNode(parameterType) &&
                            parameterType.members.length === 0
                              ? undefined
                              : [parameterType],
                        })
                      : undefined,
                  initializer: tree.createArrowFunction({
                    parameters: generateParameters(undefined),
                    body: tree.createParenthesizedExpression({
                      expression: match.node,
                    }),
                  }),
                }),
              ],
            }),
          });

    tree.insertStatement(
      sourceFile,
      functionComponentDeclaration,
      insertionIndex
    );

    return EditorOperation.compose(
      EditorOperation.highlightNodes(
        tree,
        functionComponentDeclaration,
        elementReplacement
      ),
      EditorOperation.rename(
        targetFormat === EXTRACT_AS_FUNCTION_DECLARATION
          ? ["statements", insertionIndex, "name"]
          : [
              "statements",
              insertionIndex,
              "declarationList",
              "declarations",
              0,
              "name",
            ]
      )
    );
  }

  analyzeSafety(match: ExtractJsxElementCandidate): Safety {
    if (hasDescendant(match.node, ast.thisExpression(), match.context)) {
      return Safety.error("contains reference to 'this'");
    }

    if (!match.context.scriptMetadata.isTypeScript()) {
      return Safety.unknown();
    }

    const parameterTypes = match.data.parameterTypes!;

    match.node;

    return parameterTypes.some((parameter) => parameter.isUnknown)
      ? Safety.warning("some parameter types are unknown")
      : Safety.unknown();
  }

  getActionZones(
    match: ExtractJsxElementCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Extract React Function Component", [
      {
        range: NodeRange.node(match.node),
        level: CodeAssistLevel.PreferredQuickFix,
      },
    ]);
  }
}
