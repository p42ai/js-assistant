
## Input
```javascript input
const args = [1, 2];
this.fn.apply(this, args);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const args = [1, 2];
this.fn(...args);
```
