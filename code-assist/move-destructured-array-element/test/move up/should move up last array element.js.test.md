
## Input
```javascript input
const [
  // comment
  a,
  b
] = [1, 2];
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-28",
  "transformationId": "up"
}
```

## Expected Matches
```json expected matches
{
  "5-31-ArrayBindingPattern": {
    "actionZones": [
      {
        "range": "28-29",
        "label": "Move array element up",
        "level": "regular",
        "kind": "refactor.move.up.destructured-array-element.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
const [
  b,
  // comment
  a
] = [1, 2];
```
