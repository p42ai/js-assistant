
## Input
```javascript input
let f = "123";
f *= x ? a : b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
let f = "123";
if (x) {
  f *= a;
} else {
  f *= b;
}
```
