
## Input
```javascript input
const intermediateVariable = source,
      anotherVariable = somethingElse;
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
  "79-112-VariableDeclaration": {
    "safety": {
      "level": "WARNING",
      "message": "changes declaration to var"
    }
  }
}
```

## Expected Output
```javascript expected output
var aVariable = source,
      anotherVariable = somethingElse;
```
