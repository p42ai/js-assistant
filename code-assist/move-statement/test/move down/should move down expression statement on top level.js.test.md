
## Input
```javascript input
first();
second();
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
  "0-18-SourceFile": {
    "actionZones": [
      {
        "range": "0-8",
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
second();
first();
```
