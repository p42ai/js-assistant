
## Input
```javascript input
(function(a, b, c) {
  console.log(a);
})(12, 23, 34);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "13-13"
}
```

## Expected Output
```javascript expected output
(function(a, c) {
  const b = 23;
  console.log(a);
})(12, 34);
```
