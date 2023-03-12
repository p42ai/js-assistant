
## Input
```javascript input
if (x) {
  a = '1';
} else {
  a = '2';
}
```

## Expected Augmentation
```json expected augmentations
{
  "0-41-IfStatement": {
    "match": true,
    "captures": {
      "type": "IF_ELSE_STATEMENT",
      "variableName": "a",
      "condition": "4-5-Identifier",
      "whenTrue": "14-18-StringLiteral",
      "whenFalse": "34-38-StringLiteral"
    }
  }
}
```
