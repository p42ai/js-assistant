
## Input
```javascript input
const a = x || y;
z && a;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
z && (x || y);
```
