
## Input
```javascript input
function f() {
    f0();
    if (a) {
        f1();
    } else {
        f2();
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
    f0();
    if (a) {
        f1();
        return;
    }
    f2();
}
```
