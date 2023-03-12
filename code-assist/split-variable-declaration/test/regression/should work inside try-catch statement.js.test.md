
## Input
```javascript input
try {
  const a, b;
} catch (err) {
  const c, d;
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
try {
  const a;
  const b;
} catch (err) {
  const c;
  const d;
}

const x;
const y;
```
