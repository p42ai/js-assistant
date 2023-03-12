
## Input
```javascript input
const something = { something: "a" }.something;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { something } = { something: "a" };
```
