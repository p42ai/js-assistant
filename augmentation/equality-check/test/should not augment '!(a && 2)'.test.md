
## Input
```javascript input
!(a && 2);
```

## Expected Augmentation
```json expected augmentations
{
  "0-9-PrefixUnaryExpression": {
    "match": false
  }
}
```