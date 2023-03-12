
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
  "selection": "6-8"
}
```

## Expected Matches
```json expected matches
{
  "0-84-IfStatement": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["51-53"]
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
