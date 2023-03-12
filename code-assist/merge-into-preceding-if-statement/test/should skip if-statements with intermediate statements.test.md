
## Input
```javascript input
function f() {
  if (conditionA) {
    doSomething();
    return;
  }

  doSomething();

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