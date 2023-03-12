
## Input
```javascript input
elements.forEach((element) => {
  console.log(element);
});
```

## Expected Augmentation
```json expected augmentations
{
  "0-59-ExpressionStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "0-8-Identifier",
      "elementBinding": {
        "type": "Binding",
        "scope": "17-57-ArrowFunction",
        "name": "element"
      },
      "body": "29-57-Block"
    },
    "data": {
      "type": "for-each"
    }
  }
}
```
