
## Input
```javascript input
f(
  a,
  x === null || x === undefined,
  b,
  y === null || y === undefined
);
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
f(
  a,
  x == null,
  b,
  y == null
);
```
