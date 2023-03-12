
## Input
```javascript input
void 0;
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
  "0-6-VoidExpression": {
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can replace 'void 0' with 'undefined'.",
      "highlightRanges": ["0-6"]
    },
    "actionZones": [
      {
        "range": "0-6",
        "label": "Replace with undefined",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
undefined;
```
