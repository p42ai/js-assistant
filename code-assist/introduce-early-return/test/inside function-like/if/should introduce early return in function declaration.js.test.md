
## Input
```javascript input
function f() {
    if (a) {
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
    if (!a) {
        return;
    }
    doSomething();
}
```
