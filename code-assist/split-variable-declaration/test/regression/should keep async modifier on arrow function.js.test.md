
## Input
```javascript input
f(async () => {
  const a, b;
});

const x, y;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(async () => {
  const a;
  const b;
});

const x;
const y;
```
