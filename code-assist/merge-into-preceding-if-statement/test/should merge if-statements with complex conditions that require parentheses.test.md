
## Input
```javascript input
for (const value of values) {
  if (conditionA ? false : true) {
    doSomething();
    break;
  }

  if (conditionB ? false : true) {
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
  if ((conditionA ? false : true) || (conditionB ? false : true)) {
    doSomething();
    break;
  }

  doSomethingElse();
}
```
