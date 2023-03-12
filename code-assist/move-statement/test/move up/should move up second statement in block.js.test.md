
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
  "selection": "15-15"
}
```

## Expected Matches
```json expected matches
{
  "0-26-Block": {
    "actionZones": [
      {
        "range": "15-24",
        "label": "Move statement up",
        "level": "regular",
        "kind": "refactor.move.up.statement.p42"
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
