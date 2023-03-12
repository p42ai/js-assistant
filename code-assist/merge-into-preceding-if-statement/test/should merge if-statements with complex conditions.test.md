
## Input
```javascript input
for (const value of values) {
  if (conditionA1 && conditionA2) {
    doSomething();
    break;
  }

  if (conditionB1 && conditionB2) {
    doSomething();
    break;
  }

  doSomethingElse();
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
for (const value of values) {
  if (conditionA1 && conditionA2 || conditionB1 && conditionB2) {
    doSomething();
    break;
  }

  doSomethingElse();
}
```
