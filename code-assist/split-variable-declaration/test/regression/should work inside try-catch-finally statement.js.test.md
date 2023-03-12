
## Input
```javascript input
try {
  const a, b;
} catch (err) {
  const c, d;
} finally {
  const e, f;
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
} finally {
  const e;
  const f;
}

const x;
const y;
```
