
## Input
```javascript input
for (const element of elements) {
  console.log(element);
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-59-ForOfStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "21-30-Identifier",
      "elementBinding": {
        "type": "Binding",
        "scope": "0-59-ForOfStatement",
        "name": "element"
      }
    },
    "data": {
      "type": "for-of"
    }
  }
}
```
