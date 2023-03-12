import { TransformedNodeTree } from "../TransformedNodeTree.generated";
import { createParseAndAugmentFunction } from "../../augmentation/createParseAndAugmentFunction";

export const expectReprint = (tree: TransformedNodeTree, content: string) => {
  const edit = tree.toEdit();
  return expect(edit?.applyTo(content) ?? content);
};

export const parseForReprint = async (content: string) => {
  const augment = createParseAndAugmentFunction();
  const { sourceFile } = await augment(content);
  const tree = new TransformedNodeTree(sourceFile);

  return {
    sourceFile,
    tree,
    content,
  };
};
