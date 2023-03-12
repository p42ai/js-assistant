
## Input
```javascript input
const args = [1, 2, 3];
Math.min.apply(Math, args);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const args = [1, 2, 3];
Math.min(...args);
```
