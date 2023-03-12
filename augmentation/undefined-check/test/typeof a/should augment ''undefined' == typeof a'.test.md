
## Input
```javascript input
'undefined' == typeof a;
```

## Expected Augmentation
```json expected augmentations
{
  "0-23-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "TYPEOF_EQ_EQ_UNDEFINED"
    }
  }
}
```