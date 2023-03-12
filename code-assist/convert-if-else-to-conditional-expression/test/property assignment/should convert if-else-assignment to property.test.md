
## Input
```javascript input
if (x) {
  a.v1 = f();
} else {
  a.v1 = g();
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
a.v1 = x ? f() : g();
```
