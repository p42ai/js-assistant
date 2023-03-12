
## Input
```javascript input
const a = x + y;
b *= a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
b *= x + y;
```
