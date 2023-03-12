
## Input
```javascript input
const a = value;
if (a) {
    console.log("1");
} else if (!a) {
    console.log("2");
} else {
    console.log("3"); // can never be invoked
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
  "16-143-IfStatement": {
    "suggestion": {
        "description": "You can remove the redundant else-if condition and the unreachable else.",
        "highlightRanges": ["55-62", "89-143"]
    },
    "actionZones": [
      {
        "range": "89-93",
        "label": "Remove redundant condition and unreachable else",
        "level": "suggestion"
      },
      {
        "range": "55-143",
        "label": "Remove redundant condition and unreachable else",
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
