
## Input
```javascript input
if (conditionA) {
    doSomethingA();
} else if (conditionB) {
    doSomethingB();
} else if (conditionC) {
    doSomethingC();
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
  "0-129-IfStatement": {
    "applicationResult": "applied",
    "actionZones": [
      {
        "range": "49-59",
        "label": "Move if-else branch up",
        "level": "regular",
        "kind": "refactor.move.up.if-else-if-branches.p42"
      }
    ],
    "blockedZones": []
  },
  "44-129-IfStatement": {
    "applicationResult": "rejected/conflict",
    "actionZones": [
      {
        "range": "49-59",
        "label": "Move if-else branch down",
        "level": "regular",
        "kind": "refactor.move.down.if-else-if-branches.p42"
      }
    ],
    "blockedZones": []
  }
}
```

## Expected Output
```javascript expected output
if (conditionB) {
    doSomethingB();
} else if (conditionA) {
    doSomethingA();
} else if (conditionC) {
    doSomethingC();
}
```
