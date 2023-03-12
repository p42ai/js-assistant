
## Input
```javascript input
const something = (await aFunction()).something;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { something } = (await aFunction());
```
