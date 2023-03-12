
## Input
```javascript input
while (f()) {
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
while (f()) {
  const a;
  const b;
}

const x;
const y;
```
