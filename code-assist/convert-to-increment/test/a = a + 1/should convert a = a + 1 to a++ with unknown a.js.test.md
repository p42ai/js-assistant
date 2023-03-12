
## Input
```javascript input
a = a + 1;
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
  "0-9-BinaryExpression": {
    "actionZones": [
      {
        "range": "0-9",
        "label": "Convert to ++",
        "level": "quickFix"
      }
    ],
    "safety": {
      "level": "WARNING",
      "message": "might not be numeric"
    },
    "suggestion": null
  }
}
```

## Expected Output
```javascript expected output
a++;
```
