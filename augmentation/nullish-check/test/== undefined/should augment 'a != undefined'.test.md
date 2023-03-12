
## Input
```javascript input
a != undefined;
```

## Expected Augmentation
```json expected augmentations
{
  "0-14-BinaryExpression": {
    "match": true,
    "captures": {
      "isNegated": true,
      "checkType": "EQ_EQ_UNDEFINED"
    }
  }
}
```
