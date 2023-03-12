
## Input
```javascript input
if (x) {
} else if (y) {
  g();
} else {
  h();
}
f();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (!x) {
  if (y) {
    g();
  } else {
    h();
  }
}
f();
```
