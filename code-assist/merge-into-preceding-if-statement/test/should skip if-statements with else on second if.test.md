
## Input
```javascript input
function f() {
  if (conditionA) {
    doSomething();
    return;
  }

  if (conditionB) {
    doSomething();
    return;
  } else {
    doSomethingElse();
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