
## Input
```javascript input
const { obj } = something;
const [value1, value2] = obj;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { obj: [value1, value2] } = something;
```
