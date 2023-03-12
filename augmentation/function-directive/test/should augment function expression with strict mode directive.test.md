
## Input
```javascript input
const f = function() {
  "use strict";
  return 1;
};
```

## Expected Augmentation
```json expected augmentations
{
  "9-52-FunctionExpression": {
    "match": true,
    "captures": {
      "directive": "22-37-StringLiteral"
    }
  }
}
```
