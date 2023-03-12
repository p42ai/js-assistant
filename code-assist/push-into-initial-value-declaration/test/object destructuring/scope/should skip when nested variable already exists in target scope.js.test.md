
## Input
```javascript input
function f(aVariable) {
  const anObject = something;
  {
    const { property: { anotherProperty: aVariable } } = anObject;
  }
  g(aVariable);
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```
