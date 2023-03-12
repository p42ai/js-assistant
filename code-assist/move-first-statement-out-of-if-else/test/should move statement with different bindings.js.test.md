
## Input
```javascript input
if (x) {
  let a;
  a = "123";
} else {
  let a;
  a = "345";
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
if (x) {
  a = "123";
} else {
  a = "345";
}
```
