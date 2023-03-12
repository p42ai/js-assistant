
## Input
```javascript input
for (; ;) {
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
for (; ;) {
  const a;
  const b;
}

const x;
const y;
```
