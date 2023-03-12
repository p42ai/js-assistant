
## Input
```javascript input
[1, 2];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "4-4"
}
```

## Expected Matches
```json expected matches
{
  "0-6-ArrayLiteralExpression": {
    "actionZones": [
      {
        "range": "4-5",
        "label": "Move array element up",
        "level": "regular",
        "kind": "refactor.move.up.array-element.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
[2, 1];
```
