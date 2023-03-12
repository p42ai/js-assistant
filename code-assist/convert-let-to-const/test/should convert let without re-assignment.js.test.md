
## Input
```javascript input
let a = "123";
f(a);
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
  "0-13-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert 'let' to 'const'.",
      "highlightRanges": ["0-3"]
    },
    "actionZones": [
      {
        "range": "0-3",
        "label": "Convert to const",
        "level": "suggestion"
      },
      {
        "range": "0-13",
        "label": "Convert to const",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const a = "123";
f(a);
```
