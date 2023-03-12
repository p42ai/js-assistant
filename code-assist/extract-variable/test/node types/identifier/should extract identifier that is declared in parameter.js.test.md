
## Input
```javascript input
function f(param) {
  console.log(param);
}
```

## Configuration
```json configuration
{
  "extension": "js",
  "selection": "34-39"
}
```

## Expected Output
```javascript expected output
function f(param) {
  const param2 = param;
  console.log(param2);
}
```
