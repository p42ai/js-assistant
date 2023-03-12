
## Input
```javascript input
switch (condition) {
  default:
    doSomething();
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
  "0-52-SwitchStatement": {
    "actionZones": [
      {
        "range": "0-52",
        "label": "Simplify switch statement",
        "kind": "refactor.cleanup.simplify-switch.p42",
        "level": "suggestion"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
doSomething();
```
