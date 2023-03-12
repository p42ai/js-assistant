
## Input
```javascript input
const a = 12, b = 34;
with (o) {
  const a = 23, b = 45; // re-declared, not affected by with
  a + b;
}
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const a = 12, b = 34;
with (o) {
  const a = 23, b = 45; // re-declared, not affected by with
}
```
