
## Input
```javascript input
if (a) {
  something();
} else if (x) {
  let a;
} else {
  let a;
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
if (a) {
  something();
} else {
  let a;
}
```
