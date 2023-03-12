
## Input
```javascript input
let a;
if (x == null) {
  a = 123;
} else {
  a = x;
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
let a;
a = x ?? 123;
```
