
## Input
```javascript input
const a = x ? y : z;
a + 12;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
(x ? y : z) + 12;
```
