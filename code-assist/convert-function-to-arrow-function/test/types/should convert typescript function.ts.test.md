
## Input
```javascript input
const f = function (v1: string, v2: number) { return 'a'; };
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const f = (v1: string, v2: number) => 'a';
```
