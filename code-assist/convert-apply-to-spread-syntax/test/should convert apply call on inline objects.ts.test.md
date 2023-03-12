
## Input
```javascript input
const args = [1, 2, 3];
const a: any[] = [];
a.push.apply(a, args);
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const args = [1, 2, 3];
const a: any[] = [];
a.push(...args);
```
