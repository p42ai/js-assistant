
## Input
```javascript input
function f(property1) {
  const obj = something;
  {
    const property1 = obj;
  }
  g(property1);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
