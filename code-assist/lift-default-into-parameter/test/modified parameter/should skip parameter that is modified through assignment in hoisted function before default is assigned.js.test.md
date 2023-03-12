
## Input
```javascript input
function f(a) {
    f2();
    a = a || 2;
    function f2() {
        a = 4;
    }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
