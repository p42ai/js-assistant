
## Input
```javascript input
for (let i = 0; i < values.length; i++) {
  const a, b;
}

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
for (let i = 0; i < values.length; i++) {
  const a;
  const b;
}

const x;
const y;
```
