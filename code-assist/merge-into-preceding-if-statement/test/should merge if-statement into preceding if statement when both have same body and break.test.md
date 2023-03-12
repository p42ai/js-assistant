
## Input
```javascript input
for (const value of values) {
  if (conditionA) {
    doSomething();
    break;
  }

  if (conditionB) {
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
  if (conditionA || conditionB) {
    doSomething();
    break;
  }

  doSomethingElse();
}
```
