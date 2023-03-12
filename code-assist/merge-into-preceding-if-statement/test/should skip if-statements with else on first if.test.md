
## Input
```javascript input
function f() {
  if (conditionA) {
    doSomething();
    return;
  } else {
    doSomethingElse();
  }

  if (conditionB) {
    doSomething();
    return;
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