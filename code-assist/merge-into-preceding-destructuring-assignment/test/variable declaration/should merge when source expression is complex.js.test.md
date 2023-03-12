
## Input
```javascript input
const { a: varA } = obj.property.m(f(x), 1, "a");
const { b: varB } = obj.property.m(f(x), 1, "a");
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { a: varA, b: varB } = obj.property.m(f(x), 1, "a");
```
