
## Input
```javascript input
const a = a <= b;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = !(a > b);
```
