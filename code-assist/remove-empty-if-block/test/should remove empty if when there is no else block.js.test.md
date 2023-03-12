
## Input
```javascript input
const x = value;
if (x) {
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
  "16-27-IfStatement": {
    "suggestion": {
      "description": "You can remove the empty if statement.",
      "highlightRanges": ["17-27"]
    },
    "actionZones": [
      {
        "range": "24-25",
        "label": "Remove if",
        "level": "suggestion"
      },
      {
        "range": "24-27",
        "label": "Remove if",
        "level": "quickFix"
      },
      {
        "range": "17-19",
        "label": "Remove if",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const x = value;
f();
```
