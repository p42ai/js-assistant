
## Input
```javascript input
const [...[variableA]] = something();
```

## Configuration
```json configuration
{
  "extension": "js"
}
```

## Expected Output
```javascript expected output
const [variableA] = something();
```
