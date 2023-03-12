
## Input
```javascript input
var intermediateVariable = source;
var aVariable = intermediateVariable;
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
var aVariable = source;
```
