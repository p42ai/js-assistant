
## Input
```javascript input
function f() {
  const obj = something;
  {
    const property1 = "abc";
    {
      const property1 = obj;
      f(property1);
    }
  }
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
