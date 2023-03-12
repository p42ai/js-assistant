
## Input
```javascript input
let intermediateVariable = source;
const aVariable = intermediateVariable;
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
  "40-73-VariableDeclaration": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable = source;
```
