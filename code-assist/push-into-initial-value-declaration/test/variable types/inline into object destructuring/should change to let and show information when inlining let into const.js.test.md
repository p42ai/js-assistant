
## Input
```javascript input
const { intermediateVariable, anotherVariable } = source;
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
  "61-94-VariableDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "changes declaration to let"
    }
  }
}
```

## Expected Output
```javascript expected output
let { intermediateVariable: aVariable, anotherVariable } = source;
```
