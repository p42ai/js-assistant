
## Input
```javascript input
const n = f(() => {
  const a, b;
}) as string[];

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
const n = f(() => {
  const a;
  const b;
}) as string[];

const x;
const y;
```
