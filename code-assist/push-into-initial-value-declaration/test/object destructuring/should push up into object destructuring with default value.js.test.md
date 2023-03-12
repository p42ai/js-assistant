
## Input
```javascript input
const { obj = "default value" } = something;
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
const { obj: { property1 } = "default value" } = something;
```
