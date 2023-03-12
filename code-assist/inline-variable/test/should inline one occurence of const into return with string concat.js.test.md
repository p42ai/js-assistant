
## Input
```javascript input
function f() {
  const a = "3";
  return a + "x";
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
function f() {
  return "3" + "x";
}
```
