
## Input
```javascript input
if (a) {
  f();
} else {
  // comment
  g();
  f();
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
} else {
  // comment
  g();
}
f();
```
