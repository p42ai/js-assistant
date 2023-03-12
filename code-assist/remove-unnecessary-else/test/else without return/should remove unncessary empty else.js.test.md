
## Input
```javascript input
function f() {
    f1();
    f2();
    if (a) return fx();
    else {
    }
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
    if (a) return fx();
    return f5();
}
```
