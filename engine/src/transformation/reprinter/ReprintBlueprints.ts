import ts from "typescript";
import { getModuleDeclarationKeyword } from "../../ast/getModuleDeclarationKeyword";
import { getVariableDeclarationKindKeyword } from "../../ast/VariableDeclarationKind";
import { Conditions } from "./Condition";
import { PrintSettings } from "./PrintSettings";
import { ReprintTemplate } from "./ReprintTemplate";
import { ReprintTemplateBuilder } from "./ReprintTemplateBuilder";

type ReprintBlueprint = (
  builder: ReprintTemplateBuilder,
  settings: PrintSettings
) => void;

const blueprints = new Map<ts.SyntaxKind, ReprintBlueprint>();

export const ReprintBlueprints = {
  createReprintTemplates(
    printSettings: PrintSettings
  ): Map<ts.SyntaxKind, ReprintTemplate> {
    const templates = new Map<ts.SyntaxKind, ReprintTemplate>();

    blueprints.forEach((blueprint, nodeKind) => {
      const builder = new ReprintTemplateBuilder(printSettings);
      blueprint(builder, printSettings);
      templates.set(nodeKind, builder.buildTemplate());
    });

    return templates;
  },
};

const blockBlueprint: ReprintBlueprint = (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("statements")
    .newline(
      Conditions.or(
        Conditions.hasChildElements("statements"),
        Conditions.hasForcedLeadingNewLine()
      ),
      true
    )
    .childNodeArray("statements", settings.newlineSeparator)
    .decreaseIndentation("statements")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
};

blueprints.set(ts.SyntaxKind.ArrayBindingPattern, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBracketToken)
    .increaseIndentation("elements")
    .childNodeArray("elements", settings.commaSpaceSeparator, undefined, true)
    .decreaseIndentation("elements")
    .token(ts.SyntaxKind.CloseBracketToken);
});

blueprints.set(ts.SyntaxKind.ArrayLiteralExpression, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBracketToken)
    .increaseIndentation("elements")
    .childNodeArray("elements", settings.commaSpaceSeparator, undefined, true)
    .decreaseIndentation("elements")
    .token(ts.SyntaxKind.CloseBracketToken);
});

blueprints.set(ts.SyntaxKind.ArrowFunction, (builder, settings) => {
  // TODO what if single param has type
  builder
    .modifiers()
    .typeArguments({ property: "typeParameters", trailingComma: true })
    .token(
      ts.SyntaxKind.OpenParenToken,
      Conditions.hasTokenKindAtCurrentPosition(
        ts.SyntaxKind.OpenParenToken,
        (node) => (node as any).parameters.length >= 2
      )
    )
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(
      ts.SyntaxKind.CloseParenToken,
      Conditions.hasTokenKindAtCurrentPosition(
        ts.SyntaxKind.CloseParenToken,
        (node) => (node as any).parameters.length >= 2
      )
    )
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space()
    .token(ts.SyntaxKind.EqualsGreaterThanToken)
    .space()
    .childNode("body", undefined, true);
});

blueprints.set(ts.SyntaxKind.ArrayType, (builder, settings) => {
  builder
    .childNode("elementType")
    .token(ts.SyntaxKind.OpenBracketToken)
    .token(ts.SyntaxKind.CloseBracketToken);
});

blueprints.set(ts.SyntaxKind.AsExpression, (builder, settings) => {
  builder
    .childNode("expression")
    .space()
    .token(ts.SyntaxKind.AsKeyword)
    .space()
    .childNode("type");
});

blueprints.set(ts.SyntaxKind.AssertEntry, (builder, settings) => {
  builder
    .childNode("name")
    .token(ts.SyntaxKind.ColonToken)
    .space()
    .childNode("value");
});

blueprints.set(ts.SyntaxKind.AwaitExpression, (builder) => {
  builder.token(ts.SyntaxKind.AwaitKeyword).space().childNode("expression");
});

blueprints.set(ts.SyntaxKind.BigIntLiteral, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.BinaryExpression, (builder) => {
  builder
    .childNode("left")
    .space()
    .childNode("operatorToken")
    .space()
    .childNode("right");
});

blueprints.set(ts.SyntaxKind.BindingElement, (builder) => {
  builder
    .token(ts.SyntaxKind.DotDotDotToken, Conditions.hasChild("dotDotDotToken"))
    .childNode("propertyName", Conditions.hasChild("propertyName"))
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("propertyName"))
    .space(Conditions.hasChild("propertyName"))
    .childNode("name")
    .space(Conditions.hasChild("initializer"))
    .token(ts.SyntaxKind.EqualsToken, Conditions.hasChild("initializer"))
    .space(Conditions.hasChild("initializer"))
    .childNode("initializer", Conditions.hasChild("initializer"));
});

blueprints.set(ts.SyntaxKind.Block, blockBlueprint);

blueprints.set(ts.SyntaxKind.BreakStatement, (builder, settings) => {
  // TODO label
  builder.token(ts.SyntaxKind.BreakKeyword).semicolon();
});

blueprints.set(ts.SyntaxKind.CallExpression, (builder) => {
  builder
    .childNode("expression")
    .typeArguments()
    .resolvedChildToken(
      (node: ts.ElementAccessExpression) => node.questionDotToken?.kind,
      Conditions.hasChild("questionDotToken")
    )
    .token(ts.SyntaxKind.OpenParenToken)
    .parameterList("arguments")
    .token(ts.SyntaxKind.CloseParenToken);
});

blueprints.set(ts.SyntaxKind.CaseBlock, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("clauses")
    .newline(Conditions.hasChildElements("clauses"), true)
    .childNodeArray("clauses", settings.newlineSeparator)
    .decreaseIndentation("clauses")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.CaseClause, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.CaseKeyword)
    .space()
    .childNode("expression")
    .token(ts.SyntaxKind.ColonToken)
    .increaseIndentation("statements")
    .newline(Conditions.hasChildElements("statements"), true)
    .childNodeArray("statements", settings.newlineSeparator)
    .decreaseIndentation("statements");
});

blueprints.set(ts.SyntaxKind.CatchClause, (builder) => {
  builder
    .token(ts.SyntaxKind.CatchKeyword)
    .space()
    .token(
      ts.SyntaxKind.OpenParenToken,
      Conditions.hasChild("variableDeclaration")
    )
    .childNode(
      "variableDeclaration",
      Conditions.hasChild("variableDeclaration")
    )
    .token(
      ts.SyntaxKind.CloseParenToken,
      Conditions.hasChild("variableDeclaration")
    )
    .space()
    .childNode("block");
});

blueprints.set(ts.SyntaxKind.ClassDeclaration, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.ClassKeyword)
    .space()
    .childNode("name")
    .typeArguments({ property: "typeParameters" })
    .space(Conditions.hasChild("heritageClauses"))
    .childNodeArray(
      "heritageClauses",
      settings.spaceSeparator,
      Conditions.hasChild("heritageClauses")
    )
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("members")
    .newline(Conditions.hasChildElements("members"), true)
    .childNodeArray("members", settings.newlineSeparator)
    .decreaseIndentation("members")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.ClassExpression, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.ClassKeyword)
    .space(Conditions.hasChild("name"))
    .childNode("name", Conditions.hasChild("name"))
    .typeArguments({ property: "typeParameters" })
    .space(Conditions.hasChild("heritageClauses"))
    .childNodeArray(
      "heritageClauses",
      settings.spaceSeparator,
      Conditions.hasChild("heritageClauses")
    )
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("members")
    .newline(Conditions.hasChildElements("members"), true)
    .childNodeArray("members", settings.newlineSeparator)
    .decreaseIndentation("members")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.ComputedPropertyName, (builder) => {
  builder
    .token(ts.SyntaxKind.OpenBracketToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseBracketToken);
});

blueprints.set(ts.SyntaxKind.ConditionalExpression, (builder) => {
  builder
    .childNode("condition")
    .space()
    .token(ts.SyntaxKind.QuestionToken)
    .space()
    .childNode("whenTrue")
    .space()
    .token(ts.SyntaxKind.ColonToken)
    .space()
    .childNode("whenFalse");
});

blueprints.set(ts.SyntaxKind.Constructor, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.ConstructorKeyword)
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.ContinueStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.ContinueKeyword)
    .childNode("label", Conditions.hasChild("label"))
    .semicolon();
});

blueprints.set(ts.SyntaxKind.DefaultClause, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.DefaultKeyword)
    .token(ts.SyntaxKind.ColonToken)
    .increaseIndentation("statements")
    .newline(Conditions.hasChildElements("statements"), true)
    .childNodeArray("statements", settings.newlineSeparator)
    .decreaseIndentation("statements");
});

blueprints.set(ts.SyntaxKind.DeleteExpression, (builder, settings) => {
  builder.token(ts.SyntaxKind.DeleteKeyword).space().childNode("expression");
});

blueprints.set(ts.SyntaxKind.DoStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.DoKeyword)
    .space()
    .childNode("statement")
    .space()
    .token(ts.SyntaxKind.WhileKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .semicolon();
});

blueprints.set(ts.SyntaxKind.ElementAccessExpression, (builder) => {
  builder
    .childNode("expression")
    .resolvedChildToken(
      (node: ts.ElementAccessExpression) => node.questionDotToken?.kind,
      Conditions.hasChild("questionDotToken")
    )
    .token(ts.SyntaxKind.OpenBracketToken)
    .childNode("argumentExpression")
    .token(ts.SyntaxKind.CloseBracketToken);
});

blueprints.set(ts.SyntaxKind.EndOfFileToken, (builder) => {
  // noop
});

blueprints.set(ts.SyntaxKind.ExportAssignment, (builder, settings) => {
  // TODO isExportEquals
  builder
    .token(ts.SyntaxKind.ExportKeyword)
    .token(ts.SyntaxKind.DefaultKeyword)
    .modifiers()
    .space()
    .childNode("expression")
    .semicolon();
});

blueprints.set(ts.SyntaxKind.ExpressionStatement, (builder) => {
  builder.childNode("expression").semicolon();
});

blueprints.set(ts.SyntaxKind.ExpressionWithTypeArguments, (builder) => {
  builder.childNode("expression").typeArguments({ property: "typeArguments" });
});

blueprints.set(ts.SyntaxKind.ForInStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.ForKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("initializer")
    .space()
    .token(ts.SyntaxKind.InKeyword)
    .space()
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.ForOfStatement, (builder) => {
  // TODO await keyword
  // TODO how is optional semicolon at end handled?
  builder
    .token(ts.SyntaxKind.ForKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("initializer")
    .space()
    .token(ts.SyntaxKind.OfKeyword)
    .space()
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.ForStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.ForKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("initializer", Conditions.hasChild("initializer"))
    .token(ts.SyntaxKind.SemicolonToken)
    .space(Conditions.hasChild("condition"))
    .childNode("condition", Conditions.hasChild("condition"))
    .token(ts.SyntaxKind.SemicolonToken)
    .space()
    .childNode("incrementor", Conditions.hasChild("incrementor"))
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.FunctionDeclaration, (builder, settings) => {
  builder
    .modifiers()
    .space(Conditions.hasChildElements("modifiers"))
    .token(ts.SyntaxKind.FunctionKeyword)
    .token(ts.SyntaxKind.AsteriskToken, Conditions.hasChild("asteriskToken"))
    .space(Conditions.hasChild("name"))
    .childNode("name", Conditions.hasChild("name"))
    .typeArguments({ property: "typeParameters" })
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.FunctionExpression, (builder, settings) => {
  builder
    .modifiers()
    .space(Conditions.hasChildElements("modifiers"))
    .token(ts.SyntaxKind.FunctionKeyword)
    .token(ts.SyntaxKind.AsteriskToken, Conditions.hasChild("asteriskToken"))
    .space(Conditions.hasChild("name"))
    .childNode("name", Conditions.hasChild("name"))
    .typeArguments({ property: "typeParameters" })
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.FunctionType, (builder, settings) => {
  builder
    .typeArguments({ property: "typeParameters", trailingComma: true })
    .token(
      ts.SyntaxKind.OpenParenToken,
      Conditions.hasTokenKindAtCurrentPosition(
        ts.SyntaxKind.OpenParenToken,
        (node) => (node as any).parameters.length >= 2
      )
    )
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(
      ts.SyntaxKind.CloseParenToken,
      Conditions.hasTokenKindAtCurrentPosition(
        ts.SyntaxKind.CloseParenToken,
        (node) => (node as any).parameters.length >= 2
      )
    )
    .space()
    .token(ts.SyntaxKind.EqualsGreaterThanToken)
    .space()
    .childNode("type");
});

blueprints.set(ts.SyntaxKind.GetAccessor, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.GetKeyword)
    .space()
    .childNode("name")
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.Identifier, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.IfStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.IfKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("thenStatement")
    .space(Conditions.hasChild("elseStatement"))
    .token(ts.SyntaxKind.ElseKeyword, Conditions.hasChild("elseStatement"))
    .space(Conditions.hasChild("elseStatement"))
    .childNode("elseStatement", Conditions.hasChild("elseStatement"));
});

blueprints.set(ts.SyntaxKind.InterfaceDeclaration, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.InterfaceKeyword)
    .space()
    .childNode("name")
    .typeArguments({ property: "typeParameters" })
    .space(Conditions.hasChild("heritageClauses"))
    .childNodeArray(
      "heritageClauses",
      settings.spaceSeparator,
      Conditions.hasChild("heritageClauses")
    )
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("members")
    .newline(Conditions.hasChildElements("members"), true)
    .childNodeArray("members", settings.newlineSeparator)
    .decreaseIndentation("members")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.IntersectionType, (builder, settings) => {
  builder.childNodeArray("types", settings.ampersandSeparator);
});

blueprints.set(ts.SyntaxKind.JsxAttribute, (builder, settings) => {
  builder
    .childNode("name")
    .token(ts.SyntaxKind.EqualsToken, Conditions.hasChild("initializer"))
    .childNode("initializer", Conditions.hasChild("initializer"));
});

blueprints.set(ts.SyntaxKind.JsxAttributes, (builder, settings) => {
  builder.childNodeArray("properties", settings.spaceSeparator);
});

blueprints.set(ts.SyntaxKind.JsxClosingElement, (builder) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .token(ts.SyntaxKind.SlashToken)
    .childNode("tagName")
    .token(ts.SyntaxKind.GreaterThanToken);
});

blueprints.set(ts.SyntaxKind.JsxClosingFragment, (builder) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .token(ts.SyntaxKind.SlashToken)
    .token(ts.SyntaxKind.GreaterThanToken);
});

blueprints.set(ts.SyntaxKind.JsxElement, (builder, settings) => {
  builder
    .childNode("openingElement")
    .increaseIndentation("children")
    .childNodeArray("children", settings.newlineSeparator)
    .decreaseIndentation("children")
    .childNode("closingElement");
});

blueprints.set(ts.SyntaxKind.JsxExpression, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .token(ts.SyntaxKind.DotDotDotToken, Conditions.hasChild("dotDotDotToken"))
    .childNode("expression")
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.JsxFragment, (builder, settings) => {
  builder
    .childNode("openingFragment")
    .increaseIndentation("children")
    .newline(Conditions.hasChildElements("children"))
    .childNodeArray("children", settings.newlineSeparator)
    .decreaseIndentation("children")
    .newline()
    .childNode("closingFragment");
});

blueprints.set(ts.SyntaxKind.JsxOpeningElement, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .childNode("tagName")
    .token(ts.SyntaxKind.LessThanToken, Conditions.hasChild("typeArguments"))
    .childNodeArray(
      "typeArguments",
      settings.commaSpaceSeparator,
      Conditions.hasChild("typeArguments")
    )
    .token(ts.SyntaxKind.GreaterThanToken, Conditions.hasChild("typeArguments"))
    .space(Conditions.hasJsxAttributes("attributes"))
    .childNode("attributes")
    .token(ts.SyntaxKind.GreaterThanToken);
});

blueprints.set(ts.SyntaxKind.JsxOpeningFragment, (builder) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .token(ts.SyntaxKind.GreaterThanToken);
});

blueprints.set(ts.SyntaxKind.JsxSelfClosingElement, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .childNode("tagName")
    .token(ts.SyntaxKind.LessThanToken, Conditions.hasChild("typeArguments"))
    .childNodeArray(
      "typeArguments",
      settings.commaSpaceSeparator,
      Conditions.hasChild("typeArguments")
    )
    .token(ts.SyntaxKind.GreaterThanToken, Conditions.hasChild("typeArguments"))
    .space(Conditions.hasJsxAttributes("attributes"))
    .childNode("attributes")
    .space()
    .token(ts.SyntaxKind.SlashToken)
    .token(ts.SyntaxKind.GreaterThanToken);
});

blueprints.set(ts.SyntaxKind.JsxSpreadAttribute, (builder) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .token(ts.SyntaxKind.DotDotDotToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.JsxText, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.LabeledStatement, (builder) => {
  builder
    .childNode("label")
    .token(ts.SyntaxKind.ColonToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.LiteralType, (builder) => {
  builder.childNode("literal");
});

blueprints.set(ts.SyntaxKind.MethodDeclaration, (builder, settings) => {
  // TODO questionToken
  builder
    .modifiers()
    .token(ts.SyntaxKind.AsteriskToken, Conditions.hasChild("asteriskToken"))
    .space(
      Conditions.or(
        Conditions.hasChild("modifiers"),
        Conditions.hasChild("asteriskToken")
      )
    )
    .childNode("name")
    .typeArguments({ property: "typeParameters" })
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.ModuleBlock, blockBlueprint);

blueprints.set(ts.SyntaxKind.ModuleDeclaration, (builder, settings) => {
  builder
    .modifiers()
    .resolvedChildToken<ts.ModuleDeclaration>(getModuleDeclarationKeyword)
    .space()
    .childNode("name")
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.NewExpression, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.NewKeyword)
    .space()
    .childNode("expression")
    .typeArguments()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("arguments", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken);
});

blueprints.set(ts.SyntaxKind.NonNullExpression, (builder) => {
  builder.childNode("expression").token(ts.SyntaxKind.ExclamationToken);
});

blueprints.set(ts.SyntaxKind.NoSubstitutionTemplateLiteral, (builder) => {
  builder
    .token(ts.SyntaxKind.BacktickToken)
    .childValue("text") // TODO text vs rawText
    .token(ts.SyntaxKind.BacktickToken);
});

blueprints.set(ts.SyntaxKind.NumericLiteral, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.ObjectBindingPattern, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("elements")
    .space(Conditions.hasChildElements("elements"))
    .childNodeArray("elements", settings.commaSpaceSeparator, undefined, true)
    .space()
    .decreaseIndentation("elements")
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.ObjectLiteralExpression, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("properties")
    .childNodeArray("properties", settings.commaSpaceSeparator, undefined, true)
    .decreaseIndentation("properties")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.OmittedExpression, (builder, settings) => {
  // nothing
});

blueprints.set(ts.SyntaxKind.Parameter, (builder) => {
  builder
    .childNode("name")
    .resolvedChildToken(
      (node: ts.ParameterDeclaration) => node.questionToken?.kind,
      Conditions.hasChild("questionToken")
    )
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space(Conditions.hasChild("initializer"))
    .token(ts.SyntaxKind.EqualsToken, Conditions.hasChild("initializer"))
    .space(Conditions.hasChild("initializer"))
    .childNode("initializer");
});

blueprints.set(ts.SyntaxKind.ParenthesizedExpression, (builder) => {
  builder
    .token(
      ts.SyntaxKind.OpenParenToken,
      Conditions.isNotSuppressedSyntheticNode()
    )
    .childNode("expression")
    .token(
      ts.SyntaxKind.CloseParenToken,
      Conditions.isNotSuppressedSyntheticNode()
    );
});

blueprints.set(ts.SyntaxKind.PostfixUnaryExpression, (sequence) => {
  sequence.childNode("operand").childToken("operator");
});

blueprints.set(ts.SyntaxKind.PrefixUnaryExpression, (sequence) => {
  sequence.childToken("operator").childNode("operand");
});

blueprints.set(ts.SyntaxKind.PrivateIdentifier, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.PropertyAccessExpression, (builder) => {
  builder
    .childNode("expression")
    .resolvedChildToken(
      (node: ts.PropertyAccessExpression) =>
        node.questionDotToken?.kind ?? ts.SyntaxKind.DotToken
    )
    .childNode("name");
});

blueprints.set(ts.SyntaxKind.PropertyAssignment, (builder) => {
  builder
    .childNode("name")
    .token(ts.SyntaxKind.ColonToken)
    .space()
    .childNode("initializer");
});

blueprints.set(ts.SyntaxKind.PropertyDeclaration, (builder, settings) => {
  // TODO questiontoken, exclamationtoken
  builder
    .modifiers()
    .space(Conditions.hasChild("modifiers"))
    .childNode("name")
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space(Conditions.hasChild("initializer"))
    .token(ts.SyntaxKind.EqualsToken, Conditions.hasChild("initializer"))
    .space(Conditions.hasChild("initializer"))
    .childNode("initializer", Conditions.hasChild("initializer"))
    .semicolon();
});

blueprints.set(ts.SyntaxKind.PropertySignature, (builder) => {
  builder
    // TODO modifiers, questiontoken
    .childNode("name")
    .token(ts.SyntaxKind.ColonToken)
    .space()
    .childNode("type")
    .semicolon();
});

blueprints.set(ts.SyntaxKind.QualifiedName, (builder) => {
  builder.childNode("left").token(ts.SyntaxKind.DotToken).childNode("right");
});

blueprints.set(ts.SyntaxKind.RegularExpressionLiteral, (builder) => {
  builder.childValue("text");
});

blueprints.set(ts.SyntaxKind.ReturnStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.ReturnKeyword)
    .space(Conditions.hasChild("expression"))
    .childNode("expression", Conditions.hasChild("expression"))
    .semicolon();
});

blueprints.set(ts.SyntaxKind.SatisfiesExpression, (builder, settings) => {
  builder
    .childNode("expression")
    .space()
    .token(ts.SyntaxKind.SatisfiesKeyword)
    .space()
    .childNode("type");
});

blueprints.set(ts.SyntaxKind.SetAccessor, (builder, settings) => {
  builder
    .modifiers()
    .token(ts.SyntaxKind.SetKeyword)
    .space()
    .childNode("name")
    .token(ts.SyntaxKind.OpenParenToken)
    .childNodeArray("parameters", settings.commaSpaceSeparator)
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("body");
});

blueprints.set(ts.SyntaxKind.ShorthandPropertyAssignment, (builder) => {
  // TODO objectAssignmentInitializer
  builder.childNode("name");
});

blueprints.set(ts.SyntaxKind.SourceFile, (builder, settings) => {
  builder
    .childNodeArray("statements", settings.newlineSeparator)
    .newline()
    .childNode("endOfFileToken"); // there can be comments / whitespace associated with this
});

blueprints.set(ts.SyntaxKind.SpreadAssignment, (builder, settings) => {
  builder.token(ts.SyntaxKind.DotDotDotToken).childNode("expression");
});

blueprints.set(ts.SyntaxKind.SpreadElement, (builder) => {
  builder.token(ts.SyntaxKind.DotDotDotToken).childNode("expression");
});

blueprints.set(ts.SyntaxKind.StringLiteral, (builder, settings) => {
  builder.stringLiteral(settings.isSingleQuoteDefault);
});

blueprints.set(ts.SyntaxKind.SwitchStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.SwitchKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("caseBlock");
});

blueprints.set(ts.SyntaxKind.TaggedTemplateExpression, (builder) => {
  // TODO typeArguments
  builder.childNode("tag").childNode("template");
});

blueprints.set(ts.SyntaxKind.TemplateExpression, (builder, settings) => {
  builder
    .childNode("head")
    .childNodeArray("templateSpans", settings.emptySeparator);
});

blueprints.set(ts.SyntaxKind.TemplateHead, (builder) => {
  builder
    .token(ts.SyntaxKind.BacktickToken)
    .childValue("text") // TODO text vs rawText
    .whitespace("$")
    .token(ts.SyntaxKind.OpenBraceToken);
});

blueprints.set(ts.SyntaxKind.TemplateMiddle, (builder) => {
  builder
    .token(ts.SyntaxKind.CloseBraceToken)
    .childValue("text") // TODO text vs rawText
    .whitespace("$")
    .token(ts.SyntaxKind.OpenBraceToken);
});

blueprints.set(ts.SyntaxKind.TemplateSpan, (builder) => {
  builder.childNode("expression").childNode("literal");
});

blueprints.set(ts.SyntaxKind.TemplateTail, (builder) => {
  builder
    .token(ts.SyntaxKind.CloseBraceToken)
    .childValue("text") // TODO text vs rawText
    .token(ts.SyntaxKind.BacktickToken);
});

blueprints.set(ts.SyntaxKind.ThrowStatement, (builder) => {
  builder.token(ts.SyntaxKind.ThrowKeyword).childNode("expression").semicolon();
});

blueprints.set(ts.SyntaxKind.TryStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.TryKeyword)
    .space()
    .childNode("tryBlock")
    .space(Conditions.hasChild("catchClause"))
    .childNode("catchClause", Conditions.hasChild("catchClause"))
    .space(Conditions.hasChild("finallyBlock"))
    .token(ts.SyntaxKind.FinallyKeyword, Conditions.hasChild("finallyBlock"))
    .space(Conditions.hasChild("finallyBlock"))
    .childNode("finallyBlock", Conditions.hasChild("finallyBlock"));
});

blueprints.set(ts.SyntaxKind.TypeAssertionExpression, (builder) => {
  builder
    .token(ts.SyntaxKind.LessThanToken)
    .childNode("type")
    .token(ts.SyntaxKind.GreaterThanToken)
    .childNode("expression");
});

blueprints.set(ts.SyntaxKind.TypeLiteral, (builder, settings) => {
  builder
    .token(ts.SyntaxKind.OpenBraceToken)
    .increaseIndentation("members")
    .newline(Conditions.hasChildElements("members"), true)
    .childNodeArray("members", settings.newlineSeparator)
    .decreaseIndentation("members")
    .newline()
    .token(ts.SyntaxKind.CloseBraceToken);
});

blueprints.set(ts.SyntaxKind.TypeOfExpression, (builder) => {
  builder.token(ts.SyntaxKind.TypeOfKeyword).space().childNode("expression");
});

blueprints.set(ts.SyntaxKind.TypeReference, (builder, settings) => {
  builder
    .childNode("typeName")
    .token(
      ts.SyntaxKind.LessThanToken,
      Conditions.hasChildElements("typeArguments")
    )
    .childNodeArray("typeArguments", settings.commaSpaceSeparator)
    .token(
      ts.SyntaxKind.GreaterThanToken,
      Conditions.hasChildElements("typeArguments")
    );
});

blueprints.set(ts.SyntaxKind.UnionType, (builder, settings) => {
  builder.childNodeArray("types", settings.barSeparator);
});

blueprints.set(ts.SyntaxKind.VariableDeclaration, (builder) => {
  builder
    .newline(Conditions.hasForcedLeadingNewLine(), true)
    .childNode("name")
    .token(ts.SyntaxKind.ColonToken, Conditions.hasChild("type"))
    .space(Conditions.hasChild("type"))
    .childNode("type", Conditions.hasChild("type"))
    .space(Conditions.hasChild("initializer"))
    .token(ts.SyntaxKind.EqualsToken, Conditions.hasChild("initializer"))
    .space(Conditions.hasChild("initializer"))
    .childNode("initializer", Conditions.hasChild("initializer"));
});

blueprints.set(ts.SyntaxKind.VariableDeclarationList, (builder, settings) => {
  builder
    .resolvedChildToken<ts.VariableDeclarationList>(
      getVariableDeclarationKindKeyword
    )
    .space()
    .childNodeArray("declarations", settings.commaSpaceSeparator);
});

blueprints.set(ts.SyntaxKind.VariableStatement, (builder, settings) => {
  builder
    .modifiers()
    .space(Conditions.hasChild("modifiers"))
    .childNode("declarationList")
    .semicolon();
});

blueprints.set(ts.SyntaxKind.VoidExpression, (builder) => {
  builder.token(ts.SyntaxKind.VoidKeyword).space().childNode("expression");
});

blueprints.set(ts.SyntaxKind.WhileStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.WhileKeyword)
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.WithStatement, (builder) => {
  builder
    .token(ts.SyntaxKind.WithKeyword)
    .space()
    .token(ts.SyntaxKind.OpenParenToken)
    .childNode("expression")
    .token(ts.SyntaxKind.CloseParenToken)
    .space()
    .childNode("statement");
});

blueprints.set(ts.SyntaxKind.YieldExpression, (builder) => {
  // TODO asterisk
  builder.token(ts.SyntaxKind.YieldKeyword).space().childNode("expression");
});
