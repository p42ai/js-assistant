
## Input
```javascript input
f(1) == null;
```

## Expected Augmentation
```json expected augmentations
{
  "0-12-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "EQ_EQ_NULL",
      "checkedExpression": "0-4-CallExpression"
    }
  }
}
```
