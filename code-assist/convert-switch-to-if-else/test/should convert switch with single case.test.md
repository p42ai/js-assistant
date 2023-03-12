
## Input
```javascript input
switch (aVariable) {
  case "1":
    doSomething1();
    break;
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
  "0-65-SwitchStatement": {
    "actionZones": [
      {
        "range": "0-19",
        "label": "Convert to if-else",
        "kind": "refactor.rewrite.convert-switch-to-if-else.p42",
        "level": "suggestion"
      },
      {
        "range": "0-65",
        "label": "Convert to if-else",
        "kind": "refactor.rewrite.convert-switch-to-if-else.p42",
        "level": "regular"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (aVariable === "1") {
  doSomething1();
}
```
