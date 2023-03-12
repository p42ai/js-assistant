
## Input
```javascript input
const a = value;
if (a) {
    console.log("1");
} else if (!a) {
    console.log("2");
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
  "16-88-IfStatement": {
    "suggestion": {
      "description": "You can remove the redundant else-if condition.",
      "highlightRanges": ["55-62"]
    },
    "actionZones": [
      {
        "range": "55-57",
        "label": "Remove redundant condition",
        "level": "suggestion"
      },
      {
        "range": "55-88",
        "label": "Remove redundant condition",
        "level": "quickFix"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const a = value;
if (a) {
    console.log("1");
} else {
    console.log("2");
}
```
