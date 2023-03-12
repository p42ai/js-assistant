
## Input
```javascript input
function f(s: string) {
  const match = s[s.length - 1] === '/';
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
function f(s: string) {
  const match = s.endsWith('/');
}
```
