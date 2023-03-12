
## Input
```javascript input
b = x ? 1 : 2;
```

## Expected Augmentation
```json expected augmentations
{
  "0-13-BinaryExpression": {
    "match": true,
    "captures": {
      "type": "CONDITIONAL_EXPRESSION",
      "variableName": "b",
      "condition": "3-5-Identifier",
      "whenTrue": "7-9-NumericLiteral",
      "whenFalse": "11-13-NumericLiteral"
    }
  }
}
```
