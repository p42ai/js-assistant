
## Input
```javascript input
if (x) {
    f();
} else {
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
  "0-28-IfStatement": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can remove the empty else block.",
      "highlightRanges": ["20-28"]
    },
    "actionZones": [
      {
        "range": "25-26",
        "label": "Remove else",
        "level": "suggestion"
      },
      {
        "range": "25-28",
        "label": "Remove else",
        "level": "quickFix"
      },
      {
        "range": "0-2",
        "label": "Remove else",
        "level": "quickFix"
      },
      {
        "range": "20-24",
        "label": "Remove else",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (x) {
    f();
}
```
