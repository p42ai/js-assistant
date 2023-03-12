
## Input
```javascript input
let a = 23;
if (x) {
  a = f();
} else {
  a = g();
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
let a = 23;
a = x ? f() : g();
```
