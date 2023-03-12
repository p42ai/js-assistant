
## Input
```javascript input
if (x) f1() else {
  f1();
  f2a();
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
f1();
if (x) {
} else {
  f2a();
}
```
