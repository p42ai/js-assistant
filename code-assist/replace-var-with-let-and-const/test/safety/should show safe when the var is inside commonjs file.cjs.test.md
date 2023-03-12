
## Input
```javascript input
var notAGlobalInsideCJS = "123";
```

## Configuration
```json configuration
{
  "extension": "cjs"
}
```

## Expected Matches
```json expected matches
{
  "0-31-VariableDeclarationList": {
    "safety": {
      "level": "SAFE"
    }
  }
}
```

## Expected Output
```javascript expected output
const notAGlobalInsideCJS = "123";
```
