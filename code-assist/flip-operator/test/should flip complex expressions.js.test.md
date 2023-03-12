
## Input
```javascript input
if ((x.f(1, 2) * 4) !== y.abc("123") / 22) {
  f(a);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "20-20"
}
```

## Expected Output
```javascript expected output
if (y.abc("123") / 22 !== (x.f(1, 2) * 4)) {
  f(a);
}
```
