
## Input
```javascript input
const f = function (v1: string) { return 'a'; };
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const f = (v1: string) => 'a';
```
