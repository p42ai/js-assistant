
## Input
```javascript input
function f() {
  return () => {
    const a, b;
  };
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
function f() {
  return () => {
    const a;
    const b;
  };
}

const x;
const y;
```
