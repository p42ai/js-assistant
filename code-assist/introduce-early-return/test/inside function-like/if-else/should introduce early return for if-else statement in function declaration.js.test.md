
## Input
```javascript input
function f() {
    if (a) {
        doSomething();
    } else {
        doSomethingElse();
    }
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
function f() {
    if (a) {
        doSomething();
        return;
    }
    doSomethingElse();
}
```
