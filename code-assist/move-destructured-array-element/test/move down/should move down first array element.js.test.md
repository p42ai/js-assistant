
## Input
```javascript input
const [a, b] = [1, 2];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "7-7",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "5-12-ArrayBindingPattern": {
    "actionZones": [
      {
        "range": "7-8",
        "label": "Move array element down",
        "level": "regular",
        "kind": "refactor.move.down.destructured-array-element.p42"
      }
    ],
    "safety": {
      "level": "WARNING",
      "message": "changes assigned values"
    },
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["10-10"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const [b, a] = [1, 2];
```
