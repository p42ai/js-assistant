
## Input
```javascript input
function f() {
    if (a) {
        f0();
        return f1();
    } else {
        f0();
        return f2();
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
        f0();
        return f1();
    }
    f0();
    return f2();
}
```
