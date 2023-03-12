
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
  "selection": "51-53"
}
```

## Expected Matches
```json expected matches
{
  "0-84-IfStatement": {
    "postEditActions": [
      {
        "type": "SELECT",
        "selections": ["6-8"]
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
