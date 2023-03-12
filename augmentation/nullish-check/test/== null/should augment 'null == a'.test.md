
## Input
```javascript input
null == a;
```

## Expected Augmentation
```json expected augmentations
{
  "0-9-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "EQ_EQ_NULL"
    }
  }
}
```
