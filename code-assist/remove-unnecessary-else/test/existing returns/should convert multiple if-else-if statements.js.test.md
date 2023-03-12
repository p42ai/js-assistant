
## Input
```javascript input
function f() {
    if (a) {
        return f1();
    } else if (b) {
        return f2();
    }
    if (c) {
        return f3();
    } else if (d) {
        return f4();
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
        return f1();
    }
    if (b) {
        return f2();
    }
    if (c) {
        return f3();
    }
    if (d) {
        return f4();
    }
}
```
