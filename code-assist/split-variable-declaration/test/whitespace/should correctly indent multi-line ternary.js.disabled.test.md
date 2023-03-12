
## Input
```javascript input
const f = x 
  ? () => {
    const a, b;
  } 
  : undefined;

const x, y;
```

## Expected Output
```javascript expected output
const f = x 
  ? () => {
    const a;
    const b;
  } 
  : undefined;

const x;
const y;
```
