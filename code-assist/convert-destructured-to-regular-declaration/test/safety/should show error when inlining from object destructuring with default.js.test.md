
## Input
```javascript input
const { aProperty: aVariable = "aDefault" } = anObject;
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
  "5-54-VariableDeclaration": {
    "safety": {
      "level": "ERROR",
      "message": "removes default application"
    }
  }
}
```

## Expected Output
```javascript expected output
const aVariable = anObject.aProperty;
```
