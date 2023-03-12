
## Input
```javascript input
typeof(a) === 'undefined';
```

## Expected Augmentation
```json expected augmentations
{
  "0-25-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": false,
      "checkType": "TYPEOF_EQ_EQ_EQ_UNDEFINED"
    }
  }
}
```