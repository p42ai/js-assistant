
## Input
```javascript input
function f() {
  y.f(a && a.f2(1), b && b.f2(3));
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
  y.f(a?.f2(1), b?.f2(3));
}
```
