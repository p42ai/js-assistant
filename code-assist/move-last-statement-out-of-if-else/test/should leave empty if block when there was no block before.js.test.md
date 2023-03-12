
## Input
```javascript input
if (x) f2() else {
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
if (x) {
} else {
  f1b();
}
f2();
```
