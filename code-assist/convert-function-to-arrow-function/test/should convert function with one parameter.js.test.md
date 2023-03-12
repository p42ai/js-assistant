
## Input
```javascript input
const f = function (x) { return x * 2; };
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
  "9-40-FunctionExpression": {
    "safety": {
      "level": "UNKNOWN"
    },
    "actionZones": [
      {
        "label": "Convert to arrow function"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const f = (x) => x * 2;
```
