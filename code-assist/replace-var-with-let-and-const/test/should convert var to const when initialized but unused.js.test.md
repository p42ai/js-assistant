
## Input
```javascript input
var shouldBeConst = 0;
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
  "0-21-VariableDeclarationList": {
    "safety": {
      "level": "WARNING",
      "message": "could remove global variable"
    },
    "suggestion": {
      "description": "You can replace a 'var' declaration with 'let'/'const' declaration(s).",
      "highlightRanges": ["0-3"]
    },
    "actionZones": [
      {
        "range": "0-3",
        "label": "Convert to let and const",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const shouldBeConst = 0;
```
