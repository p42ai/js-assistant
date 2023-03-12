
## Input
```javascript input
try {
  const a, b;
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
} finally {
  const e;
  const f;
}

const x;
const y;
```
