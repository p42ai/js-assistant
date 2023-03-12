
## Input
```javascript input
undefined == a;
```

## Expected Augmentation
```json expected augmentations
{
  "0-14-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "EQ_EQ_UNDEFINED"
    }
  }
}
```
