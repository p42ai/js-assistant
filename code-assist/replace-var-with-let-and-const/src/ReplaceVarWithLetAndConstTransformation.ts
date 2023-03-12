
import {
  ActionZone,
  CodeAssistLevel,
  createActionZones,
  Flags,
  NodeRange,
  PrefixToSuffixTriviaMove,
  PrefixTriviaMove,
  Safety,
  SuffixTriviaMove,
  Suggestion,
  Transformation,
  TransformedNodeTree,
  VariableDeclarationList,
} from "@p42/engine";
import _ from "lodash";
import ts from "typescript";
import { ReplaceVarWithLetAndConstCandidate } from "./ReplaceVarWithLetAndConstCandidate";

export class ReplaceVarWithLetAndConstTransformation extends Transformation<ReplaceVarWithLetAndConstCandidate> {
  async apply(
    match: ReplaceVarWithLetAndConstCandidate,
    tree: TransformedNodeTree
  ) {
    const { parent } = match.node;
    const allDeclarations = match.node.declarations;
    const constDeclarators = match.captures.constDeclarators || [];
    const letDeclarators = match.captures.letDeclarators || [];

    const baseFlags = Flags.clear(
      match.node.flags,
      ts.NodeFlags.Let | ts.NodeFlags.Const
    );

    // In for loops only a single variable can be declared. Choose the lowest
    // common denominator:
    if (
      ts.isForStatement(parent) ||
      ts.isForOfStatement(parent) ||
      ts.isForInStatement(parent)
    ) {
      const varDeclarators = _.without(
        allDeclarations,
        ...letDeclarators,
        ...constDeclarators
      );

      const replacement = tree.createVariableDeclarationList({
        declarations: match.node.declarations.slice(),
        flags:
          varDeclarators.length > 0
            ? baseFlags
            : letDeclarators.length > 0
            ? Flags.set(baseFlags, ts.NodeFlags.Let)
            : Flags.set(baseFlags, ts.NodeFlags.Const),
      });

      tree.replace(match.node, replacement);
      return;
    }

    function getTargetKind(declarator: ts.VariableDeclaration) {
      if (constDeclarators.includes(declarator)) {
        return "const";
      }
      if (letDeclarators.includes(declarator)) {
        return "let";
      }
      return "var";
    }

    // create new variable declarations (split into many lists to keep the original order of the declarations,
    // in case there are side-effects or dependencies between them)
    let currentKind: "var" | "let" | "const" | undefined = undefined;
    const newDeclarationLists: ts.VariableDeclarationList[] = [];
    let newDeclarations: ts.VariableDeclaration[] = [];

    function createDeclarations() {
      if (currentKind !== undefined) {
        newDeclarationLists.push(
          tree.createVariableDeclarationList({
            declarations: newDeclarations,
            flags:
              currentKind === "var"
                ? baseFlags
                : currentKind === "let"
                ? Flags.set(baseFlags, ts.NodeFlags.Let)
                : Flags.set(baseFlags, ts.NodeFlags.Const),
          })
        );
      }
    }

    for (const declaration of allDeclarations) {
      const targetKind = getTargetKind(declaration);

      // no change in kind, move to current declaration:
      if (currentKind === targetKind) {
        newDeclarations.push(tree.markOriginalNode(declaration));
        continue;
      }

      // kind has changed, create declaration for previous kind
      createDeclarations();

      // new kind
      newDeclarations = [declaration];
      currentKind = targetKind;
    }

    createDeclarations();

    const newVariableDeclarationStatements = newDeclarationLists.map((list) =>
      tree.createVariableStatement({
        modifiers: (parent as ts.VariableStatement).modifiers?.slice(),
        declarationList: list,
      })
    );

    tree.replaceStatementWithMany(parent, newVariableDeclarationStatements);

    // move comments and whitespace
    for (let i = 0; i < newVariableDeclarationStatements.length - 1; i++) {
      const declaration = newVariableDeclarationStatements[i];
      const nextDeclaration = newVariableDeclarationStatements[i + 1];

      tree.updateTrivia(
        new PrefixToSuffixTriviaMove(
          nextDeclaration.declarationList.declarations[0],
          declaration
        )
      );
    }

    tree.updateTrivia(
      new PrefixTriviaMove(parent, newVariableDeclarationStatements[0])
    );
    tree.updateTrivia(
      new SuffixTriviaMove(
        parent,
        newVariableDeclarationStatements[
          newVariableDeclarationStatements.length - 1
        ]
      )
    );
  }

  analyzeSafety(match: ReplaceVarWithLetAndConstCandidate) {
    return VariableDeclarationList.isGlobalVarDeclarationList(
      match.node,
      match.context
    )
      ? Safety.warning("could remove global variable")
      : Safety.safe();
  }

  getSuggestion(
    match: ReplaceVarWithLetAndConstCandidate,
    safety: Safety
  ): Suggestion | null {
    return {
      description:
        "You can replace a 'var' declaration with 'let'/'const' declaration(s).",
      shortActionLabel: "Replace",
      highlightRanges: [NodeRange.variableDeclarationList(match.node)],
    };
  }

  getActionZones(
    match: ReplaceVarWithLetAndConstCandidate,
    isSuggestion: boolean
  ): ActionZone[] {
    return createActionZones("Convert to let and const", [
      {
        range: NodeRange.variableDeclarationList(match.node),
        level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
      },
    ]);
  }
}
