
## Input
```javascript input
const { a }: { a: string } = obj;
const { b } = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const { a, b }: { a: string } = obj;
```
