
## Input
```javascript input
var couldBeGlobal = "123";
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
  "0-25-VariableDeclarationList": {
    "safety": {
      "level": "WARNING",
      "message": "could remove global variable"
    }
  }
}
```

## Expected Output
```javascript expected output
const couldBeGlobal = "123";
```
