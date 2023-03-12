
## Input
```javascript input
{
  // some
  // comments
  first();
  second();
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "28-28"
}
```

## Expected Matches
```json expected matches
{
  "0-50-Block": {
    "actionZones": [
      {
        "range": "28-36",
        "label": "Move statement down",
        "level": "regular",
        "kind": "refactor.move.down.statement.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
{
  second();
  // some
  // comments
  first();
}
```
