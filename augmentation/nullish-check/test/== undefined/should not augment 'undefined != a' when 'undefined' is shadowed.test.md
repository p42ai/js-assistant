
## Input
```javascript input
let undefined = {};
undefined != a;
```

## Expected Augmentation
```json expected augmentations
{
  "19-34-BinaryExpression": {
    "match": false
  }
}
```
