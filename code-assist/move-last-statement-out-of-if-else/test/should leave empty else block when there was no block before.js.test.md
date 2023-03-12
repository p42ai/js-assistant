
## Input
```javascript input
if (x) {
  f1b();
  f2();
} else f2();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
if (x) {
  f1b();
} else {
}
f2();
```
