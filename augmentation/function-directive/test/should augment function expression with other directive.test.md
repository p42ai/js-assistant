
## Input
```javascript input
const f = function() {
  "use something else";
  console.log("test");
};
```

## Expected Augmentation
```json expected augmentations
{
  "9-71-FunctionExpression": {
    "match": true,
    "captures": {
      "directive": "22-45-StringLiteral"
    }
  }
}
```
