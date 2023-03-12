
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
      "isStrict": false,
      "isNegated": false
    }
  }
}
```