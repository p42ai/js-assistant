
## Input
```javascript input
async function f() {
  await !!(a || c);
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
async function f() {
  await (a || c);
}
```
