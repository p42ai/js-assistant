
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
  "selection": "49-49"
}
```

## Expected Matches
```json expected matches
{
  "0-84-IfStatement": {
    "actionZones": [
      {
        "range": "49-59",
        "label": "Move if-else branch up",
        "level": "regular",
        "kind": "refactor.move.up.if-else-if-branches.p42"
      }
    ],
    "blockedZones": [
      {
        "range": "49-59",
        "kind": "refactor.move.down.if-else-if-branches.p42"
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
