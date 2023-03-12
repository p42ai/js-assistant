
## Input
```javascript input
const f = function() {
  const a = b + c;
  console.log("x");
};
```

## Expected Augmentation
```json expected augmentations
{
  "9-63-FunctionExpression": {
    "match": false
  }
}
```
