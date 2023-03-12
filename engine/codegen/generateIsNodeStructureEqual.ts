import { Definition, getSyntaxKind } from "./Definition";
import { Emitter } from "./Emitter";

export function generateIsNodeStructureEqual(definitions: Array<Definition>) {
  const emitter = new Emitter();

  emitter.emitCopyrightHeader();

  emitter.emit(`
import ts from "typescript";
import { Context } from "../matcher/engine/Context";
import { getSyntaxKindLabel } from "./getSyntaxKindLabel";
import { getThisScopeNode } from "./This";

export type IsNodeStructureEqualOptions = {
  ignoreOptionalChaining: boolean;
  ignoreBindings: boolean;
};

const DEFAULT_OPTIONS = {
  ignoreOptionalChaining: false,
  ignoreBindings: false,
};

export function createIsNodeStructureEqual(
  options: IsNodeStructureEqualOptions = DEFAULT_OPTIONS
) {
  return (a: ts.Node | undefined, b: ts.Node | undefined, context: Context) =>
    isNodeStructureEqual(a, b, context, options);
}

export function isNodeArrayStructureEqual<T extends ts.Node>(
  a: ts.NodeArray<T> | undefined,
  b: ts.NodeArray<T> | undefined,
  context: Context,
  options: IsNodeStructureEqualOptions,
  rootA: ts.Node | undefined,
  rootB: ts.Node | undefined
): boolean {
  if (a === b || (a === undefined && b === undefined)) {
    return true;
  }

  if (a === undefined || b === undefined || a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; i++) {
    if (!isNodeStructureEqual(a[i], b[i], context, options, rootA, rootB)) {
      return false;
    }
  }

  return true;
}

export function isNodeStructureEqual(
  a: ts.Node | undefined,
  b: ts.Node | undefined,
  context: Context,
  options: IsNodeStructureEqualOptions = DEFAULT_OPTIONS,
  rootA: ts.Node | undefined = a,
  rootB: ts.Node | undefined = b
): boolean {
  if (a === b || (a === undefined && b === undefined)) {
    return true;
  }

  if (a === undefined || b === undefined || a.kind !== b.kind) {
    return false;
  }

  switch (a.kind) {
    // cases where a simple kind check was enough (e.g. Tokens and Keywords):
    // tokens: numbers 18 - 77 in the SyntaxKind enum
    // keyword: numbers 80 - 157 in the SyntaxKind enum
    case ts.SyntaxKind.OpenBraceToken:
    case ts.SyntaxKind.CloseBraceToken:
    case ts.SyntaxKind.OpenParenToken:
    case ts.SyntaxKind.CloseParenToken:
    case ts.SyntaxKind.OpenBracketToken:
    case ts.SyntaxKind.CloseBracketToken:
    case ts.SyntaxKind.DotToken:
    case ts.SyntaxKind.DotDotDotToken:
    case ts.SyntaxKind.SemicolonToken:
    case ts.SyntaxKind.CommaToken:
    case ts.SyntaxKind.QuestionDotToken:
    case ts.SyntaxKind.LessThanToken:
    case ts.SyntaxKind.LessThanSlashToken:
    case ts.SyntaxKind.GreaterThanToken:
    case ts.SyntaxKind.LessThanEqualsToken:
    case ts.SyntaxKind.GreaterThanEqualsToken:
    case ts.SyntaxKind.EqualsEqualsToken:
    case ts.SyntaxKind.ExclamationEqualsToken:
    case ts.SyntaxKind.EqualsEqualsEqualsToken:
    case ts.SyntaxKind.ExclamationEqualsEqualsToken:
    case ts.SyntaxKind.EqualsGreaterThanToken:
    case ts.SyntaxKind.PlusToken:
    case ts.SyntaxKind.MinusToken:
    case ts.SyntaxKind.AsteriskToken:
    case ts.SyntaxKind.AsteriskAsteriskToken:
    case ts.SyntaxKind.SlashToken:
    case ts.SyntaxKind.PercentToken:
    case ts.SyntaxKind.PlusPlusToken:
    case ts.SyntaxKind.MinusMinusToken:
    case ts.SyntaxKind.LessThanLessThanToken:
    case ts.SyntaxKind.GreaterThanGreaterThanToken:
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken:
    case ts.SyntaxKind.AmpersandToken:
    case ts.SyntaxKind.BarToken:
    case ts.SyntaxKind.CaretToken:
    case ts.SyntaxKind.ExclamationToken:
    case ts.SyntaxKind.TildeToken:
    case ts.SyntaxKind.AmpersandAmpersandToken:
    case ts.SyntaxKind.BarBarToken:
    case ts.SyntaxKind.QuestionToken:
    case ts.SyntaxKind.ColonToken:
    case ts.SyntaxKind.AtToken:
    case ts.SyntaxKind.QuestionQuestionToken:
    case ts.SyntaxKind.BacktickToken:
    case ts.SyntaxKind.EqualsToken:
    case ts.SyntaxKind.PlusEqualsToken:
    case ts.SyntaxKind.MinusEqualsToken:
    case ts.SyntaxKind.AsteriskEqualsToken:
    case ts.SyntaxKind.AsteriskAsteriskEqualsToken:
    case ts.SyntaxKind.SlashEqualsToken:
    case ts.SyntaxKind.PercentEqualsToken:
    case ts.SyntaxKind.LessThanLessThanEqualsToken:
    case ts.SyntaxKind.GreaterThanGreaterThanEqualsToken:
    case ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken:
    case ts.SyntaxKind.AmpersandEqualsToken:
    case ts.SyntaxKind.BarEqualsToken:
    case ts.SyntaxKind.BarBarEqualsToken:
    case ts.SyntaxKind.AmpersandAmpersandEqualsToken:
    case ts.SyntaxKind.QuestionQuestionEqualsToken:
    case ts.SyntaxKind.CaretEqualsToken:
    case ts.SyntaxKind.BreakKeyword:
    case ts.SyntaxKind.CaseKeyword:
    case ts.SyntaxKind.CatchKeyword:
    case ts.SyntaxKind.ClassKeyword:
    case ts.SyntaxKind.ConstKeyword:
    case ts.SyntaxKind.ContinueKeyword:
    case ts.SyntaxKind.DebuggerKeyword:
    case ts.SyntaxKind.DefaultKeyword:
    case ts.SyntaxKind.DeleteKeyword:
    case ts.SyntaxKind.DoKeyword:
    case ts.SyntaxKind.ElseKeyword:
    case ts.SyntaxKind.EnumKeyword:
    case ts.SyntaxKind.ExportKeyword:
    case ts.SyntaxKind.ExtendsKeyword:
    case ts.SyntaxKind.FalseKeyword:
    case ts.SyntaxKind.FinallyKeyword:
    case ts.SyntaxKind.ForKeyword:
    case ts.SyntaxKind.FunctionKeyword:
    case ts.SyntaxKind.IfKeyword:
    case ts.SyntaxKind.ImportKeyword:
    case ts.SyntaxKind.InKeyword:
    case ts.SyntaxKind.InstanceOfKeyword:
    case ts.SyntaxKind.NewKeyword:
    case ts.SyntaxKind.NullKeyword:
    case ts.SyntaxKind.ReturnKeyword:
    case ts.SyntaxKind.SuperKeyword:
    case ts.SyntaxKind.SwitchKeyword:
    case ts.SyntaxKind.ThrowKeyword:
    case ts.SyntaxKind.TrueKeyword:
    case ts.SyntaxKind.TryKeyword:
    case ts.SyntaxKind.TypeOfKeyword:
    case ts.SyntaxKind.VarKeyword:
    case ts.SyntaxKind.VoidKeyword:
    case ts.SyntaxKind.WhileKeyword:
    case ts.SyntaxKind.WithKeyword:
    case ts.SyntaxKind.ImplementsKeyword:
    case ts.SyntaxKind.InterfaceKeyword:
    case ts.SyntaxKind.LetKeyword:
    case ts.SyntaxKind.PackageKeyword:
    case ts.SyntaxKind.PrivateKeyword:
    case ts.SyntaxKind.ProtectedKeyword:
    case ts.SyntaxKind.PublicKeyword:
    case ts.SyntaxKind.StaticKeyword:
    case ts.SyntaxKind.YieldKeyword:
    case ts.SyntaxKind.AbstractKeyword:
    case ts.SyntaxKind.AsKeyword:
    case ts.SyntaxKind.AssertsKeyword:
    case ts.SyntaxKind.AnyKeyword:
    case ts.SyntaxKind.AsyncKeyword:
    case ts.SyntaxKind.AwaitKeyword:
    case ts.SyntaxKind.BooleanKeyword:
    case ts.SyntaxKind.ConstructorKeyword:
    case ts.SyntaxKind.DeclareKeyword:
    case ts.SyntaxKind.GetKeyword:
    case ts.SyntaxKind.InferKeyword:
    case ts.SyntaxKind.IntrinsicKeyword:
    case ts.SyntaxKind.IsKeyword:
    case ts.SyntaxKind.KeyOfKeyword:
    case ts.SyntaxKind.ModuleKeyword:
    case ts.SyntaxKind.NamespaceKeyword:
    case ts.SyntaxKind.NeverKeyword:
    case ts.SyntaxKind.ReadonlyKeyword:
    case ts.SyntaxKind.RequireKeyword:
    case ts.SyntaxKind.NumberKeyword:
    case ts.SyntaxKind.ObjectKeyword:
    case ts.SyntaxKind.SetKeyword:
    case ts.SyntaxKind.StringKeyword:
    case ts.SyntaxKind.SymbolKeyword:
    case ts.SyntaxKind.TypeKeyword:
    case ts.SyntaxKind.UndefinedKeyword:
    case ts.SyntaxKind.UniqueKeyword:
    case ts.SyntaxKind.UnknownKeyword:
    case ts.SyntaxKind.FromKeyword:
    case ts.SyntaxKind.GlobalKeyword:
    case ts.SyntaxKind.BigIntKeyword:
    case ts.SyntaxKind.OverrideKeyword:
    case ts.SyntaxKind.OfKeyword: {
      return true;
    }
    case ts.SyntaxKind.Identifier: {
      const castA = a as ts.Identifier;
      const castB = b as ts.Identifier;

      if (castA.text !== castB.text) {
        return false;
      }

      if (options.ignoreBindings) {
        return true;
      }

      const bindingA = context.getBinding(castA);
      const bindingB = context.getBinding(castB);

      if (bindingA === bindingB) {
        return true;
      }
      
      return bindingA?.isLocal(rootA!) ?? false;
    }
    case ts.SyntaxKind.ThisKeyword: {
      return getThisScopeNode(a) === getThisScopeNode(b);
    }
`);

  for (const definition of definitions) {
    // TODO convert into filter
    if (["Identifier", "ThisExpression"].includes(definition.name)) {
      continue;
    }

    emitter.emit(`    case ${getSyntaxKind(definition)}: {`);
    if (definition.properties.length === 0) {
      emitter.emit(`
      return true;`);
    } else {
      emitter.emit(`
      const castA = a as ts.${definition.name};
      const castB = b as ts.${definition.name};
      return (`);

      for (let i = 0; i < definition.properties.length; i++) {
        const property = definition.properties[i];

        switch (property.kind) {
          case "token":
          case "node":
            if (property.optionalChaining) {
              emitter.emit(`
        (options.ignoreOptionalChaining || isNodeStructureEqual(castA.${property.name}, castB.${property.name}, context, options, rootA, rootB))`);
            } else {
              emitter.emit(`
        isNodeStructureEqual(castA.${property.name}, castB.${property.name}, context, options, rootA, rootB)`);
            }
            break;
          case "node-array":
            emitter.emit(`
        isNodeArrayStructureEqual(castA.${property.name}, castB.${property.name}, context, options, rootA, rootB)`);
            break;
          case "value":
            emitter.emit(`
        castA.${property.name} === castB.${property.name}`);
            break;
          default:
            throw `unsupported property kind ${property.kind}`;
        }

        if (i < definition.properties.length - 1) {
          emitter.emit(" &&");
        }
      }

      emitter.emit(`
      );`);
    }
    emitter.emit(`
    }
`);
  }

  emitter.emit(`    // explicitly fail to prevent silently incorrect behavior when new versions of the
    // typescript AST become available:
    default:
      throw new Error(
        \`isNodeStructureEqual: unsupported syntax kind \${getSyntaxKindLabel(
          a.kind
        )}\`
      );
  }
}
`);

  emitter.writeToFile(`src/ast/isNodeStructureEqual.generated.ts`);
}
