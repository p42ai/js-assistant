
## Input
```javascript input
function f() {
    f1();
    f2();
    if (a) {
        return fx();
    } else f3();
    return f5();
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
    f1();
    f2();
    if (a) {
        return fx();
    }
    f3();
    return f5();
}
```
