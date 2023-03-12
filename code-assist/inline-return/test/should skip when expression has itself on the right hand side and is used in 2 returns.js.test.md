
## Input
```javascript input
function f(x) {
    let a = 1;
    if (x) {
        a = g(a);
    }
    if (y) {
        return a * 2;
    }
    return a;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
