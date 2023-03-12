
## Input
```javascript input
var intermediateVariable = source,
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
  "77-110-VariableDeclaration": {
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
