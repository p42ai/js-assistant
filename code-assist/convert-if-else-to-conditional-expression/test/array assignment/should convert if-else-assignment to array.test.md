
## Input
```javascript input
if (x) {
  a[0] = f();
} else {
  a[0] = g();
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
a[0] = x ? f() : g();
```
