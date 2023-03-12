import ts from "typescript";
import { factory } from "../..";
import { createParseAndAugmentFunction } from "../../augmentation/createParseAndAugmentFunction";
import { Flags } from "../../util/Flags";
import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { PrefixToSuffixTriviaMove } from "../trivia/PrefixToSuffixTriviaMove";
import { SuffixTriviaMove } from "../trivia/SuffixTriviaMove";
import { SwapPositionTriviaMove } from "../trivia/SwapPositionTriviaMove";
import { expectReprint, parseForReprint } from "./ReprinterTestUtils";

const parseAndAugmentWithDummy = (content: string) =>
  parseAndAugment(`${content}\nconst dummy = "dummy";`);

const parseAndAugment = async (content: string) => {
  const augment = createParseAndAugmentFunction();
  const { sourceFile } = await augment(content);
  const tree = new TransformedNodeTree(sourceFile);

  return {
    sourceFile,
    tree,
    content,
  };
};

const reprint = (
  sourceFile: ts.SourceFile,
  tree: TransformedNodeTree,
  content: string,
  removeIndex = 1
) => {
  // remove dummy to trigger full tree reprint
  tree.remove(sourceFile.statements[removeIndex]);
  return tree.toEdit()!.applyTo(content);
};

function testReprint(
  testName: string,
  input: string,
  update: (sourceFile: any, tree: TransformedNodeTree) => void,
  expectedOutput: string
) {
  it(testName, async () => {
    const { sourceFile, tree, content } = await parseForReprint(input);
    update(sourceFile, tree);
    expectReprint(tree, content).toEqual(expectedOutput);
  });
}

describe("Reprinter", () => {
  describe("node types", () => {
    describe("BinaryExpression", () => {
      it("new", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `dummy();`
        );

        tree.replace(
          sourceFile.statements[0],
          tree.createExpressionStatement({
            expression: tree.createBinaryExpression({
              left: tree.createIdentifier({
                text: "a",
              }),
              operator: ts.SyntaxKind.MinusEqualsToken,
              right: tree.createIdentifier({
                text: "b",
              }),
            }),
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(`a -= b;`);
      });

      it("modified", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `a/*1*/+=/*2*/b1;`
        );

        tree.replace(
          sourceFile.statements[0].expression.right,
          tree.createIdentifier({
            text: "b2",
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(`a/*1*/+=/*2*/b2;`);
      });
    });

    describe("PropertyAccessExpression", () => {
      it("replaced name", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `a/*1*/./*2*/b1;`
        );

        tree.replace(
          sourceFile.statements[0].expression.name,
          tree.createIdentifier({
            text: "b2",
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(`a/*1*/./*2*/b2;`);
      });

      it("updated name", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `a/*1*/./*2*/b1;`
        );

        tree.replace(
          sourceFile.statements[0].expression.name,
          tree.updateIdentifier(sourceFile.statements[0].expression.name, {
            text: "b2",
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(`a/*1*/./*2*/b2;`);
      });
    });

    describe("SourceFile", () => {
      it("modified with inner comment", async () => {
        const { sourceFile, tree, content } =
          await parseAndAugmentWithDummy(`f(1);/*
  abc*/f(2);`);

        expect(reprint(sourceFile, tree, content, 2)).toEqual(
          `f(1);/*
  abc*/f(2);`
        );
      });

      it("modified with trailing if comment", async () => {
        const { sourceFile, tree, content } =
          await parseAndAugmentWithDummy(`if (x) f(); // a
b();`);

        expect(reprint(sourceFile, tree, content, 2)).toEqual(
          `if (x) f(); // a
b();`
        );
      });
    });

    describe("VariableDeclaration", () => {
      it("modified with initializer added", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `var a/*1*/:/*2*/string;`
        );

        const declaration =
          sourceFile.statements[0].declarationList.declarations[0];

        tree.replace(
          declaration,
          tree.updateVariableDeclaration(declaration, {
            initializer: tree.createIdentifier({
              text: "x",
            }),
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(
          `var a/*1*/:/*2*/string = x;`
        );
      });
    });

    describe("TypeParameter", () => {
      it("should print correct type parameter list", async () => {
        const { sourceFile, tree, content } = await parseAndAugmentWithDummy(
          `const f = function<T>(v1: T) { return 'a'; };`
        );

        const functionExpression =
          sourceFile.statements[0].declarationList.declarations[0].initializer;

        tree.replace(
          functionExpression,
          tree.createArrowFunction({
            parameters: functionExpression.parameters.slice(),
            typeParameters: functionExpression.typeParameters?.slice(),
            type: functionExpression.type,
            body: functionExpression.body.statements[0].expression,
          })
        );

        expect(reprint(sourceFile, tree, content)).toEqual(
          `const f = <T, >(v1: T) => 'a';`
        );
      });
    });
  });

  describe("line breaks", () => {
    // Note: implemented as unit test so line breaks don't randomly break
    it("should detect and use carriage return newline line breaks", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(
        "a = function() {\r\n    // f\r\n    f();\r\n\r\n    g();\r\n\r\n};"
      );

      // replace with arrow function
      const functionNode = sourceFile.statements[0].expression.right;
      tree.replace(
        functionNode,
        tree.createArrowFunction({
          parameters: functionNode.parameters.slice(),
          type: functionNode.type,
          body: functionNode.body,
        })
      );

      expectReprint(tree, content).toEqual(
        "a = () => {\r\n    // f\r\n    f();\r\n\r\n    g();\r\n\r\n};"
      );
    });
  });

  describe("comments and whitespace", () => {
    it("should delete end-of-line comment when statement is deleted", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
f1();
f2(); // comment
f3();
`);

      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`
f1();
f3();
`);
    });

    it("should retain other end-of-line comments when statement is deleted in case clause", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
switch (x) {
  case "a":
    f1(); // comment 1
    f2(); // comment 2
    break; // comment 3
}
dummy();
`);

      tree.remove(sourceFile.statements[0].caseBlock.clauses[0].statements[1]);
      tree.remove(sourceFile.statements[1]); // remove dummy to trigger full reprint

      expectReprint(tree, content).toEqual(`
switch (x) {
  case "a":
    f1(); // comment 1
    break; // comment 3
}
`);
    });

    it("should retain other end-of-line comments when statement is deleted in block", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
{
  f1(); // comment 1
  f2(); // comment 2
  f3(); // comment 3
}
dummy();
`);

      tree.remove(sourceFile.statements[0].statements[1]);
      tree.remove(sourceFile.statements[1]); // remove dummy to trigger full reprint

      expectReprint(tree, content).toEqual(`
{
  f1(); // comment 1
  f3(); // comment 3
}
`);
    });

    it("should delete end-of-line comment when statement is deleted in block", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
{
  f1(); // comment
}
`);

      tree.remove(sourceFile.statements[0].statements[0]);

      expectReprint(tree, content).toEqual(`
{
}
`);
    });

    it("should remove previous line comment when statement is deleted in block", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
{
  // comment
  f1();
}
`);

      tree.remove(sourceFile.statements[0].statements[0]);

      expectReprint(tree, content).toEqual(`
{
}
`);
    });

    it("should remove next line comment when statement is deleted in block", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
{
  f1();
  // comment
}
`);

      tree.remove(sourceFile.statements[0].statements[0]);

      expectReprint(tree, content).toEqual(`
{
  // comment
}
`);
    });

    it("should not duplicate comments 1", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
if (p === a) {
  f(); // comment 2a
} else {
  g(); // comment 1
  f(); // comment 2b
}
`);

      const ifStatement = sourceFile.statements[0];
      const secondF = ifStatement.elseStatement.statements[1];

      tree.insertStatement(sourceFile, secondF, 1);
      tree.removeLastStatement(ifStatement.thenStatement);
      tree.removeLastStatement(ifStatement.elseStatement);

      expectReprint(tree, content).toEqual(`
if (p === a) {
} else {
  g(); // comment 1
}
f(); // comment 2b
`);
    });

    it("should not duplicate comments when there is whitespace line before first comment", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`
// comment
{
  f1();
  f2();
}
`);

      const block = sourceFile.statements[0];
      tree.remove(block.statements[1]);
      tree.insertStatement(sourceFile, block.statements[1], 0);

      expectReprint(tree, content).toEqual(`
// comment
f2();
{
  f1();
}
`);
    });

    it("should keep whitespace when moving nodes", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(
        `A.m.apply(A, [1, 2, 3]);`
      );

      const callExpression = sourceFile.statements[0].expression;
      const property = callExpression.expression.expression;
      const args = callExpression.arguments[1];

      tree.replace(
        callExpression,
        tree.createCallExpression({
          expression: property,
          argumentsArray: args.elements.map((element: ts.Node) =>
            ts.isOmittedExpression(element)
              ? tree.createIdentifier({
                  text: "undefined",
                })
              : element
          ),
        })
      );

      expectReprint(tree, content).toEqual(`A.m(1, 2, 3);`);
    });
  });

  describe("modified argument list", () => {
    it("should have correct separator when adding additional argument", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`f(a);`);

      tree.replace(
        sourceFile.statements[0].expression,
        tree.updateCallExpression(sourceFile.statements[0].expression, {
          argumentsArray: [
            sourceFile.statements[0].expression.arguments[0],
            tree.createIdentifier({
              text: "x",
            }),
          ],
        })
      );

      expectReprint(tree, content).toEqual(`f(a, x);`);
    });
  });

  describe("modified block", () => {
    it("should reprint 2 statements when one is new", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  g();
}`);

      tree.insertStatement(
        sourceFile.statements[0],
        tree.createExpressionStatement({
          expression: tree.createCallExpression({
            expression: tree.createIdentifier({
              text: "f",
            }),
          }),
        }),
        0
      );

      expectReprint(tree, content).toEqual(`{
  f();
  g();
}`);
    });

    it("should reprint remaining statement when statement with trailing comment was removed", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  f();
  g(); // trailing comment
  h();
}`);

      tree.remove(sourceFile.statements[0].statements[1]);

      expectReprint(tree, content).toEqual(`{
  f();
  h();
}`);
    });

    it("should reprint 3 statements when one is new and preserve extra whitespace between original statements", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  g();

  h();
}`);

      tree.insertStatement(
        sourceFile.statements[0],
        tree.createExpressionStatement({
          expression: tree.createCallExpression({
            expression: tree.createIdentifier({
              text: "f",
            }),
          }),
        }),
        0
      );

      expectReprint(tree, content).toEqual(`{
  f();
  g();

  h();
}`);
    });

    it("should reprint 3 statements when one is new and preserve trailing comments", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  f(); // comment 1
  h(); // comment 2
}`);

      tree.insertStatement(
        sourceFile.statements[0],
        tree.createExpressionStatement({
          expression: tree.createCallExpression({
            expression: tree.createIdentifier({
              text: "g",
            }),
          }),
        }),
        1
      );

      expectReprint(tree, content).toEqual(`{
  f(); // comment 1
  g();
  h(); // comment 2
}`);
    });

    it("should keep trailing comment when node is modified", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  f(); // comment
  g();
}
dummy();`);

      tree.replace(
        sourceFile.statements[0].statements[0].expression.expression,
        tree.createIdentifier({
          text: "f2",
        })
      );
      tree.remove(sourceFile.statements[1]); // full reprint

      expectReprint(tree, content).toEqual(`{
  f2(); // comment
  g();
}`);
    });

    it("should reprint with a single new statement", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
}`);

      tree.insertStatement(
        sourceFile.statements[0],
        tree.createExpressionStatement({
          expression: tree.createCallExpression({
            expression: tree.createIdentifier({
              text: "f",
            }),
          }),
        }),
        0
      );

      expectReprint(tree, content).toEqual(`{
  f();
}`);
    });

    it("should keep non-breaking whitespace between existing block statements", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`a();
console.log("x"); console.log("y");
b();`);

      tree.replace(
        sourceFile.statements[0].expression.expression,
        tree.createIdentifier({
          text: "b",
        })
      );
      tree.replace(
        sourceFile.statements[3].expression.expression,
        tree.createIdentifier({
          text: "a",
        })
      );

      expectReprint(tree, content).toEqual(`b();
console.log("x"); console.log("y");
a();`);
    });

    it("should keep leading block comment when replacing nodes", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{ // comment
  f();
}`);

      tree.replaceStatementWithMany(sourceFile.statements[0].statements[0], [
        tree.createExpressionStatement({
          expression: tree.createCallExpression({
            expression: tree.createIdentifier({
              text: "g",
            }),
          }),
        }),
      ]);

      expectReprint(tree, content).toEqual(`{ // comment
  g();
}`);
    });
  });

  describe("update node", () => {
    it("should retain variable declaration indentation when there is a newline", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`{
  var a = 1,
      b = 2;

  g();
}

dummy();`);

      const block = sourceFile.statements[0];
      const variableDeclaration = block.statements[0];

      tree.replace(
        variableDeclaration,
        tree.createVariableStatement({
          declarationList: tree.createVariableDeclarationList({
            declarations: variableDeclaration.declarationList.declarations,
            flags: Flags.set(0, ts.NodeFlags.Let),
          }),
        })
      );
      tree.remove(sourceFile.statements[1]); // remove dummy to trigger full reprint

      expectReprint(tree, content).toEqual(`{
  let a = 1,
      b = 2;

  g();
}`);
    });

    it("should keep the indentation level for children", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`var a = 1,
    b = 2,
    c = 3,
    d = 4;
`);

      const declarations = sourceFile.statements[0].declarationList;

      tree.replace(
        declarations,
        tree.createVariableDeclarationList({
          declarations: declarations.declarations.slice(0, 2),
          flags: Flags.set(0, ts.NodeFlags.Let),
        })
      );

      tree.insertStatement(
        sourceFile,
        tree.createVariableStatement({
          declarationList: tree.createVariableDeclarationList({
            declarations: declarations.declarations.slice(2, 4),
            flags: Flags.set(0, ts.NodeFlags.Let),
          }),
        }),
        1
      );

      expectReprint(tree, content).toEqual(`let a = 1,
    b = 2;
let c = 3,
    d = 4;
`);
    });

    it("should keep the trailing comma in array literal", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`let a = [
  { x },
];
dummy();`);

      const xIdentifier =
        sourceFile.statements[0].declarationList.declarations[0].initializer
          .elements[0].properties[0].name;

      tree.replace(
        xIdentifier,
        tree.createIdentifier({
          text: "y",
        })
      );
      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`let a = [
  { y },
];`);
    });
  });

  describe("move nodes", () => {
    testReprint(
      "should not duplicate comments when moving node into param initializer",
      `const x = (a /* 1 */, /* 2 */ b) => {
  const a = 123;
};`,
      (sourceFile, tree) => {
        const arrowFunction =
          sourceFile.statements[0].declarationList.declarations[0].initializer;
        const parameter = arrowFunction.parameters[0];
        const innerDeclaration = arrowFunction.body.statements[0];

        tree.replace(
          parameter,
          tree.updateParameterDeclaration(parameter, {
            initializer:
              innerDeclaration.declarationList.declarations[0].initializer,
          })
        );
        tree.remove(innerDeclaration);
      },
      `const x = (a /* 1 */ = 123, /* 2 */ b) => {
};`
    );

    it("should move comments when switching standalone nodes", async () => {
      const { sourceFile, tree, content } = await parseForReprint(
        `if (a) /*1a*/ f() /*1b*/ else /*2a*/ g() /*2b*/`
      );

      tree.replace(
        sourceFile.statements[0].thenStatement,
        sourceFile.statements[0].elseStatement
      );
      tree.replace(
        sourceFile.statements[0].elseStatement,
        sourceFile.statements[0].thenStatement
      );

      expectReprint(tree, content).toEqual(
        `if (a) /*2a*/ g() /*2b*/ else /*1a*/ f() /*1b*/`
      );
    });

    it("inline with leading comment", async () => {
      const { sourceFile, tree, content } =
        await parseForReprint(`const a = 123;

// comment
const b = a;`);

      tree.remove(sourceFile.statements[0]);
      tree.replace(
        sourceFile.statements[1].declarationList.declarations[0].initializer,
        sourceFile.statements[0].declarationList.declarations[0].initializer
      );

      expectReprint(tree, content).toEqual(`
// comment
const b = 123;`);
    });

    it("inline into list", async () => {
      const { sourceFile, tree, content } =
        await parseForReprint(`const a = 123;

f(
  // comment 1
  a,
  // comment 2
  1
);`);

      tree.remove(sourceFile.statements[0]);
      tree.replace(
        sourceFile.statements[1].expression.arguments[0],
        tree.markModifiedNode(
          sourceFile.statements[0].declarationList.declarations[0].initializer,
          sourceFile.statements[1].expression.arguments[0]
        )
      );
      tree.replace(
        sourceFile.statements[1].expression.arguments[1],
        tree.markModifiedNode(
          tree.createIdentifier({
            text: "x",
          }),
          sourceFile.statements[1].expression.arguments[1]
        )
      );

      expectReprint(tree, content).toEqual(`
f(
  // comment 1
  123,
  // comment 2
  x
);`);
    });

    it("inline copy of as expression into list", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`const a = f({
  a: 1,
  b: 2,
}) as A<C>;

f(
  // comment 1
  a,
  // comment 2
  x(a)
);`);

      const { initializer } =
        sourceFile.statements[0].declarationList.declarations[0];
      const { expression } = sourceFile.statements[1];

      tree.remove(sourceFile.statements[0]);
      tree.replace(
        expression.arguments[0],
        tree.markModifiedNode(
          factory.copyShallow(initializer, tree),
          expression.arguments[0]
        )
      );
      tree.replace(
        expression.arguments[1].arguments[0],
        tree.markModifiedNode(
          factory.copyShallow(initializer, tree),
          expression.arguments[1].arguments[0]
        )
      );

      expectReprint(tree, content).toEqual(`
f(
  // comment 1
  f({
    a: 1,
    b: 2,
  }) as A<C>,
  // comment 2
  x(f({
    a: 1,
    b: 2,
  }) as A<C>)
);`);
    });

    it("should maintain whitespace around node that is moved up into list 1", async () => {
      const { sourceFile, tree, content } = await parseForReprint(
        `f(A, [1, 2, 3]); dummy();`
      );

      const callExpression = sourceFile.statements[0].expression;
      tree.replace(
        callExpression,
        tree.updateCallExpression(callExpression, {
          argumentsArray: callExpression.arguments
            .slice(0, 1)
            .concat(...callExpression.arguments[1].elements),
        })
      );
      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`f(A, 1, 2, 3);`);
    });

    it("should maintain whitespace around node that is moved up into list 2", async () => {
      const { sourceFile, tree, content } = await parseForReprint(
        `f(A, [1, 2, 3]); dummy();`
      );

      const callExpression = sourceFile.statements[0].expression;
      tree.replace(
        callExpression,
        tree.updateCallExpression(callExpression, {
          argumentsArray: callExpression.arguments[1].elements,
        })
      );
      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`f(1, 2, 3);`);
    });

    it("should maintain whitespace around node that is moved up into list 3", async () => {
      const { sourceFile, tree, content } = await parseForReprint(
        `f(A, [1, , 3]); dummy();`
      );

      const callExpression = sourceFile.statements[0].expression;
      tree.replace(
        callExpression,
        tree.updateCallExpression(callExpression, {
          argumentsArray: callExpression.arguments[1].elements.map(
            (element: ts.Node) =>
              ts.isOmittedExpression(element)
                ? tree.createIdentifier({
                    text: "undefined",
                  })
                : element
          ),
        })
      );
      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`f(1, undefined, 3);`);
    });

    it("should re-indent whitespace around node that is moved up into block", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`if (a) {
    return fx();
} else f3();
return f5();`);

      tree.replace(
        sourceFile.statements[0],
        tree.updateIfStatement(sourceFile.statements[0], {
          elseStatement: null,
        })
      );
      tree.insertStatement(
        sourceFile,
        sourceFile.statements[0].elseStatement,
        1
      );

      expectReprint(tree, content).toEqual(`if (a) {
    return fx();
}
f3();
return f5();`);
    });

    it("should not duplicate comment when node that is moved up into block", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`if (a) {
    return f();
} else {
  // comment
  g();
  f();
}`);

      tree.insertStatement(
        sourceFile,
        sourceFile.statements[0].elseStatement.statements[1],
        1
      );
      tree.remove(sourceFile.statements[0].thenStatement.statements[0]);
      tree.remove(sourceFile.statements[0].elseStatement.statements[1]);

      expectReprint(tree, content).toEqual(`if (a) {
} else {
  // comment
  g();
}
f();`);
    });

    it("should move prefix lines with node", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  // comment
  f();
}
{
  g();
}`);

      tree.remove(sourceFile.statements[0].statements[0]);
      tree.insertStatement(
        sourceFile.statements[1],
        sourceFile.statements[0].statements[0],
        0
      );

      expectReprint(tree, content).toEqual(`{
}
{
  // comment
  f();
  g();
}`);
    });

    it("should keep multi-line comment relative indentation when moving", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  /* multi-line
    comment
      with
        some
    fancy
    formatting
  */
  f();
}
{
  {
    g();
  }
}`);

      tree.remove(sourceFile.statements[0].statements[0]);
      tree.insertStatement(
        sourceFile.statements[1].statements[0],
        sourceFile.statements[0].statements[0],
        0
      );

      expectReprint(tree, content).toEqual(`{
}
{
  {
    /* multi-line
      comment
        with
          some
      fancy
      formatting
    */
    f();
    g();
  }
}`);
    });

    it("should move trailing comments with node when moved to new block", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  f();
  g(); // trailing comment
  h();
}
{
  f2();
}`);

      tree.remove(sourceFile.statements[0].statements[1]);
      tree.insertStatement(
        sourceFile.statements[1],
        sourceFile.statements[0].statements[1],
        0
      );

      expectReprint(tree, content).toEqual(`{
  f();
  h();
}
{
  g(); // trailing comment
  f2();
}`);
    });

    it("should have correct indentation when re-inserting node below itself and modifying its children variant", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`if (x) {
  f1();
  f2();
}`);

      const ifStatement = sourceFile.statements[0];
      tree.replace(
        ifStatement,
        tree.createBlock({
          statements: [
            tree.updateIfStatement(ifStatement, {
              thenStatement: tree.updateBlock(ifStatement.thenStatement, {
                statements: [ifStatement.thenStatement.statements[1]],
              }),
            }),
          ],
        })
      );

      expectReprint(tree, content).toEqual(
        `{
  if (x) {
    f2();
  }
}`
      );
    });

    it("should have correct indentation when re-inserting node below itself and modifying its children variant 2", async () => {
      const { sourceFile, tree, content } = await parseAndAugment(`if (x) {
  f1();
  f2();
}`);

      const ifStatement = sourceFile.statements[0];
      tree.replace(
        ifStatement,
        tree.createBlock({
          statements: [ifStatement],
        })
      );
      tree.remove(ifStatement.thenStatement.statements[0]);

      expectReprint(tree, content).toEqual(
        `{
  if (x) {
    f2();
  }
}`
      );
    });

    it("should have correct indentation when moving child node from if without blocks", async () => {
      const { sourceFile, tree, content } =
        await parseAndAugment(`function f() {
    if (a)
        return f1();
    else
        return f2();
}`);

      const functionBody = sourceFile.statements[0].body;
      const ifStatement = functionBody.statements[0];

      tree.replace(
        ifStatement,
        tree.updateIfStatement(ifStatement, {
          elseStatement: null,
        })
      );
      tree.insertStatement(functionBody, ifStatement.elseStatement, 1);

      expectReprint(tree, content).toEqual(
        `function f() {
    if (a)
        return f1();
    return f2();
}`
      );
    });

    it("should re-indent block when moving into a new block and moving one node out (before)", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  f();
  // comment 1a
  // comment 1b
  a();
  // comment 2
}`);

      tree.replace(
        sourceFile.statements[0],
        tree.createBlock({
          statements: [
            sourceFile.statements[0].statements[0],
            tree.updateBlock(sourceFile.statements[0], {
              statements: sourceFile.statements[0].statements.slice(1),
            }),
          ],
        })
      );

      expectReprint(tree, content).toEqual(`{
  f();
  {
    // comment 1a
    // comment 1b
    a();
    // comment 2
  }
}`);
    });

    it("should re-indent block when moving into a new block and moving one node out (after)", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  a();
  f();
}`);

      tree.replace(
        sourceFile.statements[0],
        tree.createBlock({
          statements: [
            tree.updateBlock(sourceFile.statements[0], {
              statements: sourceFile.statements[0].statements.slice(0, 1),
            }),
            sourceFile.statements[0].statements[1],
          ],
        })
      );

      expectReprint(tree, content).toEqual(`{
  {
    a();
  }
  f();
}`);
    });
  });

  describe("delete node", () => {
    it("deleting a node should not remove the comment on the next node", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`deleted();
// comment
b();`);

      tree.remove(sourceFile.statements[0]);

      expectReprint(tree, content).toEqual(`// comment
b();`);
    });

    it("deleting a node should preserve the prefix whitespace that separates nodes", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`regionA();

deleted();
regionB();`);

      tree.remove(sourceFile.statements[1]);

      expectReprint(tree, content).toEqual(`regionA();

regionB();`);
    });
  });

  describe("new block", () => {
    it("should reprint with a single new element", async () => {
      const { sourceFile, tree, content } = await parseForReprint(``);

      tree.insertStatement(
        sourceFile,
        tree.createBlock({
          statements: [
            tree.createExpressionStatement({
              expression: tree.createCallExpression({
                expression: tree.createIdentifier({
                  text: "f",
                }),
              }),
            }),
          ],
        }),
        0
      );

      expectReprint(tree, content).toEqual(`{
  f();
}`);
    });
  });

  describe("move trivia", () => {
    it("should re-indent moved trivia", async () => {
      const { sourceFile, tree, content } =
        await parseForReprint(`var value1 = 1,
    // comment
    value2 = 2;
`);

      const newStatement1 = tree.createVariableStatement({
        declarationList: tree.createVariableDeclarationList({
          declarations: [
            sourceFile.statements[0].declarationList.declarations[0],
          ],
        }),
      });
      const newStatement2 = tree.createVariableStatement({
        declarationList: tree.createVariableDeclarationList({
          declarations: [
            sourceFile.statements[0].declarationList.declarations[1],
          ],
        }),
      });

      tree.replaceStatementWithMany(sourceFile.statements[0], [
        newStatement1,
        newStatement2,
      ]);
      tree.updateTrivia(
        new PrefixToSuffixTriviaMove(
          sourceFile.statements[0].declarationList.declarations[1],
          newStatement1
        )
      );

      expectReprint(tree, content).toEqual(`var value1 = 1;
// comment
var value2 = 2;
`);
    });

    it("should move suffix to new node", async () => {
      const { sourceFile, tree, content } =
        await parseForReprint(`var x = {}; // comment

dummy();`);

      const newStatement = tree.createVariableStatement({
        declarationList: tree.createVariableDeclarationList({
          declarations:
            sourceFile.statements[0].declarationList.declarations.slice(0),
        }),
      });

      tree.replace(sourceFile.statements[0], newStatement);
      tree.updateTrivia(
        new SuffixTriviaMove(sourceFile.statements[0], newStatement)
      );

      expectReprint(tree, content).toEqual(content);
    });

    it("should move suffix to new node with multi-replacement", async () => {
      const { sourceFile, tree, content } =
        await parseForReprint(`var x = {}; // comment

dummy();`);

      const newStatement = tree.createVariableStatement({
        declarationList: tree.createVariableDeclarationList({
          declarations:
            sourceFile.statements[0].declarationList.declarations.slice(0),
        }),
      });

      tree.replaceStatementWithMany(sourceFile.statements[0], [newStatement]);
      tree.updateTrivia(
        new SuffixTriviaMove(sourceFile.statements[0], newStatement)
      );

      expectReprint(tree, content).toEqual(content);
    });

    it("should swap prefix whitespace, but retain comments when using swapPosition", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`{
  statement1();

  // comment
  statement2();
}`);

      const block = sourceFile.statements[0];
      const first = block.statements[0];
      const second = block.statements[1];

      tree.updateTrivia(new SwapPositionTriviaMove(first, second));

      tree.replace(
        block,
        tree.updateBlockLike(block, {
          statements: [second, first],
        })
      );

      expectReprint(tree, content).toEqual(`{
  // comment
  statement2();

  statement1();
}`);
    });

    it("should swap trailing newline when using swapPosition", async () => {
      const { sourceFile, tree, content } = await parseForReprint(`statement1();

// comment
statement2();`);

      const first = sourceFile.statements[0];
      const second = sourceFile.statements[1];

      tree.updateTrivia(new SwapPositionTriviaMove(first, second));

      tree.replace(
        sourceFile,
        tree.updateBlockLike(sourceFile, {
          statements: [second, first],
        })
      );

      expectReprint(tree, content).toEqual(`// comment
statement2();

statement1();`);
    });
  });
});
