
## Input
```javascript input
if (a == 2) {
  if (b == 3) {
    f(a, b);
  }
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
  "0-48-IfStatement": {
    "suggestion": {
      "description": "You can merge the nested 'if' condition into the outer 'if' condition using the '&&' operator.",
      "highlightRanges": ["0-11", "16-27"]
    },
    "actionZones": [
      {
        "range": "16-18",
        "label": "Merge nested if",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (a == 2 && b == 3) {
  f(a, b);
}
```
