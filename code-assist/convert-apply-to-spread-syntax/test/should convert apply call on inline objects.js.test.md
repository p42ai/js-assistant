
## Input
```javascript input
const args = [1, 2, 3];
const a = [];
a.push.apply(a, args);
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
const a = [];
a.push(...args);
```
