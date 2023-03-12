
## Input
```javascript input
a === undefined || a === null;
```

## Expected Augmentation
```json expected augmentations
{
  "0-29-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "EQ_EQ_EQ_NULL_OR_UNDEFINED"
    }
  }
}
```
