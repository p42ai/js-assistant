
## Input
```javascript input
let s: string = '123';
const match = s[s.length - 1] === '/';
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
let s: string = '123';
const match = s.endsWith('/');
```
