
## Input
```javascript input
undefined !== a;
```

## Expected Augmentation
```json expected augmentations
{
  "0-15-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": true,
      "checkType": "EQ_EQ_EQ_UNDEFINED"
    }
  }
}
```