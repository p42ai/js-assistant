
## Input
```javascript input
function f(x, y) {
    let a;
    if (y) {
      if (x) {
        a = g1(a);
      } else {
        a = g2(a);
      }
      Object.keys(y).forEach(x);
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
