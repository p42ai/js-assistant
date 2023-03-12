
## Input
```javascript input
const [obj1, obj2, obj3] = something;
const [value1, value2] = obj2;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const [obj1, [value1, value2], obj3] = something;
```
