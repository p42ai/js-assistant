
## Input
```javascript input
function f(x) {
  if (x)
    var a = 1, b = "a";
  else
    var a = 2, b = "b";
  
  return { a, b };
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
