
## Input
```javascript input
function f() {
    if (a) f1();
    else {
        f3();
        f4();
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
        f1();
        return;
    }
    f3();
    f4();
}
```
