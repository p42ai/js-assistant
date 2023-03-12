
## Input
```javascript input
a -= 1;
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
  "0-6-BinaryExpression": {
    "actionZones": [
      {
        "range": "0-6",
        "label": "Convert to --",
        "level": "suggestion"
      }
    ],
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert an assignment into a decrement expression."
    }
  }
}
```

## Expected Output
```javascript expected output
a--;
```
