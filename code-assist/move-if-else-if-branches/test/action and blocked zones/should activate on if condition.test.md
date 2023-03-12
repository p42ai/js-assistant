
## Input
```javascript input
if (conditionA) {
    doSomethingA();
} else if (conditionB) {
    doSomethingB();
}
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
  "0-84-IfStatement": {
    "actionZones": [
      {
        "range": "4-14",
        "label": "Move if-else branch down",
        "level": "regular",
        "kind": "refactor.move.down.if-else-if-branches.p42"
      }
    ],
    "blockedZones": [
      {
        "range": "4-14",
        "kind": "refactor.move.up.if-else-if-branches.p42"
      }
    ]
  }
}
```

## Expected Output
```javascript expected output
if (conditionB) {
    doSomethingB();
} else if (conditionA) {
    doSomethingA();
}
```
