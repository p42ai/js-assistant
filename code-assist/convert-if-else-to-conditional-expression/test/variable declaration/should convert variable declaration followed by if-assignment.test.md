
## Input
```javascript input
let a = 0;
if (condition) {
  a = 1;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Matches
```json expected matches
{
  "10-38-IfStatement": {
    "actionZones": [
      {
        "range": "11-38",
        "label": "Convert to conditional expression",
        "kind": "refactor.rewrite.if-else-to-conditional-expression.p42",
        "level": "suggestion"
      },
      {
        "range": "0-10",
        "label": "Convert to conditional expression",
        "kind": "refactor.rewrite.if-else-to-conditional-expression.p42",
        "level": "suggestion"
      }
    ],
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
let a = condition ? 1 : 0;
```
