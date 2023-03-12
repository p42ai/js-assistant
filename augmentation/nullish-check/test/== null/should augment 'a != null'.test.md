
## Input
```javascript input
a != null;
```

## Expected Augmentation
```json expected augmentations
{
  "0-9-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": true,
      "checkType": "EQ_EQ_NULL"
    }
  }
}
```
