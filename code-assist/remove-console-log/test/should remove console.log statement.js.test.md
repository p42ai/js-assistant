
## Input
```javascript input
f();
console.log("hello");
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
  "4-26-ExpressionStatement": {
    "safety": {
      "level": "UNKNOWN"
    },
    "suggestion": {
      "description": "You can remove the console.log statement.",
      "highlightRanges": ["5-16"]
    },
    "actionZones": [
      {
        "range": "5-16",
        "label": "Remove console.log"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
f();
```
