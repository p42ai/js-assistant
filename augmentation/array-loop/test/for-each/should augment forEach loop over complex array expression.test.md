
## Input
```javascript input
anObject.method().forEach(function(element) {
  console.log(element);
});
```

## Expected Augmentation
```json expected augmentations
{
  "0-73-ExpressionStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "0-17-CallExpression",
      "elementBinding": {
        "type": "Binding",
        "scope": "26-71-FunctionExpression",
        "name": "element"
      },
      "body": "43-71-Block"
    },
    "data": {
      "type": "for-each"
    }
  }
}
```
