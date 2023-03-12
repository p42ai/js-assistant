
## Input
```javascript input
function a() {
  f(
    a,
    `123
  456
79
0`);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "34-44"
}
```

## Expected Output
```javascript expected output
function a() {
  const extractedText = `3
  456
79`;
  f(
    a,
    `12${extractedText}
0`);
}
```
