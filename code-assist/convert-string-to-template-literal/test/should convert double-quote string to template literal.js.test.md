
## Input
```javascript input
let s = "a";
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
  "7-11-StringLiteral": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": null,
    "actionZones": [
      {
        "range": "8-11",
        "label": "Convert to template literal",
        "level": "preferredQuickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
let s = `a`;
```
