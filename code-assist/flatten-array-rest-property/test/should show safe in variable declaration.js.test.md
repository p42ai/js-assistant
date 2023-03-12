
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

## Expected Matches
```json expected matches
{
  "7-21-BindingElement": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const [variableA] = something();
```
