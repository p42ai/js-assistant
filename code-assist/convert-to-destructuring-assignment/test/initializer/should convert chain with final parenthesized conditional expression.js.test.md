
## Input
```javascript input
const something = (a ? b : c).something;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { something } = (a ? b : c);
```
