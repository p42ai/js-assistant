
## Input
```javascript input
const { aField: obj } = something;
const { property1 } = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { aField: { property1 } } = something;
```
