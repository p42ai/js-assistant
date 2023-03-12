
## Input
```javascript input
[1, 2];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "1-1"
}
```

## Expected Matches
```json expected matches
{
  "0-6-ArrayLiteralExpression": {
    "actionZones": [
      {
        "range": "1-2",
        "label": "Move array element down",
        "level": "regular",
        "kind": "refactor.move.down.array-element.p42"
      }
    ],
    "safety": {
      "level": "WARNING",
      "message": "changes array content"
    }
  }
}
```

## Expected Output
```javascript expected output
[2, 1];
```
