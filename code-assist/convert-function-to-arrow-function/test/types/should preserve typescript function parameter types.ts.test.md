
## Input
```javascript input
const f = function<T>(v1: T) { return 'a'; };
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const f = <T, >(v1: T) => 'a';
```
