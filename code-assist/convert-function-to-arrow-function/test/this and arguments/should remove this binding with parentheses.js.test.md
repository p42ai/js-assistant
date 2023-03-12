
## Input
```javascript input
const f = (function () {}).bind(this);
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
  "9-37-CallExpression": {
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
const f = () => {};
```
