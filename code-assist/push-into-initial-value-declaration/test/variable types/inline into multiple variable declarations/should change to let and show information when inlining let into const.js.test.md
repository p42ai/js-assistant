
## Input
```javascript input
const intermediateVariable = source,
      anotherVariable = somethingElse;
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
  "79-112-VariableDeclaration": {
    "safety": {
      "level": "INFORMATION",
      "message": "changes declaration to let"
    }
  }
}
```

## Expected Output
```javascript expected output
let aVariable = source,
      anotherVariable = somethingElse;
```
