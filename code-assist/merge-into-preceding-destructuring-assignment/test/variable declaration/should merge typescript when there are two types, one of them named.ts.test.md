
## Input
```javascript input
const { a }: ExampleType = obj;
const { b }: { b: number } = obj;
```

## Configuration
```json configuration
{
  "extension": "ts"
}
```

## Expected Output
```javascript expected output
const { a, b }: ExampleType & { b: number } = obj;
```
