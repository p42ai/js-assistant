
## Input
```javascript input
f(1) === null || f(1) === undefined;
```

## Expected Augmentation
```json expected augmentations
{
  "0-35-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "EQ_EQ_EQ_NULL_OR_UNDEFINED",
      "checkedExpression": "16-21-CallExpression"
    }
  }
}
```
