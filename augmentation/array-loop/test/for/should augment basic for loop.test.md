
## Input
```javascript input
for (let i = 0; i < elements.length; i++) {
  const element = elements[i];
  console.log(element);
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-100-ForStatement": {
    "match": true,
    "captures": {
      "arrayExpression": "19-28-Identifier",
      "elementBinding": {
        "type": "Binding",
        "scope": "41-100-Block",
        "name": "element"
      }
    },
    "data": {
      "type": "for-element"
    }
  }
}
```
