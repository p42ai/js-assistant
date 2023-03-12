
## Input
```javascript input
function f(s: string | number[]) {
  if (typeof s === 'string') {
    const match = s[0] === '/';
  }
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
function f(s: string | number[]) {
  if (typeof s === 'string') {
    const match = s.startsWith('/');
  }
}
```
