
## Input
```javascript input
((a, b, c) => {
  console.log(a);
})(12, 23, 34);
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "5-5"
}
```

## Expected Output
```javascript expected output
((a, c) => {
  const b = 23;
  console.log(a);
})(12, 34);
```
