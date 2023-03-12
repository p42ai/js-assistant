import * as ts from "typescript";
import { getId } from "../../../ast/getId";
import { Context } from "../../../matcher/engine/Context";
import "../../../test/JestExtension";
import { createParseAndAugmentFunction } from "../../createParseAndAugmentFunction";
import { Binding } from "../Binding";
import { assertBindingDeclarations } from "../import/assertBindingDeclarations";
import { ScopeAugmentation } from "../ScopeAugmentation";
import { BindingReference } from "./BindingReference";
import { BindingReferenceAugmentation } from "./BindingReferenceAugmentation";

async function parseAndAugment(source: string) {
  const { sourceFile: ast, context } = await createParseAndAugmentFunction([
    ScopeAugmentation,
    BindingReferenceAugmentation,
  ])(source);

  return { ast, mainScope: context.getScope(ast), context };
}

function assertBindingReferenceEquals(
  identifier: ts.Identifier,
  context: Context,
  expectedBindingReference: {
    isDeclaration: boolean;
    isWrite: boolean;
    isRead: boolean;
  },
  expectedBinding: Binding | undefined
) {
  const bindingReference = context.getBindingReference(identifier);
  expect(bindingReference).toBeDefined();
  expect({
    isDeclaration: bindingReference!.isDeclaration,
    isWrite: bindingReference!.isWrite,
    isRead: bindingReference!.isRead,
  }).toEqual(expectedBindingReference);

  if (expectedBinding != null) {
    expect(bindingReference!.binding).toStrictEqual(expectedBinding);
    expect(expectedBinding.references).toInclude(bindingReference);
  }
}

describe("BindingReferenceAugmentation", () => {
  describe("with statement", () => {
    it("should flag binding references inside with statement", async () => {
      const { ast, context, mainScope } = await parseAndAugment(`
const a = 12, b = 23;
with (obj) {
  const b = 45;
  f(a, b);
}
`);
      const callExpression =
        ast.statements[1].statement.statements[1].expression;

      const reference1 = context.getBindingReference(
        callExpression.arguments[0]
      );

      expect(reference1?.isAffectedByWith).toStrictEqual(true);

      const reference2 = context.getBindingReference(
        callExpression.arguments[1]
      );

      expect(reference2?.isAffectedByWith).toStrictEqual(false);
    });
  });

  describe("global", () => {
    it("should create global reference for stand-alone identifier", async () => {
      const { ast, context, mainScope } = await parseAndAugment(`a;`);

      const identifier = ast.statements[0].expression;
      const binding = mainScope.parent?.getBinding("a");

      assertBindingReferenceEquals(
        identifier,
        context,
        {
          isDeclaration: false,
          isWrite: false,
          isRead: true,
        },
        binding
      );

      expect(binding?.references).toEqual([
        context.getBindingReference(identifier),
      ]);
      expect(binding?.isGlobal).toStrictEqual(true);
    });

    it("should share the same global reference for the same identifier", async () => {
      const { ast, context, mainScope } = await parseAndAugment(`a; a;`);

      const identifier1 = ast.statements[0].expression;
      const identifier2 = ast.statements[1].expression;
      const binding = mainScope.parent?.getBinding("a");

      expect(binding).toBeDefined();
      expect(binding?.isGlobal).toStrictEqual(true);
      expect(context.getBindingReference(identifier1)?.binding).toStrictEqual(
        binding
      );
      expect(context.getBindingReference(identifier2)?.binding).toStrictEqual(
        binding
      );
    });

    // TODO assignment
    // TODO use in expression
    // TODO call
    // TODO property access
  });

  describe("declaration", () => {
    it("should add declare binding reference to declaring identifier with initialization", async () => {
      const { ast, context, mainScope } = await parseAndAugment(`let a = 1;`);

      const aBinding = mainScope.getBinding("a");
      const aIdentifier =
        ast.statements[0].declarationList.declarations[0].name;

      assertBindingDeclarations(aBinding, aIdentifier);
      assertBindingReferenceEquals(
        aIdentifier,
        context,
        {
          isDeclaration: true,
          isWrite: true,
          isRead: false,
        },
        aBinding
      );
    });

    it("should add declare binding reference to declaring identifier without initialization", async () => {
      const { ast, context, mainScope } = await parseAndAugment(`let a;`);

      const aBinding = mainScope.getBinding("a");
      const aIdentifier =
        ast.statements[0].declarationList.declarations[0].name;

      assertBindingDeclarations(aBinding, aIdentifier);
      assertBindingReferenceEquals(
        aIdentifier,
        context,
        {
          isDeclaration: true,
          isWrite: false,
          isRead: false,
        },
        mainScope.getBinding("a")!
      );
    });

    describe("named functions", () => {
      it("should add declare binding reference to named functions", async () => {
        const { ast, context, mainScope } = await parseAndAugment(
          `function f() {}`
        );

        const fBinding = mainScope.getBinding("f");
        const fNameIdentifier = ast.statements[0].name;

        assertBindingDeclarations(fBinding, fNameIdentifier);
        assertBindingReferenceEquals(
          fNameIdentifier,
          context,
          {
            isDeclaration: true,
            isWrite: false,
            isRead: false,
          },
          fBinding
        );
      });

      it("should record multiple declaring nodes for overloaded functions", async () => {
        const { ast, context, mainScope } = await parseAndAugment(
          `
function f(a: string): void;
function f(a: string, b?: number): void {
}
`
        );

        expect(mainScope.getBinding("f")?.declaringNodes.map(getId)).toEqual([
          getId(ast.statements[0].name),
          getId(ast.statements[1].name),
        ]);
      });
    });
  });

  it("should add write binding reference to update expression identifier", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = 1;
  a++;
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.operand,
      context,
      {
        isDeclaration: false,
        isWrite: true,
        isRead: true,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add write binding reference to for-of update", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
let a;
for (a of [1, 2]) {}
  `);

    assertBindingReferenceEquals(
      ast.statements[1].initializer as ts.Identifier,
      context,
      {
        isDeclaration: false,
        isWrite: true,
        isRead: false,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add write binding reference to for-in update", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
let a;
for (a in [1, 2]) {}
  `);

    assertBindingReferenceEquals(
      ast.statements[1].initializer,
      context,
      {
        isDeclaration: false,
        isWrite: true,
        isRead: false,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add read binding reference to element access expression target", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = "123";
  a[1];
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.expression,
      context,
      {
        isDeclaration: false,
        isWrite: false,
        isRead: true,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add read binding reference to property access expression object", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = "123";
  a.length;
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.expression,
      context,
      {
        isDeclaration: false,
        isWrite: false,
        isRead: true,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should not add binding reference to property access expression property", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = "123";
  x.a;
  `);

    expect(
      context.getBindingReference(ast.statements[1].expression.name)
    ).toBeUndefined();
  });

  it("should add write binding reference to assignment", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = 1;
  a = 2;
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.left,
      context,
      {
        isDeclaration: false,
        isWrite: true,
        isRead: false,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add read-write binding reference to increment assignment", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = 1;
  a += 2;
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.left,
      context,
      {
        isDeclaration: false,

        isWrite: true,
        isRead: true,
      },
      mainScope.getBinding("a")!
    );
  });

  it("should add read binding reference to negation", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = 1;
  f(!a);
  `);

    assertBindingReferenceEquals(
      ast.statements[1].expression.arguments[0].operand,
      context,
      { isDeclaration: false, isWrite: false, isRead: true },
      mainScope.getBinding("a")!
    );
  });

  describe("function hoisting", () => {
    it("should add binding to hoisted function to outer function scope when shadowed in catch clause", async () => {
      const {
        ast: sourceFile,
        context,
        mainScope,
      } = await parseAndAugment(`
function f() {
  try {
  } catch (g) {
    function g() {      
    }
  }
}
`);

      const functionDeclaration = sourceFile.statements[0];
      const functionScope = context.getScope(functionDeclaration);
      const gBinding = functionScope.getBinding("g");

      assertBindingDeclarations(
        gBinding,
        functionDeclaration.body.statements[0].catchClause.block.statements[0]
          .name
      );
    });
  });

  describe("var hoisting", () => {
    it("should hoist var declarations with the same name to surrounding functions", async () => {
      const { ast, context } = await parseAndAugment(`
  function f1() {
    var elements = [];
    var identifier;
    for (var i = 0; i < elements.length; i++) {
        identifier = elements[i].identifier;
    }
  }
  function f2() {
    var elements = [];
    var identifier;
    for (var i = 0; i < elements.length; i++) {
        identifier = elements[i].identifier;
    }
  }`);

      const function1 = ast.statements[0];
      const function2 = ast.statements[1];

      const function1Scope = context.getScope(function1);
      const function2Scope = context.getScope(function2);

      const elements1 =
        function1.body.statements[0].declarationList.declarations[0].name;
      const elements2 =
        function2.body.statements[0].declarationList.declarations[0].name;

      const loopBody1 = function1.body.statements[2].statement;
      const loopBody2 = function2.body.statements[2].statement;

      const elements1inBody =
        loopBody1.statements[0].expression.right.expression.expression;
      const elements2inBody =
        loopBody2.statements[0].expression.right.expression.expression;

      assertBindingReferenceEquals(
        elements1,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        function1Scope.getBinding("elements")!
      );
      assertBindingReferenceEquals(
        elements1inBody,
        context,
        { isDeclaration: false, isWrite: false, isRead: true },
        function1Scope.getBinding("elements")!
      );
      expect(function1Scope.getBinding("elements")!.references.length).toEqual(
        3
      );

      assertBindingReferenceEquals(
        elements2,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        function2Scope.getBinding("elements")!
      );

      assertBindingReferenceEquals(
        elements2inBody,
        context,
        { isDeclaration: false, isWrite: false, isRead: true },
        function2Scope.getBinding("elements")!
      );
      expect(function2Scope.getBinding("elements")!.references.length).toEqual(
        3
      );
    });

    it("should add binding to hoisted var in main scope", async () => {
      const {
        ast: sourceFile,
        context,
        mainScope,
      } = await parseAndAugment(`
function f() {
  a++;
}
var a = 0;
`);

      assertBindingReferenceEquals(
        sourceFile.statements[1].declarationList.declarations[0].name,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        mainScope.getBinding("a")!
      );

      assertBindingReferenceEquals(
        sourceFile.statements[0].body.statements[0].expression.operand,
        context,
        { isDeclaration: false, isWrite: true, isRead: true },
        mainScope.getBinding("a")!
      );
    });

    it("should have different declaration and binding for hoisted var declaration that is shadowed by catch parameter", async () => {
      const {
        ast: sourceFile,
        context,
        mainScope,
      } = await parseAndAugment(`
try {
} catch (error) {
  var error = 12;
  f1(error);
}
f2(error);
`);

      const { catchClause } = sourceFile.statements[0];
      const catchScope = context.getScope(catchClause);
      const catchStatements = catchClause.block.statements;

      const mainErrorBinding = mainScope.getBinding("error")!;
      const catchErrorBinding = catchScope.getBinding("error")!;

      const varDeclarationIdentifier =
        catchStatements[0].declarationList.declarations[0].name;

      // error on main scope is declared by var statement
      assertBindingDeclarations(mainErrorBinding, varDeclarationIdentifier);

      // error on catch scope is declared by catch clause
      assertBindingDeclarations(
        catchErrorBinding,
        catchClause.variableDeclaration.name
      );

      // declaration init in the catch clause is a write to the param
      assertBindingReferenceEquals(
        varDeclarationIdentifier,
        context,
        {
          isDeclaration: false,
          isWrite: true,
          isRead: false,
        },
        catchErrorBinding
      );

      // binding inside f1(error)
      assertBindingReferenceEquals(
        catchStatements[1].expression.arguments[0],
        context,
        {
          isDeclaration: false,
          isWrite: false,
          isRead: true,
        },
        catchErrorBinding
      );

      // binding inside f2(error)
      assertBindingReferenceEquals(
        sourceFile.statements[1].expression.arguments[0],
        context,
        {
          isDeclaration: false,
          isWrite: false,
          isRead: true,
        },
        mainErrorBinding
      );
    });
  });

  it("should add binding to variable in function", async () => {
    const { ast, context } = await parseAndAugment(`
  function f() {
    let a = "3";
    return a + "x";
  }
  `);

    const functionNode = ast.statements[0];

    assertBindingReferenceEquals(
      functionNode.body.statements[0].declarationList.declarations[0].name,
      context,
      { isDeclaration: true, isWrite: true, isRead: false },
      context.getScope(functionNode).getBinding("a")!
    );

    assertBindingReferenceEquals(
      functionNode.body.statements[1].expression.left,
      context,
      { isDeclaration: false, isWrite: false, isRead: true },
      context.getScope(functionNode).getBinding("a")!
    );
  });

  it("should not add binding to shadowed reference", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  let a = 1;
  {
    let a = 3;
    a = a * 2;
  }
  `);

    const letIdentifier =
      ast.statements[0].declarationList.declarations[0].name;
    const binding = mainScope.getBinding("a");

    expect(binding?.references).toEqual([
      context.getBindingReference(letIdentifier),
    ]);
  });

  it("should not add binding to JSX property name", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  const aProperty = f();
  return <JsxElement aProperty={aProperty} />;
  `);

    const letIdentifier =
      ast.statements[0].declarationList.declarations[0].name;
    const propertyValue =
      ast.statements[1].expression.attributes.properties[0].initializer
        .expression;
    const binding = mainScope.getBinding("aProperty");

    expect(
      binding?.references.map((reference: BindingReference) =>
        getId(reference.identifier)
      )
    ).toEqual([getId(letIdentifier), getId(propertyValue)]);
  });

  it("should add bindings to function parameters", async () => {
    const { ast, context, mainScope } = await parseAndAugment(
      `function f(a) {}`
    );

    const f = ast.statements[0];

    assertBindingReferenceEquals(
      f.parameters[0].name,
      context,
      { isDeclaration: true, isWrite: false, isRead: false },
      context.getScope(f).getBinding("a")!
    );
  });

  describe("destructuring", () => {
    it("should add binding reference in array destructuring pattern identifier", async () => {
      const { ast, context, mainScope } = await parseAndAugment(
        `let [a, b] = arr;`
      );

      const arrayPattern =
        ast.statements[0].declarationList.declarations[0].name;

      assertBindingReferenceEquals(
        arrayPattern.elements[0].name,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        mainScope.getBinding("a")
      );

      assertBindingReferenceEquals(
        arrayPattern.elements[1].name,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        mainScope.getBinding("b")
      );
    });

    it("should add binding reference in object destructuring pattern without renaming", async () => {
      const { ast, context, mainScope } = await parseAndAugment(
        `let { aProperty } = anObject;`
      );

      const objectBindingPattern =
        ast.statements[0].declarationList.declarations[0].name;

      assertBindingReferenceEquals(
        objectBindingPattern.elements[0].name,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        mainScope.getBinding("aProperty")
      );
    });

    it("should add binding reference in object destructuring pattern with renaming", async () => {
      const { ast, context, mainScope } = await parseAndAugment(
        `let { aProperty: aVariable } = anObject;`
      );

      const objectBindingPattern =
        ast.statements[0].declarationList.declarations[0].name;

      assertBindingReferenceEquals(
        objectBindingPattern.elements[0].name,
        context,
        { isDeclaration: true, isWrite: true, isRead: false },
        mainScope.getBinding("aVariable")
      );

      expect(
        context.getBindingReference(
          objectBindingPattern.elements[0].propertyName
        )
      ).toBeUndefined();
    });
  });

  it("should add binding reference to additional declaring identifier", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  var a = 1;
  var a = 2;
  `);

    const aBinding = mainScope.getBinding("a");
    const aIdentifier1 = ast.statements[0].declarationList.declarations[0].name;
    const aIdentifier2 = ast.statements[1].declarationList.declarations[0].name;

    assertBindingDeclarations(aBinding, aIdentifier1, aIdentifier2);
    assertBindingReferenceEquals(
      aIdentifier1,
      context,
      { isDeclaration: true, isWrite: true, isRead: false },
      aBinding
    );

    assertBindingReferenceEquals(
      aIdentifier2,
      context,
      { isDeclaration: true, isWrite: true, isRead: false },
      aBinding
    );
  });

  it("should not add binding reference to object expression key", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  const data = { b: 1 };
  var b = 2; // define symbol
  `);

    const objectKey =
      ast.statements[0].declarationList.declarations[0].initializer
        .properties[0].name;

    expect(context.getBindingReference(objectKey)).toBeUndefined();
  });

  it("should add binding reference to object expression value", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  const data = { b: b };
  var b = 2; // define symbol
  `);

    assertBindingReferenceEquals(
      ast.statements[0].declarationList.declarations[0].initializer
        .properties[0].initializer,
      context,
      { isDeclaration: false, isWrite: false, isRead: true },
      mainScope.getBinding("b")!
    );
  });

  it("should add binding reference to object shorthand expression", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
  const data = { b };
  var b = 2; // define symbol
  `);

    assertBindingReferenceEquals(
      ast.statements[0].declarationList.declarations[0].initializer
        .properties[0].name,
      context,
      { isDeclaration: false, isWrite: false, isRead: true },
      mainScope.getBinding("b")!
    );
  });

  it("should not add binding to return type", async () => {
    const { ast, context, mainScope } = await parseAndAugment(`
function f(): { a: string } {
  const a = "3";
  return {
    a: a,
  }
}
`);

    const returnTypePart = ast.statements[0].type.members[0].name;
    const binding = context.getScope(ast.statements[0]).getBinding("a");

    expect(context.getBindingReference(returnTypePart)).toBeUndefined();
    expect(binding?.references.length).toBe(2);
  });
});
