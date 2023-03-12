
## Input
```javascript input
const c = x['a'];
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
  "9-16-ElementAccessExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert the property access ['a'] to the dot notation.",
      "highlightRanges": ["11-16"]
    },
    "actionZones": [
      {
        "range": "11-12",
        "label": "Convert to dot notation",
        "level": "suggestion"
      },
      {
        "range": "10-16",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const c = x.a;
```
