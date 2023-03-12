
## Input
```javascript input
function a() {
  f(
    a,
    `123
  4${test}56
79
0`);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "34-51"
}
```

## Expected Output
```javascript expected output
function a() {
  const extractedText = `3
  4${test}56
79`;
  f(
    a,
    `12${extractedText}
0`);
}
```
