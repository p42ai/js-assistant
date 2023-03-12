
## Input
```javascript input
switch (condition) {
}
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
  "0-22-SwitchStatement": {
    "actionZones": [
      {
        "range": "0-22",
        "label": "Remove switch statement",
        "kind": "refactor.cleanup.simplify-switch.p42",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
```
