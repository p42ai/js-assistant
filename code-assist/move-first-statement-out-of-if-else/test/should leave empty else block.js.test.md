
## Input
```javascript input
if (x) {
  f1();
  f2a();
} else {
  f1();
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
  f2a();
} else {
}
```
