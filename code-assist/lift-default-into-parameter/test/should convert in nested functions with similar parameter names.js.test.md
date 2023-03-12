
## Input
```javascript input
function f1(a) {
    function f2(a) {
        a = a || 3;
    }
    a = a || 2;
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
function f1(a = 2) {
    function f2(a = 3) {
    }
}
```
