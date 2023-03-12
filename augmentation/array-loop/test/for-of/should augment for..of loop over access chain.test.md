
## Input
```javascript input
for (const element of anObject.aSubObject.elements) {
  console.log(element);
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-79-ForOfStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "21-50-PropertyAccessExpression",
      "elementBinding": {
        "type": "Binding",
        "scope": "0-79-ForOfStatement",
        "name": "element"
      }
    },
    "data": {
      "type": "for-of"
    }
  }
}
```
