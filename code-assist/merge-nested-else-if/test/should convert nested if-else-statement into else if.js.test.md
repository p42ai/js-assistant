
## Input
```javascript input
if (a == 2) {
  f();
} else {
  if (b == 3) {
    f(a, b);
  } else {
    f(a);
  }
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
if (a == 2) {
  f();
} else if (b == 3) {
  f(a, b);
} else {
  f(a);
}
```
