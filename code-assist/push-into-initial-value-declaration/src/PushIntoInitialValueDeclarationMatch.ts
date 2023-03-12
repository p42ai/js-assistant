
import {
  Binding,
  Context,
  findIdentifierPatternContainer,
  Match,
  VariableDeclarationKind,
  VariableDeclarationList,
} from "@p42/engine";
import ts from "typescript";

export type PushIntoInitialValueDeclarationMatchType = Match<
  ts.VariableDeclaration,
  {
    target: ts.Identifier;
    originBinding: Binding;
  },
  undefined
>;

export class PushIntoInitialValueDeclarationMatch
  implements PushIntoInitialValueDeclarationMatchType
{
  constructor(
    readonly node: PushIntoInitialValueDeclarationMatchType["node"],
    readonly captures: PushIntoInitialValueDeclarationMatchType["captures"],
    readonly data: PushIntoInitialValueDeclarationMatchType["data"],
    readonly context: Context
  ) {}

  get targetParent() {
    return this.captures.target.parent;
  }

  get sourceVariableKind(): VariableDeclarationKind.VariableDeclarationKind {
    return VariableDeclarationKind.getVariableDeclarationKind(
      this.node.parent as ts.VariableDeclarationList
    );
  }

  get targetVariableKind():
    | VariableDeclarationKind.VariableDeclarationKind
    | undefined {
    const { targetDeclarationList } = this;
    if (targetDeclarationList === undefined) {
      return undefined;
    }

    return VariableDeclarationKind.getVariableDeclarationKind(
      targetDeclarationList
    );
  }

  get targetDeclarationList(): ts.VariableDeclarationList | undefined {
    const targetContainerParent = findIdentifierPatternContainer(
      this.captures.target
    ).parent.parent;

    return ts.isVariableDeclarationList(targetContainerParent)
      ? targetContainerParent
      : undefined;
  }

  get updatedTargetVariableKind():
    | VariableDeclarationKind.VariableDeclarationKind
    | undefined {
    const { targetVariableKind, sourceVariableKind } = this;

    if (targetVariableKind === undefined) {
      return undefined;
    }

    return VariableDeclarationList.hasExactlyOneDeclaration(
      this.targetDeclarationList!
    ) && !ts.isBindingElement(this.targetParent)
      ? sourceVariableKind
      : sourceVariableKind.combine(targetVariableKind);
  }
}
