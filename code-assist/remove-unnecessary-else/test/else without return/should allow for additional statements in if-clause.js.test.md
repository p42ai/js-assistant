
## Input
```javascript input
function f() {
    f1();
    f2();
    if (a) {
        g1();
        g2();
        return fx();
    } else {
        f3();
        f4();
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
    if (a) {
        g1();
        g2();
        return fx();
    }
    f3();
    f4();
    return f5();
}
```
