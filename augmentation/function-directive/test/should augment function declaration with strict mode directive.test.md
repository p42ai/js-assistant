
## Input
```javascript input
function a() {
  "use strict";
  return 1;
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-44-FunctionDeclaration": {
    "match": true,
    "captures": {
      "directive": "14-29-StringLiteral"
    }
  }
}
```
