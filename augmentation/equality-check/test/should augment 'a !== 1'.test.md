
## Input
```javascript input
a !== 1;
```

## Expected Augmentation
```json expected augmentations
{
  "0-7-BinaryExpression": {
    "match": true,
    "captures": {
      "isStrict": true,
      "isNegated": true
    }
  }
}
```