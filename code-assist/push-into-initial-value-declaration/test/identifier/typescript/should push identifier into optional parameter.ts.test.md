
## Input
```javascript input
function f(aParameter?: string) {
  const obj = aParameter;
}
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
function f(obj?: string) {
}
```
