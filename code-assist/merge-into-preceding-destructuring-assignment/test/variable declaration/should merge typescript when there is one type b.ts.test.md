
## Input
```javascript input
const { a } = obj;
const { b }: { b: string } = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const { a, b }: { b: string } = obj;
```
