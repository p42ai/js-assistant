import _ from "lodash";
import ts from "typescript";
import { factory, NodePath } from "..";
import { isBlockLike } from "../ast/BlockLike";
import { forEachChildWithAttribute } from "../ast/forEachChildWithAttribute.generated";
import { getId } from "../ast/getId";
import { getParentAttribute } from "../ast/getParentAttribute";
import { getPathFromRoot } from "../ast/getPathFromRoot";
import { getPathOnto } from "../ast/getPathOnto";
import { Flags } from "../util/Flags";
import { copyShallow } from "./factory";
import { getRemovalNode } from "./getRemovalNode";
import { needsParentheses } from "./needsParentheses";
import { NodeTransformationState } from "./NodeTransformationState";
import { Replacement } from "./Replacement";
import { Edit } from "./reprinter/Edit";
import { Reprinter } from "./reprinter/Reprinter";
import { TransformedNodeTree } from "./TransformedNodeTree.generated";
import { SuffixTriviaMove } from "./trivia/SuffixTriviaMove";
import { TrailingSeparatorTriviaMove } from "./trivia/TrailingSeparatorTriviaMove";
import { TriviaUpdate } from "./trivia/TriviaUpdate";

export type NodeInformation = {
  node: ts.Node;

  // parent can be undefined if the node is a SourceFile.
  parent: ts.Node | undefined;

  // parent property can be undefined when the node is a source file
  parentProperty: string | undefined;
};

export type NodeTransformationInfo = {
  // original node
  original: ts.Node | undefined;

  // only for copied node: the node that was copied
  source: ts.Node | undefined;

  state: NodeTransformationState | undefined;
};

/**
 * Mutable minimal changed node tree. It can be changed many times and offers operations
 * for applying different kinds of changes.
 */
export abstract class AbstractTransformedNodeTree {
  /**
   * Original source tree.
   */
  originalSource: ts.SourceFile;

  /**
   * AST node at which the modification starts. There is a direct modification to this node,
   * or paths to at least 2 modified tree nodes. The modification root must have a
   * linked original node. When the modification root is undefined, there are no changes.
   */
  modificationRoot: ts.Node | undefined;

  // TODO merge into #nodeInformation
  readonly #originalNodes = new Map<ts.Node, ts.Node>();

  readonly #removedNodes = new Set<ts.Node>();

  #nodeInformation = new Map<ts.Node, NodeInformation>();

  #nodeTransformationInfo = new Map<ts.Node, NodeTransformationInfo>();

  private readonly forcedLeadingNewlines = new Set<ts.Node>();

  constructor(originalSource: ts.SourceFile) {
    this.originalSource = originalSource;
  }

  /**
   * Returns the original tree node for a node from the transformed tree. This can be
   * the node itself, when it's an original node, or undefined when it's a new node. The
   * type of the node can also change, when e.g. an operation replaces a for loop with
   * a for..of loop.
   */
  getOriginalNode(node: ts.Node): ts.Node | undefined {
    // Try returning stored original node. Fallback to original nodes from ts.factory.update
    return (
      this.#originalNodes.get(node) ??
      this.getNodeTransformationInfo(node).original
    );
  }

  hasModifiedNodes(path: Array<ts.Node>): boolean {
    // TODO refactoring that replaces with 'some' / 'every'
    // return path.some((node) => this.getOriginalNode(node) != null);
    // (also return / assignment flexibility)
    for (const node of path) {
      if (
        this.getModifiedNodeForOriginal(node) != null ||
        this.getNodeTransformationState(node) === "new" ||
        this.getNodeTransformationState(node) === "modified"
      ) {
        return true;
      }
    }
    return false;
  }

  copy<T extends ts.Node>(node: T): T {
    // cast to TransformedNodeTree is possible because there should be
    // no other children of AbstractTransformedNodeTree (it is there for
    // code generation purposes):
    return copyShallow(node, this as unknown as TransformedNodeTree);
  }

  getNodeTransformationInfo(node: ts.Node): NodeTransformationInfo {
    if (!this.#nodeTransformationInfo.has(node)) {
      this.#nodeTransformationInfo.set(node, {
        original: undefined,
        state: undefined,
        source: undefined,
      });
    }

    return this.#nodeTransformationInfo.get(node)!;
  }

  getNodeInformation(node: ts.Node) {
    // potential causes for missing nodes:
    // - node has been modified after its reference was created (e.g. it's content was changed)
    // - node is not part of modified tree (maybe the tree is unmodified, or it's a sibling)
    return this.#nodeInformation.get(node);
  }

  needsParentheses(node: ts.Node): boolean {
    const nodeInformation = this.getNodeInformation(node);
    return nodeInformation == null ? false : needsParentheses(nodeInformation);
  }

  private getModificationRootOriginal(): ts.Node | undefined {
    return this.modificationRoot != null
      ? this.getOriginalNode(this.modificationRoot)!
      : undefined;
  }

  /**
   * Returns the parent of the modification root node. Can be undefined if there
   * is no modification or when it is a source file and has no parent.
   */
  private getModificationRootParent(): ts.Node | undefined {
    return this.getModificationRootOriginal()?.parent;
  }

  /**
   * Returns the attribute that connects modification root to it's parent.
   */
  private getModificationRootAttribute(): string | undefined {
    return this.modificationRoot != null
      ? getParentAttribute(this.getOriginalNode(this.modificationRoot)!)
      : undefined;
  }

  getNodeTransformationState(
    node: ts.Node
  ): NodeTransformationState | undefined {
    return this.getNodeTransformationInfo(node).state;
  }

  private updateNodeInformation(): void {
    this.#nodeInformation.clear();

    if (this.modificationRoot == null) {
      return;
    }

    const rootParent = this.getModificationRootParent();
    const rootAttribute = this.getModificationRootAttribute()!;

    this.#nodeInformation.set(this.modificationRoot, {
      node: this.modificationRoot,
      parent: rootParent,
      parentProperty: rootAttribute,
    });

    let currentParent = this.modificationRoot;

    const visitNode = (node: ts.Node, attribute: string) => {
      node = node as ts.Node;
      this.#nodeInformation.set(node, {
        node,
        parent: currentParent,
        parentProperty: attribute,
      });
      const previousParent = currentParent;
      currentParent = node;
      forEachChildWithAttribute(node, visitNode);
      currentParent = previousParent;
    };

    forEachChildWithAttribute(this.modificationRoot, visitNode);
  }

  /**
   * Returns the path from the modified node to the modified root, excluding the modified
   * root.
   *
   * @param node
   *        Node that is part of the modified subtree.
   */
  getPathToModifiedRoot(node: ts.Node) {
    this.updateNodeInformation();
    const pathToModifiedRoot: ts.Node[] = [];
    let currentNode: ts.Node | undefined = node;
    while (currentNode !== this.modificationRoot && currentNode != null) {
      pathToModifiedRoot.unshift(currentNode);
      currentNode = this.getNodeInformation(currentNode)?.parent;
    }
    return pathToModifiedRoot;
  }

  containsOriginalInsideModificationRoot(original: ts.Node): boolean {
    if (this.modificationRoot == null) {
      return false;
    }

    const containsOriginal = (node: ts.Node): boolean =>
      node === original ? true : node.forEachChild(containsOriginal) ?? false;

    return containsOriginal(this.modificationRoot);
  }

  getModifiedNodeForOriginal(original: ts.Node): ts.Node | undefined {
    if (this.modificationRoot == null) {
      return undefined;
    }

    const findModifiedNode = (node: ts.Node): ts.Node | undefined => {
      if (this.getOriginalNode(node) === original) {
        return node;
      }

      if (
        this.getNodeTransformationState(node) ===
        NodeTransformationState.ORIGINAL
      ) {
        return undefined;
      }

      return node.forEachChild(findModifiedNode);
    };

    return findModifiedNode(this.modificationRoot);
  }

  getModifiedNodeToOriginalNodeMap(): Map<ts.Node, ts.Node | null> {
    const map = new Map<ts.Node, ts.Node | null>();

    if (this.modificationRoot == null) {
      return map;
    }

    const visit = (node: ts.Node): ts.Node | undefined => {
      if (
        this.getNodeTransformationState(node) ===
        NodeTransformationState.ORIGINAL
      ) {
        return;
      }

      map.set(node, this.getOriginalNode(node) ?? null);

      return node.forEachChild(visit);
    };

    visit(this.modificationRoot);

    return map;
  }

  isRemoved(node: ts.Node): boolean {
    return this.#removedNodes.has(node);
  }

  remove(...nodes: Array<ts.Node>) {
    for (const node of nodes) {
      this.#removeNode(node);
    }
  }

  #removeNode(node: ts.Node): void {
    const { replacedNode, replacement } = getRemovalNode(node);

    if (replacement == null) {
      this.#removedNodes.add(replacedNode);
    }

    const { parent } = replacedNode;

    const replacementNode =
      replacement === "omittedExpression"
        ? this.asTransformedNodeTree().createOmittedExpression()
        : null;

    // when there is already a modified node for the parent, modify it further
    // and replace it's existing modification:
    const modifiedParent = this.getModifiedNodeForOriginal(parent);
    if (modifiedParent != null) {
      this.replace(
        parent,
        factory.updateNode({
          node: modifiedParent,
          nodePaths: [[replacedNode]],
          replacements: createReplacementMap({
            originalNode: replacedNode,
            replacementNode,
          }),
          tree: this.asTransformedNodeTree(),
        })
      );
      return;
    }

    this.replace(
      parent,
      factory.updateNode({
        node: parent,
        nodePaths: [[replacedNode]],
        replacements: createReplacementMap({
          originalNode: replacedNode,
          replacementNode,
        }),
        tree: this.asTransformedNodeTree(),
      })
    );
  }

  removeFirstStatement(block: ts.BlockLike) {
    this.remove(block.statements[0]);
  }

  removeLastStatement(block: ts.BlockLike) {
    this.remove(block.statements[block.statements.length - 1]);
  }

  insertStatement(
    targetBlock: ts.BlockLike,
    statement: ts.Statement,
    position: number
  ) {
    const block = this.getModifiedNodeForOriginal(targetBlock) ?? targetBlock;

    if (!isBlockLike(block)) {
      throw "block is not a block, case clause, module block or sourcefile";
    }

    const statements = block.statements.slice(); // create copy
    statements.splice(position, 0, statement);

    this.replace(
      targetBlock,
      this.updateBlockLike(block, {
        statements,
      })
    );
  }

  /**
   * Inserts a sequence of statements after a reference statement.
   */
  insertStatementsAfter(
    reference: ts.Statement,
    ...statements: Array<ts.Statement>
  ) {
    this.insertStatementsWithReference(
      reference.parent as ts.BlockLike,
      this.getStatementPosition(reference) + 1,
      ...statements
    );
  }

  /**
   * Inserts a sequence of statements before a reference statement.
   */
  insertStatementsBefore(
    reference: ts.Statement,
    ...statements: Array<ts.Statement>
  ) {
    this.insertStatementsWithReference(
      reference.parent as ts.BlockLike,
      this.getStatementPosition(reference),
      ...statements
    );
  }

  private insertStatementsWithReference(
    block: ts.BlockLike,
    referencePosition: number,
    ...statements: Array<ts.Statement>
  ) {
    let position = referencePosition;
    for (const statement of statements) {
      this.insertStatement(block, statement, position++);
    }
  }

  /**
   * Inserts a sequence of statements at the end of a block.
   */
  appendStatements(block: ts.BlockLike, ...statements: Array<ts.Statement>) {
    let position = block.statements.length;
    for (const statement of statements) {
      this.insertStatement(block, statement, position++);
    }
  }

  getBlockParent(statement: ts.Statement): ts.BlockLike {
    const originalBlock = statement.parent;
    const block =
      this.getModifiedNodeForOriginal(originalBlock) ?? originalBlock;

    if (!isBlockLike(block)) {
      throw new Error(
        `${getId(
          block
        )} is not a block, case clause, module block or sourcefile`
      );
    }

    return block;
  }

  /**
   * Returns the position of a statement in a block. This method also
   * works with modified trees (and should be used to ensure that mass
   * refactoring works correctly).
   */
  getStatementPosition(statement: ts.Statement) {
    const originalBlock = statement.parent;
    const block = this.getBlockParent(statement);

    return block.statements.indexOf(
      block === originalBlock
        ? statement
        : (this.getModifiedNodeForOriginal(statement) as ts.Statement) ??
            statement
    );
  }

  replaceStatementWithMany(
    original: ts.Statement,
    replacements: Array<ts.Statement>
  ) {
    const parent =
      this.getModifiedNodeForOriginal(original.parent) ?? original.parent;

    if (!isBlockLike(parent)) {
      throw "parent is not a block, case clause, module block or sourcefile";
    }

    // calculate new statements
    const statements = parent.statements.slice(); // slice to create copy
    const index = statements.indexOf(original);
    const removed = statements.splice(index, 1, ...replacements);

    // set the original node as original for the first replacement to transfer
    // leading whitespace
    this.getNodeTransformationInfo(replacements[0]).original = removed[0];

    this.replace(
      original.parent,
      this.updateBlockLike(parent, {
        statements,
      })
    );
  }

  getEnhancedId(node: ts.Node): string {
    return `${getId(node)}-${this.getNodeTransformationState(node)}`;
  }

  isNew(node: ts.Node): boolean {
    const state = this.getNodeTransformationState(node);
    return (
      state === NodeTransformationState.NEW ||
      (state == null && node.pos === -1)
    );
  }

  isOriginal(node: ts.Node): boolean {
    return (
      this.getNodeTransformationState(node) === NodeTransformationState.ORIGINAL
    );
  }

  isModified(node: ts.Node): boolean {
    return (
      this.getNodeTransformationState(node) === NodeTransformationState.MODIFIED
    );
  }

  #mapOriginal(original: ts.Node, replacement: ts.Node): void {
    const trueOriginal = this.getOriginalNode(original) ?? original;

    this.#originalNodes.set(replacement, trueOriginal);

    this.getNodeTransformationInfo(replacement).original = trueOriginal;
  }

  #replaceRoot(original: ts.Node, replacement: ts.Node): void {
    this.modificationRoot = replacement;
    this.#mapOriginal(original, replacement);
  }

  #replaceInOrBelowModifiedTree(original: ts.Node, replacement: ts.Node): void {
    // get the modification root original before replacing the modification root
    const modificationRootOriginal = this.getModificationRootOriginal()!;

    // replace path from modified root to the replaced node:
    this.modificationRoot = factory.updateNode({
      node: this.modificationRoot!,
      nodePaths: [this.getPathToModifiedRoot(original)],
      replacements: createReplacementMap({
        originalNode: original,
        replacementNode: replacement,
      }),
      tree: this.asTransformedNodeTree(),
    });

    this.#mapOriginal(original, replacement);
    this.#originalNodes.set(this.modificationRoot!, modificationRootOriginal);
  }

  replace(original: ts.Node, replacement: ts.Node): void {
    // mark the replacement as original (unless it already has been marked as original)
    // to ensure that the replacement is always reprinted as is (unless modified or new)
    this.markOriginalNode(replacement);

    // There are 5 different cases that can happen:
    // a) the tree is empty
    // b) replacing a node that has a modified version on the tree
    // b1) the node was originally at the location of the modification root
    // b1-0) the node is a new node that is now the modification root
    // b1-1) the node was moved deeper into the modification tree
    // c) the new replacement is somewhere below the replaced tree
    // d) the new replacement is above / at the sides of the replaced tree

    // case a) the tree is empty
    if (this.modificationRoot == null) {
      this.#replaceRoot(original, replacement);
      return;
    }

    // sub case b1) node was originally at the location of the modification root

    // b1-0) replacing new node
    if (this.isNew(original) && original === this.modificationRoot) {
      this.#replaceRoot(original, replacement);
      return;
    }

    if (this.isModified(original) && original === this.modificationRoot) {
      const oldOriginal = this.getOriginalNode(this.modificationRoot)!;
      this.modificationRoot = replacement;
      this.#mapOriginal(oldOriginal, replacement);
      return;
    }

    const modifiedOriginal = this.getModifiedNodeForOriginal(original);
    if (modifiedOriginal === this.modificationRoot) {
      // b1-1) the node was moved deeper into the modification tree
      if (this.containsOriginalInsideModificationRoot(original)) {
        this.#replaceInOrBelowModifiedTree(original, replacement);
        return;
      }

      this.#replaceRoot(original, replacement);
      return;
    }

    // case b) replacing a node that has a modified version on the tree
    // TODO this is a potential conflict, tho in the case of remove it's ok
    const modificationRootOriginal = this.getModificationRootOriginal()!;
    if (modifiedOriginal != null) {
      this.#replaceInOrBelowModifiedTree(modifiedOriginal, replacement);
      return;
    }

    // case c) replacement is below modified tree
    const originalRootPath = getPathFromRoot(original);

    if (this.hasModifiedNodes(originalRootPath)) {
      this.#replaceInOrBelowModifiedTree(original, replacement);
      return;
    }

    const originalModificationPath = getPathOnto(
      modificationRootOriginal,
      originalRootPath
    );

    if (originalModificationPath == null) {
      throw `no path from ${this.getEnhancedId(
        modificationRootOriginal
      )} onto ${originalRootPath.map((node) => this.getEnhancedId(node))}`;
    }

    const originalCommonAncestor = originalModificationPath[0];

    // make operationPath a relative path from common ancestor
    while (originalRootPath[0] !== originalCommonAncestor) {
      originalRootPath.splice(0, 1);
    }

    // remove common ancestor from paths
    originalModificationPath.splice(0, 1);
    originalRootPath.splice(0, 1);

    // move the modification root?
    if (original === originalCommonAncestor) {
      this.modificationRoot = factory.updateNode({
        node: replacement,
        nodePaths: [originalModificationPath, originalRootPath],
        replacements: createReplacementMap({
          originalNode: this.getOriginalNode(this.modificationRoot)!,
          replacementNode: this.modificationRoot,
        }),
        tree: this.asTransformedNodeTree(),
      });

      this.#mapOriginal(original, replacement);
      this.#originalNodes.set(this.modificationRoot!, originalCommonAncestor);
      return;
    }

    this.modificationRoot = factory.updateNode({
      node: originalCommonAncestor,
      nodePaths: [originalModificationPath, originalRootPath],
      replacements: createReplacementMap(
        {
          originalNode: this.getOriginalNode(this.modificationRoot)!,
          replacementNode: this.modificationRoot,
        },
        {
          originalNode: original,
          replacementNode: replacement,
        }
      ),
      tree: this.asTransformedNodeTree(),
    });

    this.#mapOriginal(original, replacement);
    this.#originalNodes.set(this.modificationRoot!, originalCommonAncestor);
  }

  /**
   * Returns the nodes that have been moved to a different position. A different position
   * can be a different parent, a different attribute under the same parent.
   *
   * TODO figure out how to handle array index changes (which can come from unrelated insertions)
   */
  getMovedNodes(): Array<ts.Node> {
    if (this.modificationRoot == null) {
      return [];
    }

    const movedNodes: Array<ts.Node> = [];
    let currentParent = this.modificationRoot;

    // TODO unify with other method
    const getOriginal = (node: ts.Node): ts.Node | undefined => {
      switch (this.getNodeTransformationState(node)) {
        case NodeTransformationState.ORIGINAL:
          return node;
        case NodeTransformationState.MODIFIED:
          return this.getNodeTransformationInfo(node).original;
        case NodeTransformationState.NEW:
        default:
          return undefined;
      }
    };

    // modification root case:
    const rootOriginal = getOriginal(this.modificationRoot);
    if (
      rootOriginal != null &&
      rootOriginal.parent !== this.getModificationRootParent()
    ) {
      movedNodes.push(this.modificationRoot);
    }

    const visitNode = (node: ts.Node, attribute: string) => {
      const transformationState = this.getNodeTransformationState(node);
      if (
        transformationState === NodeTransformationState.ORIGINAL ||
        transformationState === NodeTransformationState.MODIFIED
      ) {
        // parent has changed:
        if (getOriginal(node)?.parent !== getOriginal(currentParent)) {
          movedNodes.push(node);
        } else {
          // parent attribute is different -> node was moved:
          const originalAttribute = getParentAttribute(node); // assumed node.parent is original
          if (attribute !== originalAttribute) {
            movedNodes.push(node);
          }
        }
      }

      // recursion to check children:
      const previousParent = currentParent;
      currentParent = node;
      forEachChildWithAttribute(node, visitNode);
      currentParent = previousParent;
    };
    forEachChildWithAttribute(this.modificationRoot, visitNode);

    return movedNodes;
  }

  markModifiedNode<T extends ts.Node | undefined>(node: T, original: T): T {
    if (node == null) {
      return node;
    }

    const transformationInfo = this.getNodeTransformationInfo(node);

    if (transformationInfo.state != null) {
      return node;
    }

    const originalTransformationInfo =
      original != null ? this.getNodeTransformationInfo(original) : undefined;

    // when the original was already a modified that has an original, point to the
    // true original node instead (and discard the intermediate node):
    transformationInfo.original =
      originalTransformationInfo?.original ?? original;

    // original is a new node already, keep as new:
    if (originalTransformationInfo?.state === NodeTransformationState.NEW) {
      return this.markNewNode(node) as T;
    }

    transformationInfo.state = NodeTransformationState.MODIFIED;

    return node;
  }

  markNewNode<T extends ts.Node>(node: T): T {
    const transformationInfo = this.getNodeTransformationInfo(node);

    if (transformationInfo.state == null) {
      transformationInfo.state = NodeTransformationState.NEW;
    }

    return node;
  }

  markCopiedNode<T extends ts.Node>(node: T, source: T): T {
    if (node == null) {
      return node;
    }

    const transformationInfo = this.getNodeTransformationInfo(node);

    transformationInfo.source = source;
    transformationInfo.state = NodeTransformationState.MODIFIED;

    return node;
  }

  markOriginalNode<T extends ts.Node>(node: T): T {
    const transformationInfo = this.getNodeTransformationInfo(node);

    if (transformationInfo.state == null) {
      transformationInfo.state = NodeTransformationState.ORIGINAL;
    }

    return node;
  }

  markOriginalOptionalNode<T extends ts.Node>(
    node: T | null | undefined
  ): T | undefined {
    return node == null ? undefined : this.markOriginalNode(node);
  }

  markOriginalOptionalNodeArray<
    T extends ts.NodeArray<ts.Node> | Array<ts.Node>
  >(nodes: T | null | undefined): T | undefined {
    return nodes == null ? undefined : this.markOriginalNodeArray(nodes);
  }

  markOriginalNodeArray<T extends ts.NodeArray<ts.Node> | Array<ts.Node>>(
    nodes: T
  ): T {
    return nodes.map((node) => this.markOriginalNode(node)) as unknown as T;
  }

  createArrayLiteralExpression({
    elements,
    isMultiLine,
  }: {
    elements: Array<ts.Expression>;
    isMultiLine?: boolean | undefined;
  }) {
    return this.markNewNode(
      ts.factory.createArrayLiteralExpression(
        this.markOriginalNodeArray(elements),
        isMultiLine
      )
    );
  }

  updateArrayLiteralExpression(
    original: ts.ArrayLiteralExpression,
    {
      elements = original.elements.slice(),
    }: {
      elements: Array<ts.Expression> | undefined;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateArrayLiteralExpression(
        original,
        this.markOriginalNodeArray(elements)
      ),
      original
    );
  }

  createBigIntLiteral({ text }: { text: string }) {
    return this.markNewNode(ts.factory.createBigIntLiteral(text));
  }

  updateBigIntLiteral(
    original: ts.BigIntLiteral,
    {
      text = original.text,
    }: {
      text: string;
    }
  ) {
    return this.markModifiedNode(
      this.createBigIntLiteral({
        text,
      }),
      original
    );
  }

  createElementAccessExpression({
    expression,
    argumentExpression,
  }: {
    expression: ts.Expression;
    argumentExpression: ts.Expression;
  }) {
    return this.markNewNode(
      ts.factory.createElementAccessExpression(
        this.markOriginalNode(expression),
        this.markOriginalNode(argumentExpression)
      )
    );
  }

  updateElementAccessExpression(
    original: ts.ElementAccessExpression,
    {
      expression = original.expression,
      argumentExpression = original.argumentExpression,
    }: {
      expression: ts.Expression;
      argumentExpression: ts.Expression;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateElementAccessExpression(
        original,
        this.markOriginalNode(expression),
        this.markOriginalNode(argumentExpression)
      ),
      original
    );
  }

  createElementAccessChain({
    expression,
    argumentExpression,
    questionDotToken = ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
  }: {
    expression: ts.Expression;
    argumentExpression: ts.Expression;
    questionDotToken?: ts.QuestionDotToken | undefined;
  }) {
    return this.markNewNode(
      ts.factory.createElementAccessChain(
        this.markOriginalNode(expression),
        questionDotToken,
        this.markOriginalNode(argumentExpression)
      )
    );
  }

  updateElementAccessChain(
    original: ts.ElementAccessChain,
    {
      expression = original.expression,
      argumentExpression = original.argumentExpression,
    }: {
      expression?: ts.Expression;
      argumentExpression?: ts.Expression;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateElementAccessChain(
        original,
        this.markOriginalNode(expression),
        original.questionDotToken,
        argumentExpression
      ),
      original
    );
  }

  createNull() {
    return this.markNewNode(ts.factory.createNull());
  }

  createModifier(keyword: ts.ModifierSyntaxKind) {
    return this.markNewNode(ts.factory.createModifier(keyword));
  }

  createJsxClosingFragment() {
    // working around inconsistent naming in TS:
    return this.markNewNode(ts.factory.createJsxJsxClosingFragment());
  }

  updateJsxClosingFragment(original: ts.JsxClosingFragment) {
    return this.markModifiedNode(this.createJsxClosingFragment(), original);
  }

  createNumericLiteral({ text }: { text: string }) {
    return this.markNewNode(ts.factory.createNumericLiteral(text));
  }

  updateNumericLiteral(
    original: ts.NumericLiteral,
    {
      text = original.text,
    }: {
      text: string;
    }
  ) {
    return this.markModifiedNode(
      this.createNumericLiteral({
        text,
      }),
      original
    );
  }

  createVariableDeclarationList({
    declarations,
    flags,
  }: {
    declarations: Array<ts.VariableDeclaration>;
    flags?: ts.NodeFlags | null;
  }) {
    return this.markNewNode(
      ts.factory.createVariableDeclarationList(
        this.markOriginalNodeArray(declarations),
        flags ?? undefined
      )
    );
  }

  updateVariableDeclarationList(
    original: ts.VariableDeclarationList,
    {
      declarations = original.declarations.slice(),
      flags,
    }: {
      declarations?: Array<ts.VariableDeclaration>;
      flags?: ts.NodeFlags | null;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.createVariableDeclarationList(
        this.markOriginalNodeArray(declarations),
        flags ?? original.flags
      ),
      original
    );
  }

  createPropertyAccessExpression({
    expression,
    name,
  }: {
    expression: ts.Expression;
    name: string | ts.MemberName;
  }) {
    if (_.isString(name)) {
      name = this.markNewNode(ts.factory.createIdentifier(name));
    }

    return this.markNewNode(
      ts.factory.createPropertyAccessExpression(
        this.markOriginalNode(expression),
        this.markOriginalNode(name)
      )
    );
  }

  updatePropertyAccessExpression(
    original: ts.PropertyAccessExpression,
    {
      expression = original.expression,
      name = original.name,
    }: {
      expression?: ts.Expression;
      name?: ts.MemberName;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updatePropertyAccessExpression(
        original,
        this.markOriginalNode(expression),
        name
      ),
      original
    );
  }

  createPropertyAccessChain({
    expression,
    name,
    questionDotToken = ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
  }: {
    expression: ts.Expression;
    name: string | ts.MemberName;
    questionDotToken?: ts.QuestionDotToken | undefined;
  }) {
    if (_.isString(name)) {
      name = this.markNewNode(ts.factory.createIdentifier(name));
    }

    return this.markNewNode(
      ts.factory.createPropertyAccessChain(
        this.markOriginalNode(expression),
        questionDotToken,
        this.markOriginalNode(name)
      )
    );
  }

  updatePropertyAccessChain(
    original: ts.PropertyAccessChain,
    {
      expression = original.expression,
      name = original.name,
    }: {
      expression?: ts.Expression;
      name?: ts.MemberName;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updatePropertyAccessChain(
        original,
        this.markOriginalNode(expression),
        original.questionDotToken,
        name
      ),
      original
    );
  }

  createCallExpression({
    expression,
    typeArguments,
    argumentsArray,
  }: {
    expression: ts.Expression;
    typeArguments?: Array<ts.TypeNode> | null;
    argumentsArray?: Array<ts.Expression> | null;
  }) {
    return this.markNewNode(
      ts.factory.createCallExpression(
        this.markOriginalNode(expression),
        this.markOriginalOptionalNodeArray(typeArguments),
        this.markOriginalOptionalNodeArray(argumentsArray)
      )
    );
  }

  updateCallExpression(
    original: ts.CallExpression,
    {
      expression = original.expression,
      typeArguments = original.typeArguments?.slice(),
      argumentsArray = original.arguments?.slice(),
    }: {
      expression?: ts.Expression;
      typeArguments?: Array<ts.TypeNode> | null;
      argumentsArray?: Array<ts.Expression>;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateCallExpression(
        original,
        this.markOriginalNode(expression),
        this.markOriginalOptionalNodeArray(typeArguments),
        this.markOriginalNodeArray(argumentsArray)
      ),
      original
    );
  }

  createCallChain({
    expression,
    typeArguments,
    argumentsArray,
    questionDotToken = ts.factory.createToken(ts.SyntaxKind.QuestionDotToken),
  }: {
    expression: ts.Expression;
    typeArguments?: Array<ts.TypeNode> | null;
    argumentsArray?: Array<ts.Expression> | null;
    questionDotToken?: ts.QuestionDotToken | undefined;
  }) {
    return this.markNewNode(
      ts.factory.createCallChain(
        this.markOriginalNode(expression),
        questionDotToken,
        this.markOriginalOptionalNodeArray(typeArguments),
        this.markOriginalOptionalNodeArray(argumentsArray)
      )
    );
  }

  updateCallChain(
    original: ts.CallChain,
    {
      expression = original.expression,
      typeArguments = original.typeArguments?.slice(),
      argumentsArray = original.arguments?.slice(),
    }: {
      expression?: ts.Expression;
      typeArguments?: Array<ts.TypeNode> | null;
      argumentsArray?: Array<ts.Expression>;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateCallChain(
        original,
        this.markOriginalNode(expression),
        original.questionDotToken,
        this.markOriginalOptionalNodeArray(typeArguments),
        this.markOriginalNodeArray(argumentsArray)
      ),
      original
    );
  }

  createPropertyDeclaration({
    modifiers,
    name,
    questionToken,
    exclamationToken,
    type,
    initializer,
  }: {
    modifiers?: Array<ts.ModifierLike> | null;
    name: ts.PropertyName;
    questionToken?: ts.QuestionToken | null;
    exclamationToken?: ts.ExclamationToken | null;
    type?: ts.TypeNode | null;
    initializer?: ts.Expression | null;
  }) {
    return this.markNewNode(
      ts.factory.createPropertyDeclaration(
        this.markOriginalOptionalNodeArray(modifiers),
        this.markOriginalNode(name),
        questionToken ?? exclamationToken ?? undefined,
        this.markOriginalOptionalNode(type),
        this.markOriginalOptionalNode(initializer)
      )
    );
  }

  updatePropertyDeclaration(
    original: ts.PropertyDeclaration,
    {
      modifiers = original.modifiers?.slice(),
      name = original.name,
      questionToken = original.questionToken,
      exclamationToken = original.exclamationToken,
      type = original.type,
      initializer = original.initializer,
    }: {
      modifiers?: Array<ts.ModifierLike> | null;
      name?: ts.PropertyName;
      questionToken?: ts.QuestionToken | null;
      exclamationToken?: ts.ExclamationToken | null;
      type?: ts.TypeNode | null;
      initializer?: ts.Expression | null;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updatePropertyDeclaration(
        original,
        this.markOriginalOptionalNodeArray(modifiers),
        this.markOriginalNode(name),
        questionToken ?? exclamationToken ?? undefined,
        this.markOriginalOptionalNode(type),
        this.markOriginalOptionalNode(initializer)
      ),
      original
    );
  }

  createStringLiteral({
    text,
    isSingleQuote = undefined,
  }: {
    text: string;
    isSingleQuote?: boolean;
  }) {
    return this.markNewNode(
      ts.factory.createStringLiteral(text, isSingleQuote)
    );
  }

  updateStringLiteral(
    original: ts.StringLiteral,
    {
      text = original.text,
    }: {
      text: string;
    }
  ) {
    return this.markModifiedNode(
      this.createStringLiteral({
        text,
      }),
      original
    );
  }

  createTypeReferenceNode({
    typeName,
    typeArguments,
  }: {
    typeName: ts.EntityName;
    typeArguments?: Array<ts.TypeNode> | null;
  }) {
    return this.markNewNode(
      ts.factory.createTypeReferenceNode(
        this.markOriginalNode(typeName),
        this.markOriginalOptionalNodeArray(typeArguments)
      )
    );
  }

  updateTypeReferenceNode(
    original: ts.TypeReferenceNode,
    {
      typeName = original.typeName,
      typeArguments = original.typeArguments?.slice(),
    }: {
      typeName?: ts.EntityName;
      typeArguments?: Array<ts.TypeNode> | null;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateTypeReferenceNode(
        original,
        this.markOriginalNode(typeName),
        // TODO workaround for TS inconsistency, clean up:
        this.markOriginalOptionalNodeArray(typeArguments) as
          | ts.NodeArray<ts.TypeNode>
          | undefined
      ),
      original
    );
  }

  createYieldExpression({
    asteriskToken,
    expression,
  }: {
    asteriskToken?: ts.AsteriskToken | null;
    expression?: ts.Expression | null;
  }) {
    // needs custom code to distinguish between the factory for yield and for yield*:
    return this.markNewNode(
      asteriskToken != null
        ? ts.factory.createYieldExpression(
            asteriskToken,
            this.markOriginalOptionalNode(expression)!
          )
        : ts.factory.createYieldExpression(
            undefined,
            this.markOriginalOptionalNode(expression)
          )
    );
  }

  abstract createJsxFragment({
    openingFragment,
    children,
    closingFragment,
  }: {
    openingFragment: ts.JsxOpeningFragment;
    children: Array<ts.JsxChild>;
    closingFragment: ts.JsxClosingFragment;
  }): ts.JsxFragment;

  abstract createJsxOpeningFragment(): ts.JsxOpeningFragment;

  createJsxFragmentWithContent(content: Array<ts.JsxChild>) {
    return this.createJsxFragment({
      openingFragment: this.createJsxOpeningFragment(),
      children: content,
      closingFragment: this.createJsxClosingFragment(),
    });
  }

  updateYieldExpression(
    original: ts.YieldExpression,
    {
      asteriskToken = original.asteriskToken,
      expression = original.expression,
    }: {
      asteriskToken?: ts.AsteriskToken | null;
      expression?: ts.Expression | null;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateYieldExpression(
        original,
        asteriskToken ?? undefined,
        this.markOriginalOptionalNode(expression)
      ),
      original
    );
  }

  createTrue() {
    return this.markNewNode(ts.factory.createTrue());
  }

  createBlock({
    statements,
    isMultiLine,
    forceLeadingNewLine,
  }: {
    statements: Array<ts.Statement>;
    isMultiLine?: boolean | undefined;
    forceLeadingNewLine?: boolean | undefined;
  }) {
    const block = this.markNewNode(
      ts.factory.createBlock(
        this.markOriginalNodeArray(statements),
        isMultiLine
      )
    );

    if (forceLeadingNewLine === true) {
      this.forceLeadingNewLine(block);
    }

    return block;
  }

  forceLeadingNewLine(node: ts.Block | ts.VariableDeclaration) {
    this.forcedLeadingNewlines.add(node);
  }

  hasForcedNewLine(node: ts.Node): boolean {
    return this.forcedLeadingNewlines.has(node);
  }

  updateSourceFile(
    original: ts.SourceFile,
    {
      statements = original.statements.slice(),
    }: {
      statements: Array<ts.Statement> | undefined;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateSourceFile(
        original,
        this.markOriginalNodeArray(statements),
        original.isDeclarationFile,
        original.referencedFiles,
        original.typeReferenceDirectives,
        original.hasNoDefaultLib,
        original.libReferenceDirectives
      ),
      original
    );
  }

  updateBlock(
    original: ts.Block,
    {
      statements = original.statements.slice(),
    }: {
      statements: Array<ts.Statement> | undefined;
    }
  ) {
    return this.markModifiedNode(
      ts.factory.updateBlock(original, this.markOriginalNodeArray(statements)),
      original
    );
  }

  updateBlockLike(
    original: ts.BlockLike,
    {
      statements,
    }: {
      statements: Array<ts.Statement>;
    }
  ) {
    if (ts.isSourceFile(original)) {
      return this.asTransformedNodeTree().updateSourceFile(original, {
        statements,
      });
    } else if (ts.isBlock(original)) {
      return this.updateBlock(original, {
        statements,
      });
    } else if (ts.isModuleBlock(original)) {
      return this.asTransformedNodeTree().updateModuleBlock(original, {
        statements,
      });
    } else if (ts.isCaseClause(original)) {
      return this.asTransformedNodeTree().updateCaseClause(original, {
        expression: this.markOriginalNode(original.expression),
        statements,
      });
    } else if (ts.isDefaultClause(original)) {
      return this.asTransformedNodeTree().updateDefaultClause(original, {
        statements,
      });
    }

    throw "original is not a block, case clause, default clause, module block or sourcefile";
  }

  readonly triviaUpdates: Array<TriviaUpdate> = [];

  updateTrivia(update: TriviaUpdate) {
    this.triviaUpdates.push(update);
  }

  // TODO move into trivia move objects somehow
  updateTriviaWhenInsertingStatementAfter(
    before: ts.Statement,
    insertedStatement: ts.Statement
  ) {
    this.updateTrivia(new SuffixTriviaMove(before, insertedStatement));
    this.updateTrivia(
      new TrailingSeparatorTriviaMove(before, insertedStatement, true)
    );
  }

  toEdit(): Edit | undefined {
    this.updateNodeInformation();
    return new Reprinter(this.originalSource).createReplacementEdit(
      this.asTransformedNodeTree()
    );
  }

  asTransformedNodeTree(): TransformedNodeTree {
    return this as any as TransformedNodeTree;
  }

  getNodePath(node: ts.Node): NodePath {
    this.updateNodeInformation();

    // when a node from the original tree is passed in, try to use its modified node:
    const modifiedNode = this.getModifiedNodeForOriginal(node);
    if (modifiedNode != null) {
      node = modifiedNode;
    }

    const path: Array<string | number> = [];

    let nodeInformation = this.getNodeInformation(node);

    // path until the modification root
    while (
      nodeInformation != null &&
      nodeInformation.node !== this.modificationRoot
    ) {
      const { parent, parentProperty } = nodeInformation;

      if (parent === undefined || parentProperty === undefined) {
        break;
      }

      const parentPropertyValue = (parent as any)[parentProperty];

      if (Array.isArray(parentPropertyValue)) {
        path.push(parentPropertyValue.indexOf(nodeInformation.node));
      }
      path.push(parentProperty);

      nodeInformation = this.getNodeInformation(parent);
    }

    // add path from modification root to sourcefile root
    // (or from node if there is no modification root yet)
    let currentNode = this.getModificationRootOriginal() ?? node;
    while (currentNode.parent != null) {
      forEachChildWithAttribute(
        currentNode.parent,
        (child, attribute, index) => {
          if (child === currentNode) {
            if (index != null) {
              path.push(index);
            }
            path.push(attribute);
          }
        }
      );

      currentNode = currentNode.parent;
    }

    return path.reverse();
  }

  /**
   * Checks if a node was created by TypeScript automatically. This happens e.g. for
   * ParenthesizedExpressions that are created using the rules from
   * `parenthesizerRules.ts` in TypeScript.
   */
  isNodeSynthesizedByTypeScript(node: ts.Node) {
    return (
      Flags.isSet(node.flags, ts.NodeFlags.Synthesized) &&
      this.getNodeTransformationInfo(node).state == null
    );
  }
}

// TODO extract
function createReplacementMap(...replacements: Array<Replacement>) {
  const replacementMap = new Map<ts.Node, ts.Node | null>();
  for (const replacement of replacements) {
    replacementMap.set(replacement.originalNode, replacement.replacementNode);
  }
  return replacementMap;
}
