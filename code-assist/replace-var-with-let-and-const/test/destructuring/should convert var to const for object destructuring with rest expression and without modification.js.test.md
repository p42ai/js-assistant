
## Input
```javascript input
var { ...rest } = obj;
obj = rest; // does not modify rest
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { ...rest } = obj;
obj = rest; // does not modify rest
```
