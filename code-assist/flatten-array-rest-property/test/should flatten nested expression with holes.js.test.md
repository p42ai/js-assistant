
## Input
```javascript input
const [variableA, , ...[,variableB,,variableC]] = something();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const [variableA, , ,variableB,,variableC] = something();
```
