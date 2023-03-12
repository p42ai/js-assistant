
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
  "selection": "49-49",
  "transformedNodeId": "44-129-IfStatement"
}
```

## Expected Output
```javascript expected output
if (conditionA) {
    doSomethingA();
} else if (conditionC) {
    doSomethingC();
} else if (conditionB) {
    doSomethingB();
}
```
