
## Input
```javascript input
let intermediateVariable = source;
let aVariable = intermediateVariable;
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
  "38-71-VariableDeclaration": {
    "safety": {
      "level": "UNKNOWN"
    }
  }
}
```

## Expected Output
```javascript expected output
let aVariable = source;
```
