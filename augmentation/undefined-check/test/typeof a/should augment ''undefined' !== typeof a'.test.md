
## Input
```javascript input
'undefined' !== typeof a;
```

## Expected Augmentation
```json expected augmentations
{
  "0-24-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": true,
      "checkType": "TYPEOF_EQ_EQ_EQ_UNDEFINED"
    }
  }
}
```