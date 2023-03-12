
## Input
```javascript input
if (x) {
  this.v1 = f();
} else {
  this.v1 = g();
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
this.v1 = x ? f() : g();
```
