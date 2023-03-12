
## Input
```javascript input
const a = x ? y : z;
const b = a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const b = x ? y : z;
```
