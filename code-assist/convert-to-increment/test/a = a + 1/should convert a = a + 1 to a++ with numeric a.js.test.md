
## Input
```javascript input
let a = 3;
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
  "10-20-BinaryExpression": {
    "actionZones": [
      {
        "range": "11-20",
        "label": "Convert to ++",
        "level": "suggestion"
      }
    ],
    "safety": {
      "level": "SAFE"
    },
    "suggestion": {
      "description": "You can convert an assignment into a increment expression."
    }
  }
}
```

## Expected Output
```javascript expected output
let a = 3;
a++;
```
