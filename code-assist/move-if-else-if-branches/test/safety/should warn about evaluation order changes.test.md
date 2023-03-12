
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
    "suggestion": null,
    "safety": {
      "level": "WARNING",
      "message": "changes condition evaluation order"
    }
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
