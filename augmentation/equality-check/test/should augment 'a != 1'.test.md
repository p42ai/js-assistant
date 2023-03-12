
## Input
```javascript input
a != 1;
```

## Expected Augmentation
```json expected augmentations
{
  "0-6-BinaryExpression": {
    "match": true,
    "captures": {
      "isStrict": false,
      "isNegated": true
    }
  }
}
```