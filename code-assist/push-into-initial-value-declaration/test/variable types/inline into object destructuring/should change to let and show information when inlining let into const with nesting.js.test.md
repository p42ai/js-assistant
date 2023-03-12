
## Input
```javascript input
const {
  anotherVariable: { anotherInnerVariable, intermediateVariable }, 
  anotherVariable2 
} = source;
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
  "111-144-VariableDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "changes declaration to let"
    }
  }
}
```

## Expected Output
```javascript expected output
let {
  anotherVariable: { anotherInnerVariable, intermediateVariable: aVariable }, 
  anotherVariable2 
} = source;
```
