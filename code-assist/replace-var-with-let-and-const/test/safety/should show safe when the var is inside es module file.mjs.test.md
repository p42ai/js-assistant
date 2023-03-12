
## Input
```javascript input
var notAGlobalInsideMJS = "123";
```

## Configuration
```json configuration
{
  "extension": "mjs"
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
const notAGlobalInsideMJS = "123";
```
