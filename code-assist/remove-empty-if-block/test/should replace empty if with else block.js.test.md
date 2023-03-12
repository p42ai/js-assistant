
## Input
```javascript input
if (x) {
} else {
  g();
}
f();
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
  "0-26-IfStatement": {
    "suggestion": {
      "description": "You can invert if statement and remove the empty block.",
      "highlightRanges": ["0-10"]
    },
    "actionZones": [
      {
        "range": "7-8",
        "label": "Invert if and remove empty block",
        "level": "suggestion"
      },
      {
        "range": "7-10",
        "label": "Invert if and remove empty block",
        "level": "quickFix"
      },
      {
        "range": "0-2",
        "label": "Invert if and remove empty block",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (!x) {
  g();
}
f();
```
