
## Input
```javascript input
{
  first();
  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "4-4",
  "transformationId": "down"
}
```

## Expected Matches
```json expected matches
{
  "0-26-Block": {
    "actionZones": [
      {
        "range": "4-12",
        "label": "Move statement down",
        "level": "regular",
        "kind": "refactor.move.down.statement.p42"
      }
    ],
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["16-16"]
      },
      {
        "type": "HIGHLIGHT",
        "highlights": ["16-24"]
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
{
  second();
  first();
}
```
