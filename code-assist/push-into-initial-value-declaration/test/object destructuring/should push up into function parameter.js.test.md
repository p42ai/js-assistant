
## Input
```javascript input
function f(aParameter) {
  const { a, b } = aParameter;
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
function f({ a, b }) {
}
```
