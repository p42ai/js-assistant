
## Input
```javascript input
function f(x, a, b) {
  switch(x) {
    case "1":
      if (x.value) {
        return a;
      } else {
        return b;
      }
  }
  return null;
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
function f(x, a, b) {
  switch(x) {
    case "1":
      return x.value ? a : b;
  }
  return null;
}
```
