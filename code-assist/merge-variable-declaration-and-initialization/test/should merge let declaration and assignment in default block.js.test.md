
## Input
```javascript input
switch (x) {
  default:
    let a;
    a = 123;
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
switch (x) {
  default:
    let a = 123;
}
```
