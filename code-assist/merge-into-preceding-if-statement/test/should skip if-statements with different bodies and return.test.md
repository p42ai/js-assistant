
## Input
```javascript input
function f() {
  if (conditionA) {
    doSomethingA();
    return;
  }

  if (conditionB) {
    doSomethingB();
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