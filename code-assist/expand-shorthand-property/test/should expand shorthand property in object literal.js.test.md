
## Input
```javascript input
const original = { a: "123" };
const { a } = original;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const original = { a: "123" };
const { a: a } = original;
```
