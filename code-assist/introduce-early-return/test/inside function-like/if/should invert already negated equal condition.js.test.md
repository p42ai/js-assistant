
## Input
```javascript input
function f() {
    if (a !== b) {
        doSomething();
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
    if (a === b) {
        return;
    }
    doSomething();
}
```
