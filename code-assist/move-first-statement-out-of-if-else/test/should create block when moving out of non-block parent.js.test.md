
## Input
```javascript input
if (y) {
  z();
} else if (x) {
  f1();
  f2a();
} else {
  f1();
  f2b();
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
  f1();
  if (x) {
    f2a();
  } else {
    f2b();
  }
}
```
