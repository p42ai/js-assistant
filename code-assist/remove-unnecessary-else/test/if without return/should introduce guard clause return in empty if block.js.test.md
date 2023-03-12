
## Input
```javascript input
function f() {
    if (a) {
    } else {
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
        return;
    }
    f3();
    f4();
}
```
