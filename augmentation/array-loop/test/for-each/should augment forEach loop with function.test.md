
## Input
```javascript input
elements.forEach(function(element) {
  console.log(element);
});
```

## Expected Augmentation
```json expected augmentations
{
  "0-64-ExpressionStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "0-8-Identifier",
      "elementBinding": {
        "type": "Binding",
        "scope": "17-62-FunctionExpression",
        "name": "element"
      },
      "body": "34-62-Block"
    },
    "data": {
      "type": "for-each"
    }
  }
}
```
