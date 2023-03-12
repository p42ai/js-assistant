import ts from "typescript";
import { getId } from "../ast/getId";
import { createParseAndAugmentFunction } from "../augmentation/createParseAndAugmentFunction";
import { TransformedNodeTree } from "./TransformedNodeTree.generated";

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

describe("TransformedNodeTree", () => {
  describe("getMovedNodes", () => {
    it("should return swapped nodes (changed parent attributes)", async () => {
      const { sourceFile, tree } = await parseAndAugment(`if (x) a; else b;`);

      const node = sourceFile.statements[0] as ts.IfStatement;

      tree.replace(
        node,
        tree.updateIfStatement(node, {
          thenStatement: node.elseStatement,
          elseStatement: node.thenStatement,
        })
      );

      expect(tree.getMovedNodes().map((node) => getId(node))).toEqual([
        getId(node.elseStatement),
        getId(node.thenStatement),
      ]);
    });

    it("should return node that has been moved to a new parent", async () => {
      const { sourceFile, tree } = await parseAndAugment(`c(x);`);

      const node = sourceFile.statements[0].expression as ts.CallExpression;

      // f(x)
      tree.replace(
        node,
        tree.createCallExpression({
          expression: tree.createIdentifier({
            text: "f",
          }),
          argumentsArray: [node.arguments[0]],
        })
      );

      expect(tree.getMovedNodes().map((node) => getId(node))).toEqual([
        getId(node.arguments[0]),
      ]);
    });
  });

  describe("getNodePath", () => {
    it("should have correct node path for swapped-out inner node", async () => {
      const { sourceFile, tree } = await parseAndAugment(
        `{ console.log("a"); }`
      );

      const newStringLiteral = tree.createStringLiteral({
        text: "x",
      });

      tree.replace(
        sourceFile.statements[0].statements[0].expression.arguments[0],
        newStringLiteral
      );

      const nodePath = tree.getNodePath(newStringLiteral);

      expect(nodePath).toEqual([
        "statements",
        0,
        "statements",
        0,
        "expression",
        "arguments",
        0,
      ]);
    });

    it("should have correct node path for swapped-out inner node when there are multiple changes", async () => {
      const { sourceFile, tree } = await parseAndAugment(`
{
  console.log("a");
  f();
}`);

      const newStringLiteral = tree.createStringLiteral({
        text: "x",
      });

      tree.replace(
        sourceFile.statements[0].statements[0].expression.arguments[0],
        newStringLiteral
      );

      tree.replace(
        sourceFile.statements[0].statements[1].expression.expression,
        tree.createIdentifier({
          text: "g",
        })
      );

      const nodePath = tree.getNodePath(newStringLiteral);

      expect(nodePath).toEqual([
        "statements",
        0,
        "statements",
        0,
        "expression",
        "arguments",
        0,
      ]);
    });

    it("should return correct path for unmodified inner node", async () => {
      const { sourceFile, tree } = await parseAndAugment(`
        if (a) {
          if (b) {}
        }
      `);

      const outerIf = sourceFile.statements[0];
      const innerIf = outerIf.thenStatement.statements[0];

      tree.replace(outerIf.expression, innerIf.expression);
      tree.replace(innerIf.expression, outerIf.expression);

      const nodePath = tree.getNodePath(innerIf);

      expect(nodePath).toEqual([
        "statements",
        0,
        "thenStatement",
        "statements",
        0,
      ]);
    });
  });
});
