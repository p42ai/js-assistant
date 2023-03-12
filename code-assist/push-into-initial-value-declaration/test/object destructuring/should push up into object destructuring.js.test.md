
## Input
```javascript input
const { obj } = something;
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
const { obj: { property1 } } = something;
```
