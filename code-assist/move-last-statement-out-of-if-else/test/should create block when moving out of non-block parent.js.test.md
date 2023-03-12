
## Input
```javascript input
if (y) {
  z();
} else if (x) {
  f1a();
  f2();
} else {
  f1b();
  f2();
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
if (y) {
  z();
} else {
  if (x) {
    f1a();
  } else {
    f1b();
  }
  f2();
}
```
