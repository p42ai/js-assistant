# Remove unnecessary undefined in parameter type
Cleanup

```typescript
function f(aParameter?: string | undefined) { }
```

becomes

```typescript
function f(aParameter?: string) { }
```

# Combine similar switch case blocks
```javascript
    switch (loopType) {
      case "for-element": {
        zones = [
          {
            range: arrayLoop.getLoopHeadRange(),
            level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
          },
        ];
        break;
      }
      case "for-each": {
        zones = [
          {
            range: arrayLoop.getLoopHeadRange(),
            level: CodeAssistLevel.getSuggestionOrQuickFix(isSuggestion),
          },
        ];
        break;
      }
      default:
        throw new Error(`unsupported array loop type ${loopType}`);
    }
```

# Semantic delete
With separate shortcut (with context menu)
* Delete case block
* Delete method
* Delete statement

# Cleanup empty switch (only default or fully empty)
```javascript

  switch (categoryId) {
    default: {
      const categories = await loadCodeAssistCategories();
      const category = categories.find(
        (category) => category.id === categoryId
      );

      if (category == null) {
        throw new Error(`no category with id ${categoryId} found`);
      }

      const categoryCodeAssists = Object.values(codeAssists).filter(
        (codeAssist) =>
          codeAssist.documentation.categories.includes(category.id as any)
      );

      return {
        props: {
          id: category.id,
          title: `${Object.keys(categoryCodeAssists).length ?? ""} ${
            category.title
          }`,
          description: category.description ?? "",
          codeAssists: categoryCodeAssists,
        },
      };
    }
  }
```

# Inline upwards
Idea: `tree.replace` should happen inside if-statement branches. Somewhat similar to inline return. Requires dataflow analysis.

```javascript
let replacementElement:
    | ts.BindingElement
    | ts.VariableDeclaration
    | ts.ParameterDeclaration;

if (ts.isBindingElement(declarationParent)) {
    // TODO renamed binding element
    if (declarationParent.propertyName == null) {
    replacementElement = tree.updateBindingElement(declarationParent, {
        propertyName: declarationParent.name as ts.Identifier,
        name: node.name,
    });
    } else {
    throw new Error(
        `unsupported target type: ${getSyntaxKindLabel(
        declarationParent.kind
        )}`
    );
    }
} else if (ts.isVariableDeclaration(declarationParent)) {
    replacementElement = tree.updateVariableDeclaration(declarationParent, {
    name: node.name,
    type: node.type,
    });
} else if (ts.isParameter(declarationParent)) {
    replacementElement = tree.updateParameterDeclaration(declarationParent, {
    name: node.name,
    type: node.type,
    });
} else {
    throw new Error(
    `unsupported target type: ${getSyntaxKindLabel(declarationParent.kind)}`
    );
}

tree.replace(declarationParent, replacementElement);
```

Potential flow: push statement into if-else, then inline somehow.
* needs reverse of move-first/last-statement out of if-else

# Remove comment
Remove a comment
- would require comment parsing and making comments available as a special kind of element

# Replace .some() with .every() and vice versa
`array.some(() => x)` <=> `!array.every(() => !x)`

# Simplify ternary
```javascript
get isSafelyInlineableThisReference(): boolean {
  return ThisExpression.isThisExpression(this.captures.expression)
    ? this.hasSingleThisScope
    : false;
}
```
==>
```javascript
get isSafelyInlineableThisReference(): boolean {
  return ThisExpression.isThisExpression(this.captures.expression)
    && this.hasSingleThisScope;
}
```

# Pull out common ternary
```javascript
return {
      description: match.data.isSingleStatementIfElse
        ? `You can remove the redundant if-else statement and replace it with its content.`
        : `You can move the duplicated last statement below the if-else statement.`,
      highlightRanges: match.data.isSingleStatementIfElse
        ? [NodeRange.node(match.node)]
        : [
            NodeRange.node(match.captures.thenOccurrence),
            NodeRange.node(match.captures.elseOccurrence),
          ],
};
```
==>
```javascript
return match.data.isSingleStatementIfElse
    ? {
        description: `You can remove the redundant if-else statement and replace it with its content.`,
        highlightRanges: [NodeRange.node(match.node)],
    }
    : {
        description: `You can move the duplicated last statement below the if-else statement.`,
        highlightRanges: [
            NodeRange.node(match.captures.thenOccurrence),
            NodeRange.node(match.captures.elseOccurrence),
        ],
    };
```