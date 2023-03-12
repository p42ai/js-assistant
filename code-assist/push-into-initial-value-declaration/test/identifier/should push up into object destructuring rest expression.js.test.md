
## Input
```javascript input
const { aValue, ...rest } = something;
const aVariable = rest;
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const { aValue, ...aVariable } = something;
```
