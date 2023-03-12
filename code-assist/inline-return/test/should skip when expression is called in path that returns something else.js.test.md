
## Input
```javascript input
function f(x) {
    let a = 1;
    if (x) {
        a = g(a);
    }
    if (y) {
        doSomethingWith(a)
        return x;
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
